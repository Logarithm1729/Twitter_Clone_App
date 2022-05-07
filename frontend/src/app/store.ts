import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import postReducer from '../features/post/postSlice';
import coreReducer from '../features/core/coreSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    core: coreReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
