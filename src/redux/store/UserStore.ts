import { createSlice } from '@reduxjs/toolkit';

interface UserState {
    data: any,
    loading: boolean;
    isSuccess: boolean;
    error: string | null;
}
const initialState: UserState = {
    data: null,
    loading: false,
    isSuccess: false,
    error: null,
};

const users = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getUserStart(state) {
        state.loading = true;
        state.isSuccess = false;
        state.error = null;
    },
    getUserSuccess(state, action) {
        state.data = action.payload.users; 
        state.loading = false;
        state.isSuccess = true;
        state.error = null;
    },
    getUserFailure(state, action) {
        state.loading = false;
        state.isSuccess = false;
        state.error = action.payload;
    }
  },
});

export const { getUserStart, getUserSuccess, getUserFailure } = users.actions;
export default users.reducer;
