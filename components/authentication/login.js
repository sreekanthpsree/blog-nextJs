import React, { useContext, useRef } from "react";
import { useCookies } from "react-cookie";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import CreditContext from "@/store/creditContext";

function LoginPage() {
  // const creditCtx = useContext(CreditContext);
  const { creditBalance, showCreditBalance } = useContext(CreditContext);

  const router = useRouter();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);

  async function submitHandler(e) {
    e.preventDefault();
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    const response = await axios
      .post("/login", {
        email,
        password,
      })
      .catch((error) => {
        alert(`Invalid login credentials`);
      });

    if (response) {
      const userData = response.data;
      setCookie("name", userData.username);
      setCookie("id", userData.id);
      showCreditBalance(userData.credit);
      console.log(userData.credit);
      router.replace("/");
    }
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Log in to your account</h2>
        <form className="flex flex-col space-y-4" onSubmit={submitHandler}>
          <label className="font-bold" htmlFor="email">
            Email
          </label>
          <input
            className="border border-gray-400 rounded py-2 px-3"
            type="email"
            id="email"
            name="email"
            required
            ref={emailInputRef}
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
            Log In
          </button>
        </form>
        <Link href="/authentication/signup">New user..? Signup</Link>
      </div>
    </div>
  );
}

export default LoginPage;
