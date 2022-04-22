import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './components/Login';
import Blogs from './components/Blogs';
import blogService from './services/blogs';
import { addInfoUser } from './reducers/user.reducer.js';
import Users from './components/Users';
import User from './components/User';
import { initializeUsers } from './reducers/users.reducer';
import Blog from './components/Blog';
import { initializeBlogs } from './reducers/blog.reducer';
import styled from 'styled-components';

const Header = styled.header`
  background-color: gray;
  padding: 0.4rem;
`;
const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const MenuList = styled.ul`
  display: flex;
  flex: 2;
  list-style-type: none;
  margin: 0;
  padding: 0;
`;
const MenuElement = styled.li`
  max-width: 3rem;
  flex: 1;
`;
const Logged = styled.div`
  display: flex;
  justify-content: flex-end;
`;
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
  useEffect(() => {
    dispatch(initializeUsers());
    dispatch(initializeBlogs());
  }, []);

  const handleClose = () => {
    dispatch(addInfoUser(null));
    window.localStorage.removeItem('loggedUser');
  };
  return (
    <div>
      <Header>
        <Nav>
          <MenuList>
            <MenuElement>
              <Link to="/blogs">blogs</Link>
            </MenuElement>
            <MenuElement>
              <Link to="/users">users</Link>
            </MenuElement>
          </MenuList>

          <Logged style={{ flex: '1' }}>
            {user && (
              <>
                <span>{user.username} logged in </span>
                <button onClick={handleClose}>Cerrar Sesión</button>
              </>
            )}
          </Logged>
        </Nav>
      </Header>
      <h1>Blogs App</h1>

      <Routes>
        <Route path="/" element={user ? <Blogs /> : <Login />} />
        <Route path="/blogs/:id" element={user ? <Blog /> : <Navigate redirect to={<Login />} />} />
        <Route path="/blogs" element={user ? <Blogs /> : <Navigate redirect to={<Login />} />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </div>
  );
};

export default App;
