import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';
import blogService from '../services/blogs';

const userReducer = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    addInfoUser(state, action) {
      return action.payload;
    }
  }
});

export const loginUser = ({ username, password }) => {
  return async (dispatch) => {
    const user = await loginService.login({ username, password });
    window.localStorage.setItem('loggedUser', JSON.stringify(user));
    blogService.setToken(user.token);
    dispatch(addInfoUser({ user }));
  };
};

export const { addInfoUser } = userReducer.actions;
export default userReducer.reducer;
