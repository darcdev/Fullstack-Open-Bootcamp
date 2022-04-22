import React from 'react';
import { useSelector } from 'react-redux';
import { useMatch } from 'react-router-dom';

const User = () => {
  const users = useSelector((state) => state.users);
  const matchUser = useMatch('/users/:id');
  console.log('ss');
  const user = matchUser ? users.find((user) => user.id === matchUser.params.id) : null;
  if (!user) {
    return null;
  }
  return (
    <>
      <h2>{user.username}</h2>
      <h3>Added Blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  );
};

export default User;
