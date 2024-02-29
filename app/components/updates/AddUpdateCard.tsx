import { useState } from 'react';
import dayjs from 'dayjs';

import { Box, SxProps, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import CustomToast from '../common/CustomToast';
import InteractionButton, { interactionButtonStyles, InteractionType } from '../common/InteractionButton';
import AddUpdateDialog from '../newsPage/addUpdate/AddUpdateDialog';

interface AddUpdateCardProps {
  projectId: string;
  setUpdateAdded: (added: boolean) => void;
  sx?: SxProps;
}

export const AddUpdateCard = (props: AddUpdateCardProps) => {
  const { projectId, setUpdateAdded, sx } = props;
  const [addUpdateDialogOpen, setAddUpdateDialogOpen] = useState(false);

  const defaultFormValues = {
    comment: '',
    date: dayjs(new Date()),
    author: '',
    projectId,
  };

  return (
    <Box sx={sx}>
      <Card sx={cardStyles} elevation={0}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="body1" color="secondary.contrastText" sx={{ pb: 2 }}>
            Halten Sie Ihr Publikum auf dem Laufenden! Klicken Sie hier, um Neuigkeiten hinzuzufügen.
          </Typography>
          <InteractionButton
            onClick={() => setAddUpdateDialogOpen(true)}
            interactionType={InteractionType.ADD_UPDATE}
            sx={{ ...interactionButtonStyles, ...buttonStyle }}
          />
        </CardContent>
      </Card>
      <AddUpdateDialog
        open={addUpdateDialogOpen}
        setOpen={setAddUpdateDialogOpen}
        setUpdateAdded={setUpdateAdded}
        defaultFormValues={defaultFormValues}
      />
      <CustomToast />
    </Box>
  );
};

const cardStyles = {
  height: 'fit-content',
  borderRadius: '8px',
  background: 'linear-gradient(90deg, #FAF9F7 0%, #F6F5ED 100%)',
};

const buttonStyle = {
  borderRadius: '50px',
  backgroundColor: 'secondary.main',
  height: ' 48px',
  fontSize: '18px',
  boxShadow: 'none',
};
