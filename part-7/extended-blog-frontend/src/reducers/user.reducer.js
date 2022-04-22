import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';
import blogService from '../services/blogs';
import { addNotification } from './notification.reducer';

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
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(addInfoUser(user));
      dispatch(addNotification('', 0));
    } catch (error) {
      dispatch(addNotification('Wrong credentials', 5));
      return;
    }
  };
};

export const { addInfoUser } = userReducer.actions;
export default userReducer.reducer;
