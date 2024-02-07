import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { ProjectUpdate } from '@/common/types';

import { CommentCard } from './comments/CommentCard';
import { DateField } from './DateField';

interface UpdateCardProps {
  content: ProjectUpdate;
  divider: boolean;
}

function getDay(date: string) {
  return new Date(date).getDate().toString();
}

function getMonth(date: string) {
  return new Date(date).toLocaleString('de-DE', { month: 'short' });
}

export const UpdateCard = ({ content, divider }: UpdateCardProps) => {
  const { id, comment, author, date, projectStart } = content;
  const commentContent = { id, author, comment };
  const dayMonth = `${getDay(date)} ${getMonth(date)}`;

  return (
    <Grid container item>
      <Grid container item xs={4} justifyContent="center">
        <DateField date={dayMonth} divider={divider} />
      </Grid>
      {projectStart && (
        <Box sx={projectStartStyles}>
          <Typography variant="subtitle2" color="primary.main">
            Project Kickoff
          </Typography>
        </Box>
      )}

      <Grid container item xs={8}>
        <CommentCard content={commentContent} sx={commentCardStyles} />
      </Grid>
    </Grid>
  );
};

// Update Card Styles
const projectStartStyles = {
  mt: 1,
  p: 1,
  background: 'rgba(0, 90, 140, 0.10)',
  borderRadius: '8px',
  width: 170,
  textAlign: 'center',
};

const commentCardStyles = {
  '.MuiCardHeader-root': {
    pt: 1,
  },
};
