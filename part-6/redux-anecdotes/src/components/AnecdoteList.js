import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({ anecdotes }) => {
    const listAnecdotes = [...anecdotes];
    console.log(listAnecdotes);
    return listAnecdotes.sort(function (a, b) {
      return b.votes - a.votes;
    });
  });
  const vote = (id) => {
    dispatch(voteAnecdote(id));
  };
  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteForm;
