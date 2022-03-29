import React, { useState } from "react";
import { useDispatch } from "react-redux";
import blogService from "../services/blogs";
import { actions as blogActions } from "../reducers/blogs";
import { actions as notiActions } from "../reducers/notification";

const BlogForm = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [show, setShow] = useState(false);

  const notify = (msg) => dispatch(notiActions.setNotification(msg));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;
    const blogInfo = { title, author, url };
    setLoading(true);
    blogService
      .add(blogInfo)
      ?.then((createdBlog) => {
        dispatch(blogActions.addBlog(createdBlog));
        notify({ body: `a new blog "${createdBlog.title}" added` });
        setTitle("");
        setAuthor("");
        setUrl("");
        setShow(false);
      })
      .catch((e) => console.log(e.message))
      .finally(() => setLoading(false));
  };

  if (!show) {
    return <button onClick={() => setShow(true)}>New note</button>;
  }

  return (
    <div className="blog-form">
      <h2>Add Blog</h2>
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
        <div className="row buttons">
          <input
            type="submit"
            value="Create"
            disabled={loading || (!title && !url)}
          />
          <button onClick={() => setShow(false)}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
