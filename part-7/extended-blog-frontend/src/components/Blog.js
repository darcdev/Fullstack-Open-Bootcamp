import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMatch, useNavigate } from 'react-router-dom';
import useField from '../hooks/useField';
import { deleteBlog, changeBlog, addComment } from '../reducers/blog.reducer';

const Blog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);
  const matchBlog = useMatch('/blogs/:id');
  const blog = matchBlog ? blogs.find((user) => user.id === matchBlog.params.id) : null;

  const comment = useField('text');

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

  const handleSubmitComment = async (event) => {
    event.preventDefault();
    if (!comment.value) {
      return;
    }
    dispatch(addComment({ blogId: blog.id, comment: comment.value }));
  };

  if (!user || !blog) {
    return null;
  }

  return (
    <div className="blog-container">
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
      <h4>Comments</h4>

      <form onSubmit={handleSubmitComment}>
        <input {...comment} />
        <button>Add coment</button>
      </form>

      <ul>
        {blog.comments &&
          blog.comments.map((comment, index) => <li key={blog.id + index}>{comment}</li>)}
      </ul>
      {blog.comments && !blog.comments.length > 0 && <p>No hay comentarios para este blog</p>}
    </div>
  );
};

export default Blog;
