import React, { useState } from 'react';
import Notification from './Notification';
import { addBlog } from '../reducers/blog.reducer';
import { useDispatch } from 'react-redux';
import { addNotification } from '../reducers/notification.reducer';

const NewBlog = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (title.length === 0 || author.length === 0 || url.length === 0) {
      dispatch(addNotification('Debe rellenar todos los campos', 5));
      return;
    }
    dispatch(addNotification('', 0));
    dispatch(addBlog({ title, author, url }));
  };

  return (
    <>
      <Notification />

      <h2>Create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            name="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author: </label>
          <input
            id="author"
            type="text"
            name="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label htmlFor="url">Url: </label>
          <input
            id="url"
            type="text"
            name="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="create-blog-button" type="submit">
          Create
        </button>
      </form>
    </>
  );
};

export default NewBlog;
