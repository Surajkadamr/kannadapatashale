import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { setToken } from "@/lib/auth";

function Signup({user}) {
  const [first, setfirst] = useState(false);
  const [name, setname] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [phone, setphone] = useState();
  const [load, setloading] = useState(false);
  const router = useRouter();  
  useEffect(() => {
    if(user.name){
      router.push("/")
    }
  }, [])
  const onchange = () => {
    if (first === true) {
      setfirst(false);
    } else {
      setfirst(true);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    const data1 = {
      email: email,
      username: name,
      PhoneNumber: phone,
      password: password,
    };
    let res = await fetch(`https://kannadapatashale-backend.onrender.com/api/auth/local/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data1),
    });
    const data = await res.json();
    setloading(false);
    if (!data.error) {
      setToken(data);
      toast.success("sign-up successfull!", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      router.push("/");
    } else {
      if ("This attribute must be unique" === data.error.message) {
        toast.error("Phone number already taken!", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
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
    }
  };
  const change = (e) => {
    if (e.target.name == "name") {
      setname(e.target.value);
    } else if (e.target.name == "email") {
      setemail(e.target.value);
    } else if (e.target.name == "password") {
      setpassword(e.target.value);
    } else if (e.target.name == "phone") {
      setphone(e.target.value);
    }
  };
  return (
    <div>
      <ToastContainer />
      <form
        onSubmit={onSubmit}
        className="block shadow-2xl text-left w-full md:w-1/2 lg:w-2/5 mx-auto rounded-xl md:my-16 mb-5 py-5 md:py-10 md:px-20 px-10"
      >
        <h1 className="text-xl md:text-3xl md:m-5 my-5 font-extrabold text-center">
          Create an account
        </h1>
        <div className="mb-3">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Your name
          </label>
          <input
            onChange={change}
            type="text"
            id="name"
            name="name"
            value={name || ""}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 "
            placeholder="Your name"
            required
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 e"
          >
            Your email
          </label>
          <input
            onChange={change}
            type="email"
            id="email"
            name="email"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 "
            placeholder="name@flowbite.com"
            value={email || ""}
            required
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="phoneno"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Phone Number
          </label>
          <input
            onChange={change}
            type="phone"
            id="phone"
            name="phone"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 "
            placeholder="9999999999"
            value={phone || ""}
            required
            min={10}
            maxLength={10}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Your password
          </label>
          <input
            onChange={change}
            name="password"
            type="password"
            id="password"
            value={password || ""}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
            placeholder="Password"
            required
            min={6}
          />
        </div>
        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              onChange={onchange}
              id="terms"
              type="checkbox"
              value=""
              className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-orange-300 "
              required
            />
          </div>
          <label
            htmlFor="terms"
            className="ml-2 text-sm font-medium text-gray-900 "
          >
            I agree with the{" "}
            <a
              href="#"
              className="text-orange-600 hover:underline "
            >
              terms and conditions
            </a>
          </label>
        </div>
        {!load ? (
          <button
            type="submit"
            className={`text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
              !first && "cursor-not-allowed"
            }`}
          >
            Create an account
          </button>
        ) : (
          <button
            type="submit"
            className="text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center
             cursor-not-allowed
            "
          >
            <div className="flex" role="status">
              <svg
                aria-hidden="true"
                className="inline w-8 h-6 mr-1 text-gray-200 animate-spin  fill-yellow-400"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
              <p>Loading....</p>
            </div>
          </button>
        )}
        <div className="flex text-xs text-gray-500 mt-6">
          Already have an account ?
          <Link
            className="no-underline border-orange text-orange-600"
            href="/login"
          >
            <p>&nbsp; Login here.</p>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
