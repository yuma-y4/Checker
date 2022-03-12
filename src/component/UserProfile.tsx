/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable react/destructuring-assignment */
import React, { VFC, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme, styled } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import {
  getAuth,
  updateEmail,
  updateProfile,
  sendPasswordResetEmail,
  sendEmailVerification,
} from 'firebase/auth';
import { selectUser, updateUserProfile } from '../features/userSlice';

export type LoginUser = {
  email: string;
  displayName: string;
};

const UserProfile: VFC<LoginUser> = (props) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const theme = useTheme();
  const auth = getAuth();
  const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));
  const [open, setOpen] = useState(false);
  const [useemail, setEmail] = useState('');
  const [username, setUsername] = useState('');

  const Input = styled('input')({
    display: 'none',
  });

  const DialogClickOpen = () => {
    setOpen(true);
  };
  const DialogClose = () => {
    setOpen(false);
  };

  const UpdateEmail = async () => {
    if (auth.currentUser != null) {
      await updateEmail(auth.currentUser, useemail);
      await sendEmailVerification(auth.currentUser).then(() => {
        alert('追加したメールに確認メールを送りました。メールをご確認ください');
      });

      dispatch(
        updateUserProfile({
          displayName: username,
          photoUrl: '',
          email: useemail,
        }),
      );
    }
  };

  const UpdateUsername = () => {
    if (auth.currentUser != null) {
      updateProfile(auth.currentUser, {
        displayName: username,
      })
        .then(() => {
          dispatch(
            updateUserProfile({
              displayName: username,
              photoUrl: '',
              email: useemail,
            }),
          );
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  const UpdatePassword = () => {
    sendPasswordResetEmail(auth, user.email)
      .then(() => {
        alert('リセットメールを送りましたので確認してください');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <ListItemButton onClick={DialogClickOpen}>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="User" />
      </ListItemButton>

      <Dialog
        fullScreen={fullScreen}
        fullWidth
        open={open}
        onClose={DialogClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">UserProfile</DialogTitle>
        <DialogContent dividers>
          <Box sx={{ m: 2 }}>
            <Box sx={{ my: 2 }}>
              <Typography variant="h6" gutterBottom>
                アバター画像
              </Typography>
              <Grid container justifyContent="space-between">
                <Avatar src={user.photoUrl} />

                <label htmlFor="contained-button-file">
                  {/*  /// firebaseに画像をアップロードする方法をメンターに聞く */}
                  <Input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                  />
                  <Button variant="contained" component="span">
                    変更
                  </Button>
                </label>
              </Grid>
            </Box>
            <Divider />
            <Box sx={{ my: 2 }}>
              <Typography variant="h6" gutterBottom>
                メールアドレス
              </Typography>
              <Grid container justifyContent="space-between">
                <TextField
                  defaultValue={props.email}
                  variant="standard"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setEmail(e.target.value);
                  }}
                />

                <Button variant="contained" onClick={UpdateEmail}>
                  変更
                </Button>
              </Grid>
            </Box>
            <Divider />
            <Box sx={{ my: 2 }}>
              <Typography variant="h6" gutterBottom>
                ユーザーネーム
              </Typography>
              <Grid container justifyContent="space-between">
                <TextField
                  defaultValue={props.displayName}
                  variant="standard"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setUsername(e.target.value);
                  }}
                />
                <Button variant="contained" onClick={UpdateUsername}>
                  変更
                </Button>
              </Grid>
            </Box>
            <Divider />
            <Box sx={{ my: 2 }}>
              <Button fullWidth variant="outlined" onClick={UpdatePassword}>
                パスワード変更
              </Button>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={DialogClose}>
            閉じる
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserProfile;
