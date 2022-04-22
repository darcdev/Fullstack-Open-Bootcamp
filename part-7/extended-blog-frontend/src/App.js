import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Blogs from './components/Blogs';
import blogService from './services/blogs';
import { addInfoUser } from './reducers/user.reducer.js';
import Users from './components/Users';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
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
      <Router>
        {user && (
          <div>
            <span>{user.username} logged in </span>
            <button onClick={handleClose}>Cerrar Sesión</button>
          </div>
        )}
        <Routes>
          <Route path="/" element={user ? <Users /> : <Login />} />
          <Route path="/blogs" element={user ? <Blogs /> : <Navigate redirect to={<Login />} />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
