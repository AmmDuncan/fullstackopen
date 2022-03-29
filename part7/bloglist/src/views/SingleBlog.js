import React from "react";
import Loader from "../components/Loader";
import useSingleBlog from "../hooks/useSingleBlog";

const SingleBlog = () => {
  const {
    blog,
    loading,
    searched,
    handleLike,
    comment,
    addComment,
    handleDelete
  } = useSingleBlog();

  if (!blog && searched && !loading) return <p>Blog not found...🥲</p>;
  if (!blog) return <Loader />;

  const user = blog?.user
    ? <p className="blog__user">Added by {blog.user.name ?? blog.user.username}</p>
    : null;

  return <div className="blog">
    <h2>{blog.title}</h2>

    {user}
    <a href={blog.url}>{blog.url}</a>
    <p className="likes">
      {blog.likes} likes
      <br/>
      <button onClick={handleLike}>Like</button>
      <button onClick={handleDelete}>Delete</button>
    </p>

    <h3>Comments</h3>
    <form className="row" onSubmit={addComment}>
      <input {...comment} />
      <button type="submit" className='primary' disabled={!comment.value}>Add</button>
    </form>
    <ul className="comments">
      {blog.comments?.length
        ? blog.comments.map((c) => (<li key={c.content}>{c.content}</li>))
        : null}
    </ul>
  </div>;
};

export default SingleBlog;
