import { createSlice } from '@reduxjs/toolkit';

const notificationReducer = createSlice({
  name: 'notification',
  initialState: {
    message: '',
    timeId: null
  },
  reducers: {
    createNotification(state, action) {
      state.message = action.payload;
    },
    addTimeId(state, action) {
      state.timeId = action.payload;
    },
    cleanNotification() {
      return { message: '', timeId: null };
    }
  }
});

export const addNotification = (message, time) => {
  return async (dispatch, getState) => {
    dispatch(createNotification(message));
    const { notification } = getState();
    if (notification.actualId) clearTimeout(notification.actualId);
    const timeId = setTimeout(() => {
      dispatch(cleanNotification());
    }, time * 1000);
    dispatch(addTimeId({ timeId }));
  };
};

export const { createNotification, cleanNotification, addTimeId } = notificationReducer.actions;
export default notificationReducer.reducer;
