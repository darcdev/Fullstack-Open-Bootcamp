import { createSlice } from '@reduxjs/toolkit';

export const notifications = createSlice({
  name: 'notifications',
  initialState: {
    message: '',
    actualNotification: 0,
  },
  reducers: {
    createNotification: (state, action) => {
      console.log(action.payload);
      return action.payload;
    },
    deleteNotification: (state, action) => {
      return '';
    },
  },
});

export const setNotification = (message, time) => {
  return (dispatch, getState) => {
    const { notifications } = getState();
    clearTimeout(notifications.actualNotification);
    const notificationId = setTimeout(() => {
      dispatch(deleteNotification());
    }, time * 1000);
    dispatch(
      createNotification({ message, actualNotification: notificationId })
    );
  };
};

export const { createNotification, deleteNotification } = notifications.actions;
export default notifications.reducer;
