import React from "react";
import BlogPost from "./blogpost";
import classes from "./blogs.module.css";

function FeaturedBlogs(props) {
  const blogPosts = props.blogs;

  return (
    <div>
      <h2 className="font-bold text-xl">Featured blogs</h2>
      <ul className={`${classes.grid} ${classes.slide}`}>
        {blogPosts.map((blog) => {
          return <BlogPost key={blog._id} blogs={blog} />;
        })}
      </ul>
    </div>
  );
}

export default FeaturedBlogs;
