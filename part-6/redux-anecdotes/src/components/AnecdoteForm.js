import { connect } from 'react-redux';
import { createNewAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = ({ createNewAnecdote }) => {
  const addAnecdote = async (event) => {
    event.preventDefault();
    const anecdote = event.target.title.value;
    createNewAnecdote(anecdote);
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
const mapDispatchToProps = {
  createNewAnecdote,
};
const AnecdoteFormConnect = connect(null, mapDispatchToProps)(AnecdoteForm);
export default AnecdoteFormConnect;
