import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import { Follower, Like, Project } from '@/common/types';
import BreadcrumbsNav from '@/components/common/BreadcrumbsNav';
import ErrorPage from '@/components/error/ErrorPage';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/project-details/HeroSection';
import { getAllProjectFollowers, getAllProjectLikes } from '@/components/project-details/likes-follows/actions';
import ProjectWrapper from '@/components/project-details/ProjectWrapper';
import { getProjectById } from '@/utils/requests';

async function ProjectPage({ params }: { params: { id: string } }) {
  const project = (await getProjectById(params.id)) as Project;

  if (!project) {
    return <ErrorPage message="Projekt konnte nicht abgerufen werden, versuchen Sie es später erneut" />;
  }

  const likesResponse = await getAllProjectLikes({ projectId: project.id });
  let likes: Like[] = [];
  if (likesResponse.status === 200 && likesResponse.data) {
    likes = likesResponse.data;
  } else return <ErrorPage message="Projekt Likes konnten nicht abgerufen werden, versuchen Sie es später erneut" />;

  const followersResponse = await getAllProjectFollowers({ projectId: project.id });
  let followers: Follower[] = [];
  if (followersResponse.status === 200 && followersResponse.data) {
    followers = followersResponse.data;
  } else
    return <ErrorPage message="Projekt Followers konnten nicht abgerufen werden, versuchen Sie es später erneut" />;

  return (
    <Layout>
      {project && (
        <Stack spacing={8} useFlexGap>
          <Container maxWidth="lg" sx={containerStyles}>
            <BreadcrumbsNav activePage="Projekt" />
            <HeroSection project={project} />
          </Container>
          <ProjectWrapper
            project={{
              ...project,
              likes,
              followers,
            }}
          />
        </Stack>
      )}
    </Layout>
  );
}

export default ProjectPage;

// Page Styles
const containerStyles = {
  paddingLeft: 0,
  paddingRight: 0,
};
