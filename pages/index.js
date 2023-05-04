import Header from "@/components/layouts/Header/header";
import BlogContainer from "@/components/blogs/blogs";
import axios from "axios";
import { useEffect, useState } from "react";
import FeaturedBlogs from "@/components/blogs/featuredblogs";
import { CreditContextProvider } from "@/store/creditContext";
import { sort } from "@/helper/sorting";

export default function Home(props) {
  const [blogs, setBlogs] = useState([]);
  const [featuredBlogs, setFeaturedBlogs] = useState([]);

  useEffect(() => {
    axios.get("/blogs/").then((res) => {
      const blog = res.data.filter((blog) => {
        return !blog.isFeatured;
      });
      const featuredBlog = res.data.filter((blog) => {
        return blog.isFeatured;
      });
      sort(blog);
      sort(featuredBlog);
      setBlogs(blog);
      setFeaturedBlogs(featuredBlog);
    });
  }, []);

  return (
    <div>
      <Header />
      <div className="pb-4">
        <FeaturedBlogs blogs={featuredBlogs} />
      </div>
      <div className="border-t-2 border-gray-400">
        <BlogContainer blogs={blogs} />
      </div>
    </div>
  );
}
