import Image from 'next/image';

import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import BreadcrumbsNav from '@/components/common/BreadcrumbsNav';
import Layout from '@/components/layout/Layout';
import NewsContainer from '@/components/newsPage/NewsContainer';

import backgroundImage from '/public/images/news-background.png';

async function NewsPage() {
  return (
    <Layout>
      <Stack spacing={8} useFlexGap>
        <Image
          src={backgroundImage}
          alt="news-background"
          sizes="33vw"
          style={{
            position: 'absolute',
            width: '100%',
            height: 280,
            background: `lightgray 50% / cover no-repeat`,
            mixBlendMode: 'plus-lighter',
          }}
        />
        <Container maxWidth="lg" sx={{ pb: 5 }}>
          <BreadcrumbsNav activePage="News" />
          <Grid container sx={containerStyles}>
            <Card sx={cardStyles}>
              <Typography variant="h2" sx={cardTitleStyles}>
                News
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '24px', mt: 1 }}>
                Die Neuigkeiten im Überblick: Aktuelle Nachrichten zu unseren Projekten auf der Innovationsplattform
              </Typography>
            </Card>
          </Grid>
          <NewsContainer />
        </Container>
      </Stack>
    </Layout>
  );
}

const cardStyles = {
  padding: '32px 24px',
  borderRadius: '16px',
  border: '1px solid rgba(255, 255, 255, 0.20)',
  backgroundColor: 'rgba(255, 255, 255, 0.10)',
  boxShadow: '0px 12px 40px 0px rgba(0, 0, 0, 0.25)',
  backdropFilter: 'blur(20px)',
  width: 620,
  height: 200,
};

const cardTitleStyles = {
  fontSize: '48px',
};

const containerStyles = {
  position: 'relative',
  justifyItems: 'center',
  alignItems: 'center',
};

export default NewsPage;
