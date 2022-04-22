import { configureStore } from '@reduxjs/toolkit';
import blogsReducer from '../reducers/blog.reducer';
import notificationReducer from '../reducers/notification.reducer';
import userReducer from '../reducers/user.reducer';
import usersReducer from '../reducers/users.reducer';

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    user: userReducer,
    users: usersReducer,
    notification: notificationReducer
  }
});

export default store;
