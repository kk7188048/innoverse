'use server';

import { StatusCodes } from 'http-status-codes';

import { Comment, UserSession } from '@/common/types';
import {
  addComment,
  deleteComment,
  getCommentbyId,
  handleCommentUpvotedBy,
  updateComment,
} from '@/repository/db/project_comment';
import { withAuth } from '@/utils/auth';
import { dbError, InnoPlatformError } from '@/utils/errors';
import getLogger from '@/utils/logger';
import { getInnoUserByProviderId } from '@/utils/requests/innoUsers/requests';
import { validateParams } from '@/utils/validationHelper';

import dbClient from '../../../repository/db/prisma/prisma';

import {
  commentUpvotedBySchema,
  deleteCommentSchema,
  handleCommentSchema,
  updateCommentSchema,
} from './validationSchema';

const logger = getLogger();

export const addProjectComment = withAuth(async (user: UserSession, body: { projectId: string; comment: string }) => {
  try {
    const validatedParams = validateParams(handleCommentSchema, body);
    if (validatedParams.status === StatusCodes.OK) {
      const newComment = await addComment(dbClient, body.projectId, user.providerId, body.comment);
      const author = await getInnoUserByProviderId(user.providerId);
      return {
        status: StatusCodes.OK,
        data: {
          ...newComment,
          author,
          upvotedBy: [],
          responseCount: 0,
          questionId: '',
        } as Comment,
      };
    }
    return {
      status: validatedParams.status,
      errors: validatedParams.errors,
      message: validatedParams.message,
    };
  } catch (err) {
    const error: InnoPlatformError = dbError(
      `Adding a Comment to a Project ${body.projectId} from user ${user.providerId}`,
      err as Error,
      body.projectId,
    );
    logger.error(error);
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Adding a Comment failed',
    };
  }
});

export const handleProjectCommentUpvoteBy = withAuth(async (user: UserSession, body: { commentId: string }) => {
  try {
    const validatedParams = validateParams(commentUpvotedBySchema, body);
    if (validatedParams.status === StatusCodes.OK) {
      const updatedComment = await handleCommentUpvotedBy(dbClient, body.commentId, user.providerId);
      return {
        status: StatusCodes.OK,
        upvotedBy: updatedComment?.upvotedBy,
      };
    }
    return {
      status: validatedParams.status,
      errors: validatedParams.errors,
      message: validatedParams.message,
    };
  } catch (err) {
    const error: InnoPlatformError = dbError(
      `Adding an upvote of a Comment ${body.commentId} for user ${user.providerId}`,
      err as Error,
      body.commentId,
    );
    logger.error(error);
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Upvoting comment failed',
    };
  }
});

export const deleteProjectComment = withAuth(async (user: UserSession, body: { commentId: string }) => {
  const validatedParams = validateParams(deleteCommentSchema, body);

  if (validatedParams.status !== StatusCodes.OK) {
    return {
      status: validatedParams.status,
      errors: validatedParams.errors,
      message: validatedParams.message,
    };
  }

  const comment = await getCommentbyId(dbClient, body.commentId);

  if (comment === null) {
    return {
      status: StatusCodes.BAD_REQUEST,
      message: 'No comment with the specified ID exists',
    };
  }

  if (comment.author !== user.providerId) {
    return {
      status: StatusCodes.BAD_REQUEST,
      message: 'A comment can only be deleted by its author',
    };
  }

  await deleteComment(dbClient, body.commentId);

  return {
    status: StatusCodes.OK,
  };
});

export const updateProjectComment = withAuth(
  async (user: UserSession, body: { commentId: string; updatedText: string }) => {
    const validatedParams = validateParams(updateCommentSchema, body);

    if (validatedParams.status !== StatusCodes.OK) {
      return {
        status: validatedParams.status,
        errors: validatedParams.errors,
        message: validatedParams.message,
      };
    }

    const comment = await getCommentbyId(dbClient, body.commentId);

    if (comment === null) {
      return {
        status: StatusCodes.BAD_REQUEST,
        message: 'No comment with the specified ID exists',
      };
    }

    if (comment.author !== user.providerId) {
      return {
        status: StatusCodes.BAD_REQUEST,
        message: 'A comment can only be edited by its author',
      };
    }

    const updatedComment = await updateComment(dbClient, body.commentId, body.updatedText);

    return {
      status: StatusCodes.OK,
      comment: updatedComment,
    };
  },
);
