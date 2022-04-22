import { configureStore } from '@reduxjs/toolkit';
import blogsReducer from '../reducers/blog.reducer';
import notificationReducer from '../reducers/notification.reducer';
import userReducer from '../reducers/user.reducer';

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    user: userReducer,
    notification: notificationReducer
  }
});

export default store;
