import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Notification from '../components/Notification';
import { loginUser } from '../reducers/user.reducer';

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(loginUser({ username, password }));
  };

  return (
    <>
      <h2>Log in to application</h2>

      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            id="username"
            type="text"
            name="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
      <Notification />
    </>
  );
};

export default Login;
