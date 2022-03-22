import React, { useCallback, useEffect, useState } from 'react';

import Blog from './components/Blog';
import LoginView from './components/LoginView';
import NoteForm from './components/NoteForm';
import Notification from './components/Notification';

import blogService from './services/blogs';
import sessionData from './utils/session-data';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(sessionData.getUser() || null);
  const [message, setMessage] = useState(null);

  const setBlogsWrapper = useCallback((val) => {
    const toSort = [...val];
    toSort.sort((a, b) => b.likes - a.likes);
    setBlogs(toSort);
  }, [setBlogs]);

  const notify = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const logout = () => {
    sessionData.clearUser();
    setUser(null);
  };

  const handleLike = (blog) => {
    const newInfo = {
      ...blog,
      user: blog.user?.id,
      likes: blog.likes + 1
    };
    blogService
      .update(blog.id, newInfo)
      .then((data) => {
        setBlogsWrapper(blogs.map((b) => (b.id === blog.id) ? data : b));
      })
      .catch(err => console.log(err.message));
  };

  useEffect(() => {
    if (!user) return;
    blogService
      .getAll()
      .then(blogs => {
        setBlogsWrapper(blogs);
      })
      .catch((error) => {
        if (error.response.status === 401) logout();
      });
  }, [user, setBlogsWrapper]);

  if (!user) return <LoginView setUser={setUser} notify={notify}>
    <Notification message={message}/>
  </LoginView>;

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message}/>

      {user && <p>
        {user.name} is logged in
        <button onClick={logout}>Logout</button>
      </p>}

      <NoteForm
        blogs={blogs}
        setBlogs={setBlogs}
        notify={notify}
      />

      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          blogs={blogs}
          setBlogs={setBlogsWrapper}
          notify={notify}
          handleLike={handleLike}
        />
      )}
    </div>
  );
};

export default App;
