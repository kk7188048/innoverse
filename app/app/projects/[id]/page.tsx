import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import { Project } from '@/common/types';
import BreadcrumbsNav from '@/components/common/BreadcrumbsNav';
import ErrorPage from '@/components/error/ErrorPage';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/project-details/HeroSection';
import ProjectWrapper from '@/components/project-details/ProjectWrapper';
import { getProjectById } from '@/utils/requests';

async function ProjectPage({ params }: { params: { id: string } }) {
  const project = (await getProjectById(params.id)) as Project;

  if (!project) {
    return <ErrorPage />;
  }

  return (
    <Layout>
      {project && (
        <Stack spacing={8} useFlexGap>
          <Container maxWidth="lg" sx={{ pb: 5 }}>
            <BreadcrumbsNav />
            <HeroSection project={project} />
          </Container>
          <ProjectWrapper project={project} />
        </Stack>
      )}
    </Layout>
  );
}

export default ProjectPage;
