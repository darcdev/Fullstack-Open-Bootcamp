import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

/*
const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};*/

export const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      return state.map((anecdote) => {
        return anecdote.id === action.payload.id ? action.payload : anecdote;
      });
    },
    createAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createNewAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(anecdote);
    dispatch(createAnecdote(newAnecdote));
  };
};

export const voteFor = (anecdote, id) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.update(
      { ...anecdote, votes: anecdote.votes + 1 },
      id
    );
    dispatch(voteAnecdote(newAnecdote));
  };
};

export const { createAnecdote, voteAnecdote, setAnecdotes } =
  anecdotesSlice.actions;

export default anecdotesSlice.reducer;
