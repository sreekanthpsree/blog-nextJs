import axios from "axios";
import BlogPost from "./blogpost";
import classes from "./blogs.module.css";

function BlogContainer(props) {
  const blogPosts = props.blogs;
  return (
    <ul className={classes.grid}>
      {blogPosts.map((blog) => {
        return <BlogPost key={blog._id} blogs={blog} />;
      })}
    </ul>
  );
}

export default BlogContainer;
