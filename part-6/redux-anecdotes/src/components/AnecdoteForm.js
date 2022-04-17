import { useDispatch } from 'react-redux';
import { createNewAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const anecdote = event.target.title.value;
    dispatch(createNewAnecdote(anecdote));
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="title" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
