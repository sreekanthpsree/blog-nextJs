import AddBlog from "@/components/blogs/addblog";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";

function AddBlogForm(props) {
  const router = useRouter();
  const [cookies] = useCookies(["name", "id"]);
  useEffect(() => {
    if (!cookies.name) {
      router.replace("/");
    }
  }, [cookies]);

  return <AddBlog user={props.userDetails} />;
}

export default AddBlogForm;

export async function getServerSideProps(context) {
  const { params, req, res } = context;

  return {
    props: {
      blogId: params,
    },
  };
}
