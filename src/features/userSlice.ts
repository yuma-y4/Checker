/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';

type USER = {
  photoUrl: string;
  displayName: string;
  email: string;
};

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: { photoUrl: '', displayName: '', uid: '', email: '' },
  },
  reducers: {
    login: (state, action) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = { photoUrl: '', displayName: '', uid: '', email: '' };
    },
    updateUserProfile: (state, action: PayloadAction<USER>) => {
      state.user.displayName = action.payload.displayName;
      state.user.photoUrl = action.payload.photoUrl;
      state.user.email = action.payload.email;
    },
  },
});

export const { login, logout, updateUserProfile } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.user;
export default userSlice.reducer;
