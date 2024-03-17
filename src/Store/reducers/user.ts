import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'user',
  initialState: { user: null },
  reducers: {
    setUser: (state, { payload: { ...user } }) => {
      state.user = user;
    },
  },
});

export const { setUser } = slice.actions;
export const userReducers = slice.reducer;
