import React from "react";
import Link from "next/link";
import Script from "next/script";

function Navbar({ user, check }) {
  return (
    <>
      <nav className="bg-white shadow-lg border-gray-200 ">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-2.5">
          {!check ? (
            <a href="/" className="flex items-center ">
              <img src="/home1.png" className="h-8 mr-3 sm:h-12 " alt="Logo" />
            </a>
          ) : (
            <button className="flex items-center ">
              <img src="/home1.png" className="h-8 mr-3 sm:h-12 " alt="Logo" />
            </button>
          )}
          {!user.jwt && (
            <div className="flex items-center">
              <Link
                href="/signup"
                className="text-xs hover:bg-orange-600 font-medium  bg-orange-500 text-white rounded-md px-2 py-2 md:text-sm md:px-4 md:py-2 text-center mx-2  hover:underline"
              >
                Sign-up
              </Link>
              <Link
                href="/login"
                className="text-xs font-medium hover:bg-orange-600 hover:text-white rounded-md px-2 py-2 md:text-sm md:px-4 md:py-2  text-center ml-2 border-gray-300 border-2 text-orange-600  hover:underline"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </nav>
      {check === false && (
        <nav className="bg-gray-50  hidden md:block">
          <div className="max-w-screen-xl px-4 py-3 mx-auto md:px-6">
            <div className="flex items-center">
              <ul className="flex flex-row mt-0 mr-6 space-x-8 text-sm font-medium">
                <li>
                  <Link
                    href="/"
                    className="text-gray-600  hover:underline"
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-gray-600  hover:underline"
                  >
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/testseries"
                    className="text-gray-600  hover:underline"
                  >
                    Test-Series
                  </Link>
                </li>
                <li>
                  <Link
                    href="/books"
                    className="text-gray-600  hover:underline"
                  >
                    My Books
                  </Link>
                </li>
                <li>
                  <Link
                    href="account"
                    className="text-gray-600  hover:underline"
                  >
                    Account
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}

export default Navbar;
