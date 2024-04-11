'use client';

import Image from 'next/image';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import ExplorationIcon from '@/components/icons/ExplorationIcon';
import KonzeptionIcon from '@/components/icons/KonzeptionIcon';
import ProofOfConceptIcon from '@/components/icons/ProofOfConceptIcon';

import { ProjectProps } from '../projectSection/ProjectSection';

import PhaseColumn from './PhaseColumn';

import bgBubble from '/public/images/bg-image.png';

const mappingData = [
  {
    isFirstStep: true,
    title: 'Exploration',
    icon: <ExplorationIcon />,
    description:
      'Basierend auf dem strategischen Zielsystem ***STRING_REMOVED***  untersuchen wir mögliche Handlungsfelder für ***STRING_REMOVED***  und berücksichtigen dabei externe Entwicklungen und interne Leitplanken.',
  },
  {
    title: 'Konzeption',
    icon: <KonzeptionIcon />,
    description:
      'In der Konzeptionsphase sind wir im engen Austausch mit der Zielgruppe: Aus erster Hand verstehen wir zunächst die Probleme, um basierend darauf Lösungskonzepte zu erarbeiten und mit der Zielgruppe zu validieren.',
  },
  {
    title: 'Proof of Concept',
    icon: <ProofOfConceptIcon />,
    description:
      'Im PoC testen wir mittels Lean Experiments die Attraktivität, Machbarkeit und Rentabilität der Lösungskonzepte - auch hier direkt mit der Zielgruppe.',
  },
];

export const MappingProjectsCard = (props: ProjectProps) => {
  const { projects } = props;
  return (
    <Box sx={mappingProjectsCardStyles}>
      {/* Left bubble in the background */}
      <Image
        src={bgBubble}
        alt="background-bubble"
        sizes="33vw"
        style={{
          position: 'absolute',
          width: 570,
          height: 460,
          zIndex: 0,
          opacity: 0.9,
          left: 0,
          overflowX: 'hidden',
          mixBlendMode: 'lighten',
          transform: 'translate(-50%, 20%)',
        }}
      />
      <Grid container justifyContent="center">
        <Grid item xs={10}>
          <Card
            sx={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              backdropFilter: `blur(20px)`,
              borderRadius: '24px',
              border: '1px solid rgba(255, 255, 255, 0.20)',
              height: 'auto',
              boxShadow: '0px 12px 40px 0px rgba(0, 0, 0, 0.25)',
            }}
          >
            <CardHeader
              sx={{ textAlign: 'left', mt: '30px', ml: '25px', mr: '25px' }}
              title={<Typography variant="h4">Strategische Innovation @ ***STRING_REMOVED*** </Typography>}
            />

            <CardContent sx={{ ml: '25px', mr: '25px', display: 'flex' }}>
              <Grid container spacing={2} sx={{ display: 'flex' }}>
                {mappingData.map((data) => {
                  return (
                    <PhaseColumn
                      key={data.title}
                      title={data.title}
                      description={data.description}
                      projects={projects.filter((p) => p.status.replace(/_/g, ' ') === data.title)}
                      icon={data.icon}
                      isFirstStep={data?.isFirstStep}
                    ></PhaseColumn>
                  );
                })}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

const mappingProjectsCardStyles = {
  position: 'relative',
  overflowX: 'hidden',
  minHeight: '400px',
};
