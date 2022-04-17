import { createSlice } from '@reduxjs/toolkit';

export const notifications = createSlice({
  name: 'notifications',
  initialState: 'Mensaje de Prueba',
});

export default notifications.reducer;
