import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions as blogActions } from "../reducers/blogs";

import Blog from "../components/Blog";
import BlogForm from "../components/BlogForm";

const BlogList = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs);
  const handleLike = (blog) => dispatch(blogActions.updateLikes(blog));

  useEffect(() => {
    dispatch(blogActions.fetchInitial());
  }, [dispatch]);

  return <>
    <BlogForm />
    {blogs.map(blog =>
      <Blog
        key={blog.id}
        blog={blog}
        handleLike={handleLike}
      />)}
  </>;
};

export default BlogList;
