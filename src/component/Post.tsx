/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled, useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import SendIcon from '@mui/icons-material/Send';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import Divider from '@mui/material/Divider';

const Input = styled('input')({
  display: 'none',
});

const Post = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const DialogClickOpen = () => {
    setOpen(true);
  };
  const DialogClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ListItemButton onClick={DialogClickOpen}>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="Post" />
      </ListItemButton>

      <Dialog
        fullScreen={fullScreen}
        fullWidth
        open={open}
        onClose={DialogClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          <Typography variant="h6">Post</Typography>

          <IconButton
            color="inherit"
            aria-label="close"
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <TextField
            label="コメント"
            multiline
            minRows={4}
            fullWidth
            margin="dense"
          />
        </DialogContent>

        <DialogActions>
          <Divider />
          <Grid container>
            <label htmlFor="contained-button-file">
              <Input
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
              />
              <IconButton aria-label="upload picture" component="span">
                <InsertPhotoIcon />
              </IconButton>
            </label>
          </Grid>
          <Grid item>
            <Button endIcon={<SendIcon />}>Send</Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Post;
