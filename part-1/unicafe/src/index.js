import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(6);
  const [neutral, setNeutral] = useState(2);
  const [bad, setBad] = useState(1);

  const getTotal = () => {
    return good + neutral + bad;
  };

  const getAverage = () => {
    const total = getTotal();
    return (good * 1 + neutral * 0 + bad * -1) / total;
  };

  return (
    <div>
      <h2>Give feedback</h2>
      <button>good</button> <button>neutral</button> <button>bad</button>
      <h2>Stadistics</h2>
      <p>good : {good} </p>
      <p>neutral : {neutral}</p>
      <p>bad : {bad}</p>
      <p>all : {getTotal()}</p>
      <p>average : {getAverage()}</p>
      <p>positive : {(good / getTotal()) * 100} %</p>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
