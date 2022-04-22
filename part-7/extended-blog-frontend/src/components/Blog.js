import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMatch, useNavigate } from 'react-router-dom';
import { deleteBlog, changeBlog } from '../reducers/blog.reducer';

const Blog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);
  const matchBlog = useMatch('/blogs/:id');
  const blog = matchBlog ? blogs.find((user) => user.id === matchBlog.params.id) : null;

  const removeBlog = async () => {
    const responseDelete = window.confirm(`Remove blog ${blog.title} by ${blog.author}`);
    if (!responseDelete) return;
    dispatch(deleteBlog(blog.id));
    navigate('/');
  };

  const updateBlog = async () => {
    dispatch(
      changeBlog({
        ...blog,
        likes: blog.likes + 1
      })
    );
  };

  if (!user || !blog) {
    return null;
  }

  return (
    <div className="blog-container" style={{ border: '1px solid black', marginBottom: 5 }}>
      <h3>
        {blog.title} by {blog.author}
      </h3>
      <p>Url : {blog.url}</p>
      <p>
        Likes : {blog.likes} <button onClick={updateBlog}>Like</button>
      </p>
      <p>added by {blog.user.username}</p>
      {user.username === blog.user.username && (
        <button onClick={() => removeBlog(blog)}>Remove</button>
      )}
    </div>
  );
};

export default Blog;
