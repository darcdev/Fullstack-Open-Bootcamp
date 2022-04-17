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

export const { createNotification, deleteNotification } = notifications.actions;
export default notifications.reducer;
