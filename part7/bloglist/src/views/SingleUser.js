import React, { useEffect } from 'react';
import {useSelector, useDispatch} from "react-redux";
import { useParams } from "react-router-dom";

import {actions as usersActions } from '../reducers/users';
import Blog from "../components/Blog";
import useSingleBlog from "../hooks/useSingleBlog";

const SingleUser = () => {
  const dispatch = useDispatch()
  const id = useParams().id;
  const handleLike = useSingleBlog()
  const users = useSelector(state => state.users);
  const user = users.find((u) => u.id === id);

  useEffect(() => {
    if (!users.length) {
      dispatch(usersActions.fetchAll())
    }
  }, [dispatch, users])

  if (!user) return null

  return <>
    <h2>{user.name || user.username}</h2>
    <ul>
      {user.blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
        />)}
    </ul>
  </>
}

export default SingleUser;
