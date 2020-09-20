import { Avatar, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
type AvatarProps = {
  _id?: string;
  avatar: string;
  name: string;
};
function MyAvatar({ avatar, name }: AvatarProps) {
  const classes = useStyles();
  return (
    <>
      <Avatar src={avatar} className={classes.avatar}>
        {name
          ?.split(' ')
          [name.split(' ').length - 1][0]?.toUpperCase()}
      </Avatar>
    </>
  );
}

export default MyAvatar;

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    background: theme.palette.secondary.main,
    color: theme.palette.primary.contrastText
  }
}));
