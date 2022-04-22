import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import User from './User';
import { initializeUsers } from '../reducers/users.reducer';

const Users = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUsers());
  }, []);

  return (
    <>
      <h2>Blogs</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <User key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Users;
