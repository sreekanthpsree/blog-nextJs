import LoginPage from "@/components/authentication/login";
import SignupPage from "@/components/authentication/signup";
import React from "react";
import Router, { useRouter } from "next/router";

function Authentication() {
  const router = useRouter();
  const path = router.query.auth;

  if (path !== "login" && path !== "signup" && typeof path !== "undefined") {
    Router.push("/404");
  }
  return (
    <div>
      {path === "login" && <LoginPage />}
      {path === "signup" && <SignupPage />}
    </div>
  );
}

export default Authentication;
