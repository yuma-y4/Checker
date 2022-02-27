import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import useReducer from '../features/userSlice';

export const store = configureStore({
  reducer: {
    user: useReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type AppDispatch = typeof store.dispatch;
