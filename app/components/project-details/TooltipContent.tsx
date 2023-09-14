import { Grid, Typography } from '@mui/material';

import { Person } from '@/common/types';

import InteractionButton, { InteractionType } from '../common/InteractionButton';

interface TeamMemberProps {
  teamMember: Person;
}

export const TooltipContent = (props: TeamMemberProps) => {
  const { teamMember } = props;
  return (
    <Grid container sx={{ m: 3, display: 'flex', justifyContent: 'space-between', gap: 3, width: 'fit-content' }}>
      <Grid item container sx={{ display: 'flex', flexDirection: 'column', width: 'fit-content' }}>
        <Typography variant="subtitle1" sx={{ color: 'text.primary', lineHeight: 1 }}>
          {teamMember.name}
        </Typography>
        <Typography variant="caption" color="text.primary">
          {teamMember.role}
        </Typography>
      </Grid>
      <Grid item>
        <InteractionButton interactionType={InteractionType.USER_FOLLOW} />
        <InteractionButton interactionType={InteractionType.COMMENT} />
      </Grid>
    </Grid>
  );
};
