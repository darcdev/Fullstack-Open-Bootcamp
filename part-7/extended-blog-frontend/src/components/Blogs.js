import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Blog from './Blog';
import NewBlog from './NewBlog';
import Togglable from './Togglable';
import { initializeBlogs } from '../reducers/blog.reducer';

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  return (
    <>
      <Togglable buttonLabel="create note">
        <NewBlog />
      </Togglable>
      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );
};

export default Blogs;
