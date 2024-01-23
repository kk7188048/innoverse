import { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

import { User } from '@/common/types';
import theme from '@/styles/theme';

import AvatarIcon from '../common/AvatarIcon';
import CustomDialog from '../common/CustomDialog';
import InteractionButton, { InteractionType } from '../common/InteractionButton';

interface TeamMembersProps {
  team: User[];
  projectName: string;
}

const TeamMembersColumn = (props: TeamMembersProps) => {
  const { team, projectName } = props;
  const [open, setOpen] = useState(false);

  const maxTeamMembers = useMediaQuery(theme.breakpoints.down('md')) ? 8 : 3;
  return (
    <>
      <Typography variant="overline" sx={titleStyles}>
        Unser Team
      </Typography>

      <Card sx={cardStyles} elevation={0}>
        <CardContent sx={cardContentStyles}>
          {team.slice(0, maxTeamMembers).map((teamMember, index) => (
            <Box key={index} sx={rowStyles}>
              <Stack sx={boxStyles} direction="row" spacing={1}>
                <AvatarIcon size={24} user={teamMember} key={teamMember.name} />
                <Typography variant="subtitle1" sx={teamMemberNameStyles}>
                  {teamMember.name}
                </Typography>
              </Stack>

              <Box sx={iconStyles}>
                <InteractionButton projectName={projectName} interactionType={InteractionType.USER_FOLLOW_ICON} />
                <InteractionButton projectName={projectName} interactionType={InteractionType.COMMENT} />
              </Box>
            </Box>
          ))}

          {team.length > maxTeamMembers && (
            <Button onClick={() => setOpen(true)} sx={showAllButtonStyles}>
              <Typography color="action.active">Show all</Typography>
            </Button>
          )}
        </CardContent>
      </Card>

      <CustomDialog open={open} handleClose={() => setOpen(false)} title="All team members">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {team.map((teamMember, index) => (
            <Stack key={index} sx={rowStyles} spacing={5} direction="row">
              <Stack sx={boxStyles} direction="row" spacing={1}>
                <AvatarIcon size={48} user={teamMember} key={teamMember.name} />
                <Box>
                  <Typography variant="subtitle1" sx={{ color: 'text.primary', lineHeight: 1 }}>
                    {teamMember.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {teamMember.role}
                  </Typography>
                </Box>
              </Stack>

              <Box>
                <InteractionButton projectName={projectName} interactionType={InteractionType.USER_FOLLOW} />
                <InteractionButton projectName={projectName} interactionType={InteractionType.COMMENT} />
              </Box>
            </Stack>
          ))}
        </Box>
      </CustomDialog>
    </>
  );
};

export default TeamMembersColumn;

// Team Members Column Styles
const titleStyles = {
  textAlign: 'center',
  color: 'primary.light',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
};

const cardStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  borderRadius: '8px',
  background: 'rgba(240, 238, 225, 0.10)',
  border: '1px solid rgba(0, 90, 140, 0.10)',
  margin: 0,
  padding: 0,
  width: '369px',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    height: '411px',
  },
};

const cardContentStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  gap: 1,
  height: '209px',
};

const rowStyles = {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const teamMemberNameStyles = {
  color: 'text.primary',
  lineHeight: 1,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '23ch',
  whiteSpace: 'wrap',
};

const iconStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const boxStyles = {
  marginLeft: 1,
  flex: 1,
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
};

const showAllButtonStyles = {
  backgroundColor: 'inherit',
  borderRadius: '48px',
  border: '1px solid rgba(0, 0, 0, 0.10)',
  backdropFilter: 'blur(24px)',
  '&:hover': {
    color: 'action.active',
  },
};
