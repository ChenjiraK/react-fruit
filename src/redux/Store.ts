import { configureStore } from '@reduxjs/toolkit';
import userStore from './store/UserStore';

const store = configureStore({
  reducer: {
    users: userStore,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;