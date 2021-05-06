import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length));

  const getRandomAnecdote = () => {
    let randomNumber = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomNumber);
  };

  const getAnecdoteByVote = () => {
    let maxAnecdote = votes.indexOf(Math.max(...votes));
    return maxAnecdote;
  };

  const voteAnecdote = () => {
    const copyVotes = [...votes];

    copyVotes[selected] += 1;

    setVotes(copyVotes);
  };

  const anecdoteMostVotedPosition = getAnecdoteByVote();

  return (
    <>
      <div>
        <h2>Anecdote of the day</h2>
        <div>{anecdotes[selected]}</div>
        <p>has {votes[selected]} votes</p>
        <button onClick={voteAnecdote}>Vote</button>{" "}
        <button onClick={getRandomAnecdote}>next anecdote</button>
      </div>
      <div>
        <h2>Anecdote with most votes</h2>
        <p>{anecdotes[anecdoteMostVotedPosition]}</p>
        <p>has {votes[anecdoteMostVotedPosition]}</p>
      </div>
    </>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
