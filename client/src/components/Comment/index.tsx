import {
  Avatar,
  Grid,
  makeStyles,
  TextField,
  Theme,
  Typography
} from '@material-ui/core';
import React from 'react';
import MyAvatar from '../Avatar';
type CommentProps = {
  _id?: string;
  avatar: string;
  name: string;
  text: string;
};
function Comment({ avatar, name, _id, text }: CommentProps) {
  const classes = useStyles();
  return (
    <div className={classes.padding}>
      <Grid alignItems="flex-end" container spacing={1}>
        <Grid item md={5}>
          <div className={classes.boxAvatar}>
            <MyAvatar name={name} avatar={avatar} />
            <Typography
              className={classes.name}
              color="textSecondary"
              variant="caption">
              {name}
            </Typography>
          </div>
        </Grid>
        <Grid item md={7}>
          <TextField
            fullWidth
            multiline
            id="input-with-icon-grid"
            value={text}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default Comment;

const useStyles = makeStyles((theme: Theme) => ({
  padding: {
    width: '100%',
    padding: theme.spacing(0, 0, 1),
    display: 'flex',
    alignItems: 'center'
  },
  boxAvatar: {
    display: 'flex',
    alignItems: 'center'
  },
  name: {
    marginLeft: theme.spacing(1)
  }
}));
