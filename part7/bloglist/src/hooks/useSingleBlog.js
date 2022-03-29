import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import useField from "./useField";
import blogService from "../services/blogs";
import {actions as blogActions} from '../reducers/blogs';

const useSingleBlog = () => {
  const id = useParams().id;
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const { reset: resetComment, props: comment } = useField('comment');

  useEffect(() => {
    setLoading(true);
    blogService
      .getOne(id)
      .then((res) => {
        setBlog(res);
      })
      .finally(() => {
        setLoading(false);
        setSearched(true)
      });
  }, [id, setBlog, setLoading]);

  const handleLike = () => {
    const updatedLikes = {
      ...blog,
      likes: blog.likes + 1,
    }
    const clean = {
      ...updatedLikes,
      user: blog?.user?.id,
      comments: blog?.comments?.map(c => c.id)
    }
    setBlog(updatedLikes)
    blogService.update(blog.id, clean);
  };

  const addComment = (e) => {
    e.preventDefault();
    if (!comment.value.trim()) return
    blogService.addComment(id, {content: comment.value})
      .then((newComment) => {
        setBlog({...blog, comments: blog.comments.concat(newComment)})
      })
      .finally(() => {
        resetComment()
      })
  }

  const handleDelete = () => dispatch(blogActions.handleRemove({ blog, callback: () => navigateTo('/') }))

  return {
    blog,
    loading,
    searched,
    comment,
    addComment,
    handleLike,
    handleDelete,
  }
}

export default useSingleBlog;
