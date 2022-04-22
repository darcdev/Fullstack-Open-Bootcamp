import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteBlog, changeBlog } from '../reducers/blog.reducer';

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [detailsVisible, setDetailsVisible] = useState(false);

  const showVisible = { display: detailsVisible ? '' : 'none' };

  const removeBlog = async () => {
    const responseDelete = window.confirm(`Remove blog ${blog.title} by ${blog.author}`);
    if (!responseDelete) return;
    dispatch(deleteBlog(blog.id));
  };

  const updateBlog = async () => {
    dispatch(
      changeBlog({
        ...blog,
        likes: blog.likes + 1
      })
    );
  };

  return (
    <div className="blog-container" style={{ border: '1px solid black', marginBottom: 5 }}>
      <h3>
        {blog.title} by {blog.author}
        <button onClick={() => setDetailsVisible(!detailsVisible)}>
          {detailsVisible ? 'Hide' : 'View'}
        </button>
      </h3>
      <div className="details-blog" style={showVisible}>
        <p>Url : {blog.url}</p>
        <p>
          Likes : {blog.likes} <button onClick={updateBlog}>Like</button>
        </p>
        <p>Author : {blog.author}</p>
        {user.username === blog.user.username && (
          <button onClick={() => removeBlog(blog)}>Remove</button>
        )}
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired
};

export default Blog;
