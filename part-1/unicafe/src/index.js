import React, { useState } from "react";
import ReactDOM from "react-dom";

const Stadistic = ({ text, value }) => {
  return (
    <span>
      {text} : {value}
    </span>
  );
};

const Button = ({ text, evt }) => {
  return <button onClick={evt}>{text}</button>;
};

const Stadistics = ({ good, neutral, bad }) => {
  const getTotal = () => {
    return good + neutral + bad;
  };

  const getAverage = () => {
    const total = getTotal();
    return (good * 1 + neutral * 0 + bad * -1) / total;
  };

  const getPositive = () => {
    return (good / getTotal()) * 100;
  };

  return (
    <>
      <h2>Stadistics</h2>
      <table>
        <tbody>
          <tr>
            <td>
              <Stadistic text="good" value={good} />
            </td>
          </tr>
          <tr>
            <td>
              <Stadistic text="neutral" value={neutral} />
            </td>
          </tr>
          <tr>
            <td>
              <Stadistic text="bad" value={bad} />
            </td>
          </tr>
          <tr>
            <td>
              <Stadistic text="all" value={getTotal()} />
            </td>
          </tr>
          <tr>
            <td>
              <Stadistic text="average" value={getAverage()} />
            </td>
          </tr>
          <tr>
            <td>
              <Stadistic text="positive" value={getPositive()} />
            </td>
          </tr>
        </tbody>
      </table>
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
      <Button text="good" evt={() => setGood(good + 1)} />{" "}
      <Button text="neutral" evt={() => setNeutral(neutral + 1)} />{" "}
      <Button text="bad" evt={() => setBad(bad + 1)} />
      {good !== 0 || neutral !== 0 || bad !== 0 ? (
        <Stadistics good={good} neutral={neutral} bad={bad} />
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
