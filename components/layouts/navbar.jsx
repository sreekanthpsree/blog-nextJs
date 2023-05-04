import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import PaymentPlan from "../layouts/paymentplan";
import CreditContext from "@/store/creditContext";
function Navbar() {
  const { creditBalance, showCreditBalance } = useContext(CreditContext);

  const [cookies, setCookie, removeCookie] = useCookies(["name", "id"]);
  const [isLoggedIn, setIsLoggedIn] = useState(!cookies);
  const [showPopup, setShowPopup] = useState(false);

  const router = useRouter();
  useEffect(() => {
    if (cookies.name) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [cookies]);
  function logoutHandler() {
    removeCookie("id");
    removeCookie("name");
    setIsLoggedIn(false);
    console.log(isLoggedIn);
  }

  function paymentHandler() {
    setShowPopup(true);
  }

  function onBackdropClick() {
    setShowPopup(false);
  }
  return (
    <>
      {showPopup && <PaymentPlan onBackdropClick={onBackdropClick} />}
      <nav className="bg-white-800 shadow">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0">
                <img
                  className="block h-8 w-auto"
                  src="/images/logo.png"
                  alt="Workflow logo"
                />
              </div>
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  <Link href="/" purpose="normal" className="menu-link">
                    Home
                  </Link>
                  <Link href="#" purpose="normal" className="menu-link">
                    About
                  </Link>
                  {isLoggedIn && (
                    <button
                      className="bg-blue-500 p-1 rounded-lg"
                      onClick={paymentHandler}
                    >
                      Add credits
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-y-0-x-0">
                {isLoggedIn && (
                  <p className="text-black p-4"> Hi, {cookies.name}</p>
                )}
                {isLoggedIn ? (
                  <>
                    <p
                      className={
                        creditBalance < 5
                          ? "bg-red-600 p-4 rounded-lg"
                          : "bg-green-600 p-4 rounded-lg"
                      }
                    >
                      Credit: {creditBalance}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        logoutHandler();
                      }}
                      className="text-black hover:bg-yellow-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Log out
                    </button>
                  </>
                ) : (
                  <div className="m-3">
                    <Link
                      href="/authentication/signup"
                      className="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      SignUp
                    </Link>
                    <Link
                      href="/authentication/login"
                      className="text-black bg-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      LogIn
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
