'use server';

import { ObjectType, ProjectUpdate } from '@/common/types';
import { getFollowedByForEntity } from '@/repository/db/follow';
import { countNewsResponses } from '@/repository/db/news_comment';
import dbClient from '@/repository/db/prisma/prisma';
import { getReactionsForEntity } from '@/repository/db/reaction';
import { getUnixTimestamp } from '@/utils/helpers';
import getLogger from '@/utils/logger';
import {
  mapRedisNewsFeedEntryToProjectUpdate,
  mapToRedisUsers,
  mapUpdateToRedisNewsFeedEntry,
} from '@/utils/newsFeed/redis/mappings';
import { NewsType, RedisProjectUpdate } from '@/utils/newsFeed/redis/models';
import { getRedisClient, RedisClient } from '@/utils/newsFeed/redis/redisClient';
import { deleteItemFromRedis, getNewsFeedEntryByKey, saveNewsFeedEntry } from '@/utils/newsFeed/redis/redisService';
import {
  createProjectUpdateInStrapi,
  deleteProjectUpdateInStrapi,
  getProjectUpdateById,
  updateProjectUpdateInStrapi,
} from '@/utils/requests/updates/requests';

const logger = getLogger();

type CreateProjectUpdate = {
  comment: string;
  projectId: string;
  authorId?: string;
  linkToCollaborationTab?: boolean;
  anonymous?: boolean;
};
type UpdateProjectUpdate = { updateId: string; comment: string; anonymous?: boolean };

type UpdateUpdateInCache = { update: { id: string; comment?: string; responseCount?: number; anonymous?: boolean } };

export const createProjectUpdate = async (update: CreateProjectUpdate) => {
  const createdUpdate = await createProjectUpdateInStrapi(update);
  if (createdUpdate) {
    return await createProjectUpdateInCache(createdUpdate);
  }
  return createdUpdate;
};

export const updateProjectUpdate = async ({ updateId, comment }: UpdateProjectUpdate) => {
  const updated = await updateProjectUpdateInStrapi(updateId, comment);
  if (updated) {
    await updateProjectUpdateInCache({ update: { id: updateId, comment } });
  }
  return updated;
};

export const deleteProjectUpdate = async (updateId: string) => {
  const deletedUpdate = await deleteProjectUpdateInStrapi(updateId);
  await deleteProjectUpdateInCache(updateId);
  return deletedUpdate;
};

export const createProjectUpdateInCache = async (update: ProjectUpdate) => {
  const redisClient = await getRedisClient();
  const newsFeedEntry = await createNewsFeedEntryForProjectUpdate(update);
  const redisNewsFeedEntry = await saveNewsFeedEntry(redisClient, newsFeedEntry);
  return mapRedisNewsFeedEntryToProjectUpdate(redisNewsFeedEntry.item as RedisProjectUpdate);
};

export const deleteProjectUpdateInCache = async (updateId: string) => {
  const redisClient = await getRedisClient();
  const redisKey = getRedisKey(updateId);
  await deleteItemFromRedis(redisClient, redisKey);
};

export const updateProjectUpdateInCache = async ({ update }: UpdateUpdateInCache) => {
  const redisClient = await getRedisClient();
  const newsFeedEntry = await getNewsFeedEntryForProjectUpdate(redisClient, update.id);

  if (!newsFeedEntry) return;
  const cachedItem = newsFeedEntry.item as RedisProjectUpdate;
  cachedItem.responseCount = update.responseCount ?? cachedItem.responseCount;
  cachedItem.comment = update.comment ?? cachedItem.comment;
  newsFeedEntry.item = cachedItem;
  newsFeedEntry.updatedAt = getUnixTimestamp(new Date());

  await saveNewsFeedEntry(redisClient, newsFeedEntry);
};

export const getNewsFeedEntryForProjectUpdate = async (redisClient: RedisClient, updateId: string) => {
  const redisKey = getRedisKey(updateId);
  const cacheEntry = await getNewsFeedEntryByKey(redisClient, redisKey);
  return cacheEntry ?? (await createNewsFeedEntryForProjectUpdateById(updateId));
};

const createNewsFeedEntryForProjectUpdateById = async (updateId: string) => {
  const update = await getProjectUpdateById(updateId);

  if (!update) {
    logger.warn(`Failed to create news feed cache entry for update with id ${updateId}: Update not found`);
    return null;
  }

  return await createNewsFeedEntryForProjectUpdate(update);
};

export const createNewsFeedEntryForProjectUpdate = async (update: ProjectUpdate) => {
  const updateReactions = await getReactionsForEntity(dbClient, ObjectType.UPDATE, update.id);
  const projectFollowedBy = await getFollowedByForEntity(dbClient, ObjectType.PROJECT, update.projectId);
  const mappedUpdateFollowedBy = await mapToRedisUsers(projectFollowedBy);
  const responseCount = await countNewsResponses(dbClient, update.id);
  return mapUpdateToRedisNewsFeedEntry(update, updateReactions, mappedUpdateFollowedBy, responseCount);
};

const getRedisKey = (updateId: string) => `${NewsType.UPDATE}:${updateId}`;
