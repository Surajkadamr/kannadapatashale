import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

function Changepassword({ user }) {
  const router = useRouter();
  const [cp, setcp] = useState("");
  const [np, setnp] = useState("");
  const [conp, setconp] = useState("");
  useEffect(() => {
    if (!Cookies.get("jwt") && !user.name) {
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
          router.push("/login");
        }, 1000);
      } 
  }, [])
  
  const change = (e) => {
    if (e.target.name == "cp") {
      setcp(e.target.value);
    } else if (e.target.name == "np") {
      setnp(e.target.value);
    } else if (e.target.name == "conp") {
      setconp(e.target.value);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const data1 = {
      currentPassword: cp,
      password: np,
      passwordConfirmation: conp,
    };
    let res = await fetch(
      `http://192.168.1.38:1337/api/auth/change-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.jwt}`,
        },
        body: JSON.stringify(data1),
      }
    );
    const data = await res.json();

    if (!data.error) {
      toast.success("Password Change Successfull!", {
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
        router.push("/");
      }, 3000);
    } else {
      toast.error(data.error.message, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  return (
    <div>
      <ToastContainer />
      <h1 className="text-center text-orange-400 mt-5 text-2xl font-bold">
        Change Password
      </h1>
      <form
        onSubmit={onSubmit}
        className="block shadow-2xl text-left w-full md:w-1/2 lg:w-1/3  mx-auto rounded-xl mt-5 mb-10  md:my-16 py-10 md:px-20 px-10"
      >
        <div className="mb-3">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Current Password
          </label>
          <input
            type="text"
            name="cp"
            minLength={6}
            value={cp}
            onChange={change}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 "
            placeholder="Current Password"
            required
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            New Password
          </label>
          <input
            type="text"
            name="np"
            value={np}
            minLength={6}
            onChange={change}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
            placeholder="New Password"
            required
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Confirm Password
          </label>
          <input
            type="text"
            name="conp"
            value={conp}
            minLength={6}
            onChange={change}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
            placeholder="New Password"
            required
          />
        </div>
        <button
          type="submit"
          className="text-white mt-2 bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Changepassword;
