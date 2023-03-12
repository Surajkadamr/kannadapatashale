import React from "react";
import Link from "next/link";

function Bottombar({check}) {
  return (
    <div>
      {!check && <div className="">
        <section
          id="bottom-navigation"
          className="md:hidden block fixed inset-x-0 bottom-0 z-10 bg-gray-50"
        >
          <div id="tabs" className="flex justify-between">
            <Link
              href="/"
              className="w-full focus:text-orange-600 hover:text-orange-600 justify-center inline-block text-center pt-2 pb-1"
            >
              <i className="fa-solid fa-house text-xl focus:text-orange-00 hover:text-orange-600 text-gray-600"></i>
              <span className="tab tab-kategori block text-xs">Home</span>
            </Link>
            <Link
              href="/blog"
              className="w-full focus:text-orange-400 hover:text-orange-600 justify-center inline-block text-center pt-2 pb-1"
            >
              <i className="fa-solid fa-blog text-xl focus:text-orange-400 hover:text-orange-600 text-gray-600"></i>
              <span className="tab tab-kategori block text-xs">Blogs</span>
            </Link>
            <Link
              href="/testseries"
              className="w-full focus:text-orange-400 hover:text-orange-600  justify-center inline-block text-center pt-2 pb-1"
            >
              <i className="fa-regular fa-folder-open text-xl focus:text-orange-400 hover:text-orange-600 text-gray-600"></i>
              <span className="tab tab-kategori block text-xs">
                Test-Series
              </span>
            </Link>
            <Link
              href="/books"
              className="w-full focus:text-orange-400 hover:text-orange-600 justify-center inline-block text-center pt-2 pb-1"
            >
              <i className="fa-solid fa-book text-xl focus:text-orange-400 hover:text-orange-600 text-gray-600"></i>{" "}
              <span className="tab tab-kategori block text-xs">My Books</span>
            </Link>
            <Link
              href={"/account"}
              className="w-full focus:text-orange-400 hover:text-orange-600 justify-center inline-block text-center pt-2 pb-1"
            >
              <i className="fa-solid fa-user text-xl focus:text-orange-400 hover:text-orange-600 text-gray-600"></i>
              <span className="tab tab-kategori block text-xs">Account</span>
            </Link>
          </div>
        </section>
      </div>}
    </div>
  );
}

export default Bottombar;
