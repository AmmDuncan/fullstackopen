import React, { useState } from 'react';
import blogService from '../services/blogs';
import PropTypes from 'prop-types';

const NoteForm = ({ blogs, setBlogs, notify }) => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [show, setShow] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;
    const blogInfo = { title, author, url };
    setLoading(true);
    blogService
      .add(blogInfo)
      ?.then((createdBlog) => {
        setBlogs(blogs.concat(createdBlog));
        const message = { body: `a new blog "${createdBlog.title}" added` };
        notify(message);
        setTitle('');
        setAuthor('');
        setUrl('');
        setShow(false);
      })
      .catch((e) => console.log(e.message))
      .finally(() => setLoading(false));
  };

  if (!show) {
    return <button onClick={() => setShow(true)}>New note</button>;
  }

  return (
    <React.Fragment>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label htmlFor="url">Url</label>
          <input
            type="text"
            id="url"
            name="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <input
          type="submit"
          value="Create"
          disabled={loading || (!title && !url)}
        />
        <br />
        <button onClick={() => setShow(false)}>Cancel</button>
      </form>
    </React.Fragment>
  );
};

NoteForm.propTypes = {
  blogs: PropTypes.arrayOf(PropTypes.object).isRequired,
  setBlogs: PropTypes.func.isRequired,
  notify: PropTypes.func.isRequired
};

export default NoteForm;
