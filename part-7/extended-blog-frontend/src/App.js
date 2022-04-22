import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Login from './components/Login';
import Blogs from './components/Blogs';
import blogService from './services/blogs';
import { addInfoUser } from './reducers/user.reducer.js';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(user);
  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser');
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      dispatch(addInfoUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  const handleClose = () => {
    dispatch(addInfoUser(null));
    window.localStorage.removeItem('loggedUser');
  };
  return (
    <div>
      <h1>Blogs App</h1>
      {user && (
        <div>
          <span>{user.username} logged in </span>
          <button onClick={handleClose}>Cerrar Sesión</button>
        </div>
      )}
      {user ? <Blogs user={user} /> : <Login />}
    </div>
  );
};

export default App;
