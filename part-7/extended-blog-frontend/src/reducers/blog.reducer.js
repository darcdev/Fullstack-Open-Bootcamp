import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import { addNotification } from './notification.reducer';

const blogsReducer = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    createBlog(state, action) {
      state.push(action.payload);
    }
  }
});

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const deleteBlog = (id) => {
  return async (dispatch, getState) => {
    try {
      await blogService.remove(id);
      const { blogs } = getState();
      const updateBlogs = blogs.filter((blog) => blog.id !== id);
      dispatch(setBlogs(updateBlogs));
    } catch (error) {
      console.log('Ha ocurrido un error al eliminar el blog', error);
    }
  };
};

export const addBlog = ({ title, author, url }) => {
  return async (dispatch) => {
    try {
      const { blog } = await blogService.create({
        title,
        author,
        url
      });
      dispatch(createBlog(blog));
      dispatch(addNotification(`A new Blog ${title} by ${author} added`, 5));
      dispatch(initializeBlogs());
    } catch (error) {
      dispatch(addNotification('Ha ocurrido un error al crear el blog', 5));
    }
  };
};

export const changeBlog = (changedBlog) => {
  return async (dispatch, getState) => {
    try {
      const { blog: updatedBlog } = await blogService.update(changedBlog);
      const { blogs } = getState();
      const updateBlogs = blogs.map((blog) => (blog.id !== updatedBlog.id ? blog : updatedBlog));
      dispatch(setBlogs(updateBlogs));
    } catch (error) {
      console.log('Ha ocurrido un error al actualizar el blog');
    }
  };
};

export const { setBlogs, createBlog } = blogsReducer.actions;
export default blogsReducer.reducer;
