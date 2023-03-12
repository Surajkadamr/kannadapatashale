import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { unsetToken } from "@/lib/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Account({ user }) {
  const router = useRouter();
  useEffect(() => {
    if (!user.name) {
      toast.error("Login Required!", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        router.push("/signup");
      }, 3000);
    }
  }, []);
  return (
    <div>
      <div>
        <ToastContainer />
        <h1 className=" text-center my-3 text-2xl font-bold">Account</h1>
        {!user.name && <h1 className="text-center m-5 text-2xl">Login Required</h1>}
        {user.name && (
          <div className="m-5 p-5 shadow-lg lg:w-1/3 md:w-1/2 md:m-auto">
            <div className=" md:mx-5 p-5 flex">
              <img
                src={`https://ui-avatars.com/api/?length=1&name=${user.name}`}
                alt="suraj"
              />
              <p className="my-4 ml-5 text-base md:text-xl font-semibold">
                {user.name}
              </p>
            </div>
            <hr className="text-black text-2xl m-2" />
            <Link href={"/orders"}>
              <p className="md:mx-10 mx-5 text-gray-500 text-xl my-6">
                Your orders
              </p>
            </Link>
            <hr className="text-black text-2xl" />
            <Link href={"/changepassword"}>
              <p className="md:mx-10 mx-5 text-gray-500 text-xl my-6">
                Change Password
              </p>
            </Link>
            <hr className="text-black text-2xl" />
            <button
              onClick={unsetToken}
              className=" my-6 mx-5 md:mx-10 text-gray-500 text-xl"
            >
              Log-out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Account;
