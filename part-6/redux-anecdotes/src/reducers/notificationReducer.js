import { createSlice } from '@reduxjs/toolkit';

export const notifications = createSlice({
  name: 'notifications',
  initialState: '',
  reducers: {
    createNotification: (state, action) => {
      return action.payload;
    },
    deleteNotification: (state, action) => {
      return '';
    },
  },
});

export const setNotification = (message, time) => {
  return (dispatch) => {
    dispatch(createNotification(message));
    setTimeout(() => {
      dispatch(deleteNotification());
    }, time * 1000);
  };
};

export const { createNotification, deleteNotification } = notifications.actions;
export default notifications.reducer;
