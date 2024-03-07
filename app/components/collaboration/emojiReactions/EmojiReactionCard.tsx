'use client';

import { useMemo, useState } from 'react';

import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import EmojiPickerCard from './EmojiPicker';
import { Emoji, Reaction, ReactionCount } from './emojiReactionTypes';

interface EmojiReactionCardProps {
  userReaction?: Reaction;
  countOfReactions: ReactionCount[];
  handleReaction: (emoji: Emoji, operation: 'upsert' | 'delete') => void;
}

export function EmojiReactionCard({ userReaction, countOfReactions, handleReaction }: EmojiReactionCardProps) {
  const [isEmojiPickerClicked, setIsEmojiPickerClicked] = useState(false);

  const topReactions = useMemo(
    () => countOfReactions.sort((a, b) => b.count - a.count).slice(0, 3),
    [countOfReactions],
  );

  const handleEmojiReaction = (emoji: Emoji) => {
    // No Reaction before: Upsert
    // Reaction with different emoji: Upsert
    // Removal of emoji reaction: Delete
    const operation = !userReaction || userReaction.shortCode !== emoji.shortCode ? 'upsert' : 'delete';
    handleReaction(emoji, operation);
  };

  return (
    <Box>
      <Grid
        container
        direction="row"
        sx={{
          alignItems: 'center',
        }}
      >
        {topReactions?.map((reaction, key) => {
          return (
            <Grid item key={key}>
              <Button
                onClick={() => handleEmojiReaction(reaction.emoji)}
                sx={
                  reaction.emoji.nativeSymbol === userReaction?.nativeSymbol
                    ? activeReactionCardButtonStyles
                    : reactionCardButtonStyles
                }
              >
                {reaction.emoji.nativeSymbol || 'X'}
                <Typography variant="caption" sx={{ color: 'text.primary' }}>
                  {reaction.count}
                </Typography>
              </Button>
            </Grid>
          );
        })}

        <Grid item>
          <Button sx={addNewReactionButtonStyles} onClick={() => setIsEmojiPickerClicked((isClicked) => !isClicked)}>
            <AddReactionOutlinedIcon sx={addNewReactionIconStyles} />
          </Button>
        </Grid>
      </Grid>
      <EmojiPickerCard
        isEmojiPickerClicked={isEmojiPickerClicked}
        setEmojiPickerClicked={setIsEmojiPickerClicked}
        handleEmojiSelection={handleEmojiReaction}
      />
    </Box>
  );
}

const reactionCardButtonStyles = {
  height: '1.6em',
  minWidth: '.1em',
  width: '3rem',
  bgcolor: 'background.paper',
  borderStyle: 'solid',
  borderRadius: '4px',
  borderWidth: 'thin',
  borderColor: 'InactiveBorder',
  m: '.3em',
  p: '.8em',
};

const activeReactionCardButtonStyles = {
  height: '1.6em',
  minWidth: '.1em',
  width: '3rem',
  bgcolor: 'success.light',
  borderStyle: 'solid',
  borderRadius: '4px',
  borderWidth: 'thin',
  borderColor: 'secondary.main',
  m: '.2em',
  p: '.3em',
};

const addNewReactionButtonStyles = {
  height: '1.6em',
  minWidth: '.1em',
  width: '1rem',
  bgcolor: 'background.paper',
  mr: '.3em',
  p: '1em',
  borderRadius: '4px',
  color: 'text.primary',
  '&:hover': {
    color: 'secondary.main',
    bgcolor: 'background.paper',
  },
};

const addNewReactionIconStyles = {
  fontSize: 24,
};
