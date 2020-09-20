import { red } from '@material-ui/core/colors';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  Collapse,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Typography
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CommentIcon from '@material-ui/icons/Comment';
import ShareIcon from '@material-ui/icons/Share';
import SendIcon from '@material-ui/icons/Send';
import clsx from 'clsx';
import React, { ChangeEvent, useState } from 'react';
import moment from 'moment';
import MyAvatar from '../Avatar';
import Comment from '../Comment';
import postApi from '@/api/postApi';

interface PostPropsI {
  idPost: string;
  postedBy: {
    _id: string;
    name: string;
    avatar: string;
  };
  text: string;
  photo: string;
  comments: {
    _id: string;
    text: string;
    userId: {
      name: string;
      avatar: string;
    };
  }[];
  liked: boolean;
  likes: number;
  createdAt: string;
  user: {
    name: string;
    avatar: string;
  };
  handleLikePost: (id: string) => void;
  handleAddComment: (data: { post_id: string; text: string }) => void;
  handleDelPost: (postId: string) => void;
  loadingNewComent: boolean;
}

function Post({
  user,
  postedBy,
  text,
  photo,
  liked,
  likes,
  createdAt,
  idPost,
  comments,
  handleLikePost,
  handleAddComment,
  handleDelPost,
  loadingNewComent
}: PostPropsI) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [openInputCmt, setopenInputCmt] = React.useState(false);
  const [textComment, setTextComment] = useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleOpenInputCmt = () => {
    setopenInputCmt(!openInputCmt);
  };

  const handleChangeText = (
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    setTextComment(e.target.value);
  };

  const handleSubmitComment = () => {
    const data: { post_id: string; text: string } = {
      post_id: idPost,
      text: textComment.trim()
    };
    handleAddComment(data);
    setTextComment('');
  };

  const handleProfileMenuOpen = (event: ChangeEvent<any>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}>
      <MenuItem
        onClick={async () => {
          handleMenuClose();
          handleDelPost(idPost);
        }}>
        Delete
      </MenuItem>
    </Menu>
  );

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <MyAvatar name={postedBy?.name} avatar={postedBy?.avatar} />
        }
        action={
          <IconButton
            aria-label="settings"
            onClick={handleProfileMenuOpen}>
            <MoreVertIcon />
          </IconButton>
        }
        title={postedBy?.name}
        subheader={moment(Date.parse(createdAt)).fromNow()}
      />
      {photo && (
        <CardMedia
          className={classes.media}
          image={photo}
          title="Paella dish"
        />
      )}
      <CardContent>
        <Typography variant="body2" color="textPrimary" component="p">
          {text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="remove to favorites"
          onClick={() => handleLikePost(idPost)}>
          {liked ? (
            <FavoriteIcon color="primary" />
          ) : (
            <FavoriteBorderIcon color="primary" />
          )}
        </IconButton>
        <Typography color="primary" variant="body2">
          {likes && likes}
        </Typography>

        <div className={classes.boxComment}>
          <IconButton aria-label="share" onClick={handleOpenInputCmt}>
            <CommentIcon />
          </IconButton>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more">
            <ExpandMoreIcon />
          </IconButton>
        </div>
      </CardActions>
      <Collapse
        in={expanded}
        className={classes.listComment}
        timeout="auto"
        unmountOnExit>
        <CardContent>
          {comments.map((cmt) => {
            return (
              <Comment
                key={cmt._id}
                _id={cmt._id}
                text={cmt.text}
                name={cmt?.userId?.name}
                avatar={cmt?.userId?.avatar}
              />
            );
          })}
          {loadingNewComent && <CircularProgress size={23} />}
        </CardContent>
      </Collapse>
      <Divider />
      <div className={classes.margin}>
        <Grid
          className={classes.inputComment}
          alignItems="flex-end"
          container
          spacing={1}>
          <Grid item md={2}>
            <MyAvatar name={user?.name} avatar={user?.avatar} />
          </Grid>
          <Grid item md={8}>
            <TextField
              fullWidth
              multiline
              id="input-with-icon-grid"
              label="With a grid"
              value={textComment}
              onChange={handleChangeText}
            />
          </Grid>

          <Grid item md={2}>
            <IconButton
              aria-label="send comment"
              disabled={!textComment}
              onClick={handleSubmitComment}>
              <SendIcon color="primary" />
            </IconButton>
          </Grid>
        </Grid>
      </div>
      {renderMenu}
    </Card>
  );
}

export default Post;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  media: {
    height: 0,
    paddingTop: '100%' // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    // marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  },
  boxComment: {
    marginLeft: 'auto'
  },
  listComment: {
    width: '100%',
    maxHeight: '290px',
    overflowY: 'auto',
    overflowX: 'visible'
  },
  inputComment: {},
  margin: {
    width: '100%',
    padding: theme.spacing(1, 2, 2)
  }
}));
