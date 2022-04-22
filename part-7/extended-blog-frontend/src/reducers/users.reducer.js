import { createSlice } from '@reduxjs/toolkit';
import usersService from '../services/users';

const blogsReducer = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload;
    }
  }
});

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getAll();
    console.log(users);
    dispatch(setUsers(users));
  };
};

export const { setUsers } = blogsReducer.actions;
export default blogsReducer.reducer;
