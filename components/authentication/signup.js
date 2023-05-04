import Link from "next/link";
import React, { useRef } from "react";
import axios from "axios";
import Router from "next/router";

function SignupPage() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const phoneNumberRef = useRef();
  const passwordInputRef = useRef();

  function submitHandler(e) {
    e.preventDefault();
    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const phonenumber = phoneNumberRef.current.value;
    const password = passwordInputRef.current.value;

    axios
      .post("/signup", {
        username,
        phonenumber,
        password,
        email,
      })
      .then(() => {
        usernameRef.current.value = "";
        emailRef.current.value = "";
        phoneNumberRef.current.value = "";
        passwordInputRef.current.value = "";
        Router.push("/authentication/login");
      })
      .catch((error) => {
        const err = error.response.data.error;
        alert(err);
      });
  }

  return (
    <div>
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <h2 className="text-xl font-bold mb-4">Create your account</h2>
          <form className="flex flex-col space-y-4" onSubmit={submitHandler}>
            <label className="font-bold" htmlFor="username">
              Username
            </label>
            <input
              className="border border-gray-400 rounded py-2 px-3"
              type="text"
              id="username"
              name="username"
              required
              ref={usernameRef}
            />

            <label className="font-bold" htmlFor="email">
              Email
            </label>
            <input
              className="border border-gray-400 rounded py-2 px-3"
              type="email"
              id="email"
              name="email"
              required
              ref={emailRef}
            />

            <label className="font-bold" htmlFor="phone">
              Phone number
            </label>
            <input
              className="border border-gray-400 rounded py-2 px-3"
              type="tel"
              id="phone"
              name="phone"
              required
              ref={phoneNumberRef}
            />

            <label className="font-bold" htmlFor="password">
              Password
            </label>
            <input
              className="border border-gray-400 rounded py-2 px-3"
              type="password"
              id="password"
              name="password"
              required
              ref={passwordInputRef}
            />

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded"
              type="submit"
            >
              Sign Up
            </button>
          </form>
          <Link href="/authentication/login" className="m-1">
            Already registered!! Please sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
