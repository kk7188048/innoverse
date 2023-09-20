import { useState } from 'react';

import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import EditIcon from '@mui/icons-material/Edit';
import FormatAlignLeftOutlinedIcon from '@mui/icons-material/FormatAlignLeftOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SendIcon from '@mui/icons-material/Send';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import Button, { ButtonProps } from '@mui/material/Button';
import { SxProps } from '@mui/material/styles';

import ApplyIcon from '@/components/icons/ApplyIcon';
import ChatIcon from '@/components/icons/ChatIcon';
import RecommendIcon from '@/components/icons/RecommendIcon';

interface InteractionButtonProps extends ButtonProps {
  interactionType: InteractionType;
  label?: string;
  onClick?: () => void;
  sx?: SxProps;
}

export enum InteractionType {
  LIKE = 'like',
  PROJECT_FOLLOW = 'project-follow',
  USER_FOLLOW = 'user-follow',
  COLLABORATION = 'collaboration',
  COMMENT = 'comment',
  COMMENT_SEND = 'comment-send',
  SHARE_OPINION = 'share-opinion',
  ADD_INSIGHTS = 'add-insights',
  APPLY = 'apply',
  RECOMMEND = 'recommend',
}

export default function InteractionButton(props: InteractionButtonProps) {
  const { interactionType, label, onClick, sx } = props;
  const [isHovered, setIsHovered] = useState(false);

  const getInteractionIcon = () => {
    if (interactionType === InteractionType.LIKE) return <ThumbUpOutlinedIcon fontSize="small" />;
    if (interactionType === InteractionType.PROJECT_FOLLOW) return <BookmarkAddOutlinedIcon fontSize="small" />;
    if (interactionType === InteractionType.USER_FOLLOW) return <PersonAddIcon fontSize="small" />;
    if (interactionType === InteractionType.COLLABORATION) return <PeopleOutlineOutlinedIcon fontSize="small" />;
    if (interactionType === InteractionType.COMMENT) return <ChatIcon color={isHovered ? 'white' : 'black'} />;
    if (interactionType === InteractionType.COMMENT_SEND) return <SendIcon fontSize="small" />;
    if (interactionType === InteractionType.SHARE_OPINION) return <EditIcon fontSize="small" />;
    if (interactionType === InteractionType.ADD_INSIGHTS) return <FormatAlignLeftOutlinedIcon fontSize="small" />;
    if (interactionType === InteractionType.APPLY) return <ApplyIcon color={isHovered ? 'white' : 'black'} />;
    if (interactionType === InteractionType.RECOMMEND) return <RecommendIcon color={isHovered ? 'white' : 'black'} />;
  };

  const getButtontext = () => {
    if (label) return label;
    if (interactionType === InteractionType.LIKE) return 'Like';
    if (interactionType === InteractionType.PROJECT_FOLLOW) return 'Projekt folgen';
    if (interactionType === InteractionType.USER_FOLLOW) return 'Folgen';
    if (interactionType === InteractionType.COLLABORATION) return 'Hilf uns!';
    if (interactionType === InteractionType.COMMENT_SEND) return 'Senden';
    if (interactionType === InteractionType.SHARE_OPINION) return 'Teile Deine Erfahrung';
    if (interactionType === InteractionType.COMMENT) return;
    if (interactionType === InteractionType.ADD_INSIGHTS) return 'Teile Deine Erfahrung';
    if (interactionType === InteractionType.APPLY) return 'Ich bin dabei';
    if (interactionType === InteractionType.RECOMMEND) return 'Ich kenne jemanden';
  };

  return (
    <Button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      variant="outlined"
      startIcon={getInteractionIcon()}
      sx={{
        mr: 1,
        px: getButtontext() === undefined ? 1 : 2,
        py: 1,
        color: 'rgba(0, 0, 0, 0.56)',
        borderRadius: '48px',
        fontFamily: 'Arial',
        fontSize: '13px',
        fontWeight: '700',
        lineHeight: '19px',
        border: ' 1px solid rgba(0, 0, 0, 0.10)',
        background: 'rgba(255, 255, 255, 0.10)',
        minWidth: 0,
        height: '35px',
        '&:hover': {
          border: '1px solid rgba(255, 255, 255, 0.40)',
          background: 'secondary.main',
        },
        '&:active': {
          border: '1px solid rgba(255, 255, 255, 0.40)',
          background: 'palette.secondary.main',
        },
        '& .MuiButton-startIcon': {
          margin: getButtontext() === undefined ? 0 : undefined,
        },
        ...sx,
      }}
    >
      {getButtontext()}
    </Button>
  );
}
