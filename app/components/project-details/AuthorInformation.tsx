import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { User } from '@/common/types';
import { openWebex } from '@/utils/openWebex';

import AvatarIcon from '../common/AvatarIcon';
import InteractionButton, { InteractionType } from '../common/InteractionButton';
import { StyledTooltip } from '../common/StyledTooltip';

import { TooltipContent } from './TooltipContent';

interface AuthorInformationProps {
  author: User;
  projectName: string;
}

export const AuthorInformation = (props: AuthorInformationProps) => {
  const { author, projectName } = props;

  return (
    <Stack direction="row" justifyContent="space-between" flexWrap={'wrap'} pt={4}>
      <Stack direction="column" sx={{ marginRight: 3 }}>
        <Stack direction="row" spacing={1} sx={{ marginBottom: 1 }}>
          <Box>
            <StyledTooltip
              arrow
              key={author.id}
              title={<TooltipContent projectName={projectName} teamMember={author} />}
              placement="bottom"
            >
              <AvatarIcon user={author} size={48} allowAnimation />
            </StyledTooltip>
          </Box>
          <Stack>
            <Typography variant="body2" color="text.primary" sx={{ ml: '16px' }}>
              {author.name}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ ml: '16px' }}>
              {author.role}
            </Typography>
          </Stack>
        </Stack>
        <Stack direction="row" alignItems="center" pb={2} spacing={1} sx={{ m: 0 }} mt={2}>
          <Typography variant="caption" color="text.primary">
            {author.department}
          </Typography>
        </Stack>
      </Stack>
      <Stack direction="row" spacing={1} flexWrap={'wrap'} sx={{ mb: 2 }}>
        <InteractionButton
          projectName={projectName}
          interactionType={InteractionType.COMMENT}
          tooltip="Chat über Webex"
          onClick={() => openWebex(author.email)}
          sx={{ mb: 1, mr: 1 }}
        />
      </Stack>
    </Stack>
  );
};
