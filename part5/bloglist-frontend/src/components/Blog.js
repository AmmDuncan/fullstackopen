import React, { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, blogs, setBlogs, notify, handleLike }) => {
  const [showAll, setShowAll] = useState(false);

  const handleRemove = () => {
    const yesDelete = window
      .confirm(`Are your sure you want to delete ${blog.title || blog.url}`);

    if (!yesDelete) return;
    blogService
      .remove(blog.id)
      .then((data) => {
        const msg = { body: data.message };
        notify(msg);
        setBlogs(blogs.filter((b) => b.id !== blog.id));
      })
      .catch((err) => {
        const msg = { body: err.response.data.error, error: true };
        notify(msg);
      });
  };
  const rmBtnStyle = {
    background: '#d35',
    color: 'white',
    border: '1px solid #833',
    borderRadius: '4px'
  };

  const details = (
    <React.Fragment>
      <div>{blog.url}</div>
      <div>
        {blog.likes}
        <button onClick={() => handleLike(blog)} id='like'>Like</button>
      </div>
      <div>{blog.user?.name}</div>
      <button onClick={handleRemove} style={rmBtnStyle}>Remove</button>
    </React.Fragment>
  );

  const style = {
    border: '2px solid black',
    padding: '8px 16px',
    margin: '8px 0'
  };
  const titleBarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  return <div style={style} className='blog'>
    <div style={titleBarStyle}>
      {blog.title} {blog.author}
      <button onClick={() => setShowAll(!showAll)} id="view">
        {showAll ? 'hide' : 'view'}
      </button>
    </div>

    {showAll ? details : ''}
  </div>;
};

export default Blog;
