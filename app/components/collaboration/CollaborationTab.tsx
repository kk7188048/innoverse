import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';

import { project_colaboration } from '@/repository/mock/project/project-page';

import { UpdateCard } from './UpdateCard';

export const CollaborationTab = () => {
  const { projectUpdates } = project_colaboration;
  return (
    <Card
      sx={{
        borderRadius: '24px',
        background: '#FFF',
        position: 'relative',
        zIndex: 0,
        boxShadow:
          '0px 8px 15px -7px rgba(0, 0, 0, 0.10), 0px 12px 38px 3px rgba(0, 0, 0, 0.03), 0px 9px 46px 8px rgba(0, 0, 0, 0.35)',
      }}
    >
      <Box
        sx={{
          width: 575,
          height: '100%',
          borderRadius: 'var(--2, 16px) 0px 0px var(--2, 16px)',
          opacity: 0.6,
          background: 'linear-gradient(90deg, rgba(240, 238, 225, 0.00) 10.42%, #F0EEE1 100%)',
          position: 'absolute',
          zIndex: -1,
        }}
      ></Box>

      <CardContent>
        <Grid container sx={{ p: 4 }} spacing={8}>
          {projectUpdates.map((update, i) => (
            <Grid item key={i}>
              <UpdateCard content={update} />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};
