import React from 'react';
import { useSelector } from 'react-redux';
import NewBlog from './NewBlog';
import Togglable from './Togglable';
import { Link } from 'react-router-dom';

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);

  return (
    <>
      <Togglable buttonLabel="create note">
        <NewBlog />
      </Togglable>
      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <Link
          key={blog.id}
          to={`/blogs/${blog.id}`}
          style={{ border: '1px solid black', display: 'block', marginBottom: '0.5rem' }}
        >
          {blog.title}
        </Link>
      ))}
    </>
  );
};

export default Blogs;
