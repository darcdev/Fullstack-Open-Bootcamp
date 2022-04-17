import { createSlice } from '@reduxjs/toolkit';

export const filters = createSlice({
  name: 'filters',
  initialState: '',
  reducers: {
    changeFilter: (state, action) => {
      return action.payload;
    },
  },
});

export const { changeFilter } = filters.actions;
export default filters.reducer;
