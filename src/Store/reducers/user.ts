import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

const slice = createSlice({
  name: 'user',
  initialState: { user: { user_id: null } },
  reducers: {
    setUser: (state, { payload: { ...user } }) => {
      state.user = user;
    },
  },
});

export const selectUserId = (state: RootState) => state.user.user?.user_id;

export const { setUser } = slice.actions;
export const userReducers = slice.reducer;
