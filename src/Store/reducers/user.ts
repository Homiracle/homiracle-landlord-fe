import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

const initUser = {
  user_id: "",
  user_name: "",
  password: "",
  email: "",
  role: "",
  isMale: null,
  date_of_birth: null,
  phone: null,
  CID: null,
  address: null
}

const slice = createSlice({
  name: 'user',
  initialState: initUser,
  reducers: {
    setUser: (state, { payload: { ...user } }) => {
      state = user;
    },
    removeUser: (state) => {
      state = initUser;
    },
  },
});

export const selectUserId = (state: RootState) => state.user?.user_id;
export const selectUser = (state: RootState) => state.user;
export const { setUser, removeUser } = slice.actions;
export const userReducers = slice.reducer;
