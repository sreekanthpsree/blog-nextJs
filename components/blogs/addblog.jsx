import CreditContext from "@/store/creditContext";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";

function AddBlog(props) {
  const [cookies] = useCookies(["name", "id"]);
  const { showCreditBalance } = useContext(CreditContext);
  const router = useRouter();
  const [error, setError] = useState(null);
  const [featured, setFeatured] = useState();
  const [button, setButton] = useState("Create post");
  const [formData, setFormData] = useState({
    blogName: "",
    blogContent: "",
    blogAuthor: cookies.name,
    userID: cookies.id,
  });
  const blogId = router.query.blog;
  useEffect(() => {
    if (blogId !== "0") {
      setButton("Edit");
      async function fetchBlog() {
        try {
          const res = await axios.get(`/blog/${blogId}`);

          setFormData((prevState) => {
            return {
              ...prevState,
              blogName: res.data.blogName,
              blogContent: res.data.blogContent,
              blogAuthor: cookies.name,
              userID: cookies.id,
              isFeatured: res.data.isFeatured,
            };
          });
          if (res.data.isFeatured) {
            setFeatured(true);
          } else {
            setFeatured(false);
          }
        } catch (error) {
          router.replace("/");
        }
      }
      fetchBlog();
    }
  }, []);
  function handleInputChange(event) {
    const { name, value, type } = event.target;

    if (type === "radio") {
      setFormData((prevState) => {
        return {
          ...prevState,
          isFeatured: value === "yes" ? true : false,
        };
      });
    } else {
      setFormData((prevState) => {
        return { ...prevState, [name]: value };
      });
    }
  }
  async function submitHandler(e) {
    e.preventDefault();
    try {
      if (blogId === "0") {
        const res = await axios.post("/addblog", {
          formData,
        });
        if (res.data.user) {
          showCreditBalance(res.data.user.credit);
        }
        router.replace("/");
      } else {
        const res = await axios.put(`/updateblog/${blogId}`, {
          formData,
          featured: { featured },
        });

        showCreditBalance(res.data.user.credit);
        router.replace("/");
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 422) {
        setError(error.response.data.message);
      }
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-md p-6">
      {error && <p className="text-red-500">{error}</p>}
      <h2 className="text-xl font-semibold mb-4">Create a new blog post</h2>
      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-400"
            id="title"
            type="text"
            placeholder="Enter title"
            name="blogName"
            value={formData.blogName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <p htmlFor="featured">Featured</p>
          <label
            className="inline p-3 text-gray-700 font-medium mb-2"
            htmlFor="content"
          >
            Yes
          </label>
          <input
            type="radio"
            name="isFeatured"
            value="yes"
            checked={formData.isFeatured}
            onChange={handleInputChange}
          />
          <label
            className="inline p-3 text-gray-700 font-medium mb-2"
            htmlFor="content"
          >
            No
          </label>
          <input
            type="radio"
            name="isFeatured"
            value="no"
            checked={!formData.isFeatured}
            onChange={handleInputChange}
          />
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="content"
          >
            Content
          </label>

          <textarea
            className="border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-400"
            id="content"
            rows="5"
            placeholder="Enter content"
            name="blogContent"
            value={formData.blogContent}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="author"
          >
            Author
          </label>
          <input
            className="border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-400"
            id="author"
            type="text"
            placeholder="Enter author"
            readOnly
            name="blogAuthor"
            value={formData.blogAuthor}
            onChange={handleInputChange}
            required
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
          type="submit"
        >
          {button}
        </button>
      </form>
    </div>
  );
}

export default AddBlog;
