import React, { useState } from "react";
import ReactDOM from "react-dom";

const Stadistics = ({ good, neutral, bad }) => {
  const getTotal = () => {
    return good + neutral + bad;
  };

  const getAverage = () => {
    const total = getTotal();
    return (good * 1 + neutral * 0 + bad * -1) / total;
  };

  return (
    <>
      <h2>Stadistics</h2>
      <p>good : {good} </p>
      <p>neutral : {neutral}</p>
      <p>bad : {bad}</p>
      <p>all : {getTotal()}</p>
      <p>average : {getAverage()}</p>
      <p>positive : {(good / getTotal()) * 100} %</p>
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h2>Give feedback</h2>
      <button onClick={() => setGood(good + 1)}>good</button>{" "}
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>{" "}
      <button onClick={() => setBad(bad + 1)}>bad</button>
      {(good !== 0 || neutral !== 0 || bad !== 0) && (
        <Stadistics good={good} neutral={neutral} bad={bad} />
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
