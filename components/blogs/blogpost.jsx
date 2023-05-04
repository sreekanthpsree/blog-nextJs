import React from "react";
import classes from "./blogpost.module.css";
import ButtonLink from "../ui/Button";
import { useCookies } from "react-cookie";
import axios from "axios";
import Link from "next/link";

function BlogPost(props) {
  const [cookies] = useCookies(["name"]);
  const blog = props.blogs;
  const path = `/addblog/${blog._id}`;
  function isLoggedInUserBlog() {
    return blog.blogAuthor === cookies.name;
  }

  const blogDeleteHandler = async () => {
    try {
      const response = await axios.delete(`/blogs/${blog._id}`);
      alert(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  const content = blog.blogContent.slice(0, 200) + "....";

  const date = new Date(blog.createdDate);

  const formattedDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;

  return (
    <li className={classes.post}>
      <div className={classes.content}>
        <h1 className={classes.title}>{blog.blogName}</h1>
        <p className={classes.time}>{formattedDate}</p>
        <p className={classes.p}>{blog.blogAuthor}</p>
        <p className={classes.p}>{content}</p>

        {isLoggedInUserBlog() && (
          <div className={classes.content}>
            <ButtonLink purpose="delete" onClick={blogDeleteHandler}>
              Delete
            </ButtonLink>
            <Link
              href={path}
              className="inline-block text-center bg-yellow-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Edit
            </Link>
          </div>
        )}
      </div>
    </li>
  );
}

export default BlogPost;
