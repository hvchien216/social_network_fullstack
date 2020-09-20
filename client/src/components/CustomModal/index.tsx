import { CreatePostReq } from '@/typings/index';
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  makeStyles,
  TextField,
  Theme,
  Typography
} from '@material-ui/core';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { ChangeEvent, useState } from 'react';
import MyAvatar from '../Avatar';
type MyModalProps = {
  open: boolean;
  handleClose: () => void;
  user: {
    name: string;
    avatar: string;
  };
  handleAddPost: (data: CreatePostReq) => void;
};
function MyModal({
  open,
  handleClose,
  user,
  handleAddPost
}: MyModalProps) {
  const classes = useStyles();
  const [text, setText] = useState('');
  const [fileInputState, setFileInputState] = useState('');
  const [previewSource, setPreviewSource] = useState('');

  const handleChangeText = (
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    setText(e.target.value);
  };

  const handleFileInputChange = (
    e: ChangeEvent<HTMLInputElement & EventTarget>
  ): void => {
    const file: any | null = e.target.files;
    previewFile(file[0]);
    setFileInputState(file[0]);
  };

  const previewFile = (file: any) => {
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result as string);
    };
  };

  const handleCancelPreview = () => {
    setPreviewSource('');
    setFileInputState('');
  };

  const handleSubmit = () => {
    handleClose();
    const data: CreatePostReq = {
      text,
      file: fileInputState
    };
    handleAddPost(data);
  };
  return (
    <React.Fragment>
      <Dialog
        // fullWidth={fullWidth}
        maxWidth="xs"
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title">
        <DialogTitle id="max-width-dialog-title">
          <div className={classes.modalHeader}>
            <MyAvatar name={user?.name} avatar={user?.avatar} />
            <Typography className={classes.name}>
              {user?.name}
            </Typography>
          </div>
        </DialogTitle>
        <DialogContent>
          <div className={classes.root}>
            <TextField
              name="text"
              value={text}
              onChange={handleChangeText}
              fullWidth
              label="What's new with you?"
            />
            {!fileInputState && (
              <Button component="label">
                <CameraAltIcon />
                <input
                  type="file"
                  style={{ display: 'none' }}
                  accept="image/*"
                  onChange={handleFileInputChange}
                  value={fileInputState}
                />
              </Button>
            )}
            {previewSource && (
              <div className={classes.imagePreview}>
                <img src={previewSource} alt="chosen" />
                <IconButton
                  className={classes.iconCancelPreview}
                  onClick={handleCancelPreview}
                  color="secondary">
                  <DeleteIcon />
                </IconButton>
              </div>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            disabled={!Boolean(text)}
            onClick={handleSubmit}
            color="primary">
            POST
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default MyModal;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
      // width: '25ch'
    }
  },
  modalHeader: {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center'
  },
  name: {
    paddingLeft: theme.spacing(2)
  },
  imagePreview: {
    position: 'relative',
    '& > img': {
      width: '100%',
      verticalAlign: 'middle'
    }
  },
  iconCancelPreview: {
    position: 'absolute',
    top: '0',
    right: '10px'
  }
}));
