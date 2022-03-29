import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import blogService from "../services/blogs";
import {actions as notiActions} from "./notification"
import sort from '../utils/sort'

const sortByLikes = (list) => {
  return sort(list, 'likes')
}

// Async Thunks
const fetchInitial = createAsyncThunk(
  'blogs/fetchInitial',
  () => blogService.getAll()
);

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    removeBlog(state, action) {
      const id = action.payload;
      return sortByLikes(state.filter((blog) => blog.id !== id))
    },
    addBlog(state, action) {
      return state.concat(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchInitial.fulfilled,
      (state, action) => {
        return sortByLikes(action.payload)
      })
  }
})


const handleRemove = ({ blog, callback }) => dispatch => {
  const yesDelete = window
    .confirm(`Are your sure you want to delete ${blog.title || blog.url}`);

  if (!yesDelete) return;
  blogService
    .remove(blog.id)
    .then((data) => {
      const msg = { body: data.message, error: true };
      dispatch(notiActions.setNotification(msg));
      dispatch(blogSlice.actions.removeBlog(blog.id));
      callback()
    })
    .catch((err) => {
      console.log(err)
      const msg = { body: err.response.data.error, error: true };
      dispatch(notiActions.setNotification(msg));
    });
};

const addEntry = blogInfo => (dispatch) => {
  return blogService
    .add(blogInfo)
    ?.then((createdBlog) => {
      dispatch(blogSlice.actions.addBlog(createdBlog))
      const message = { body: `a new blog "${createdBlog.title}" added` };
      dispatch(notiActions.setNotification(message));
  })
}

const actionCreators = {
  fetchInitial,
  handleRemove,
  addEntry,
}
export const actions = { ...blogSlice.actions, ...actionCreators }
export default blogSlice.reducer
