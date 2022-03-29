import React  from "react";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {

  const style = {
    border: "2px solid black",
    padding: "8px 16px",
    margin: "8px 0"
  };

  const titleBarStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  };

  return <div style={style} className="blog">
    <div style={titleBarStyle}>
      <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
    </div>
  </div>;
};

export default Blog;
