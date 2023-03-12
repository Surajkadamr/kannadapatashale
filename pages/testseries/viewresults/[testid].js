import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

function Result({ user }) {
  const router = useRouter();
  const { testid } = router.query;
  const [resultdata, setresultdata] = useState();
  const [link, setlink] = useState("");
  const [l, setl] = useState(0);

  const [na, setna] = useState(0);

  useEffect(() => {
    const fetchdetails = async () => {
      let res = await fetch(
        `https://kannadapatashale-backend.onrender.com/api/answers/${testid}?populate=*`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.jwt}`,
          },
        }
      );
      let d = await res.json();
      if (d.data !== null && d.data.attributes.email === user.email && res.ok) {
        setresultdata(d.data.attributes);
        setlink(d.data.id);
        setl(d.data.attributes.answerarray.length);
        for (let i = 0; i < l; i++) {
          if (resultdata.answerarray[i].answerByUser === "notanswered") {
            setna(na + 1);
          }
        }
      } else if (d.data === null) {
        if (d.error) {
          toast.error(d.error.message, {
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
            router.push("/testseries/");
          }, 3000);
        }
      }
    };
    if (testid && user.name) {
      fetchdetails();
    }  else if (!user.name && !Cookies.get("jwt")) {
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
          router.push("/")
        }, 3000);
      }
  }, [na, testid]);
  const onsubmit = async () => {
    router.push(`/testseries/viewresults/viewsolution/${link}`);
  };
  return (
    <div className="w-full md:w-1/3 mx-auto">
      <ToastContainer />
      {!resultdata ? (
        <h2 className="m-auto text-center my-96 text-2xl">
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-10 h-14 mr-2 text-gray-200 animate-spin fill-yellow-400"
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
          </div>
          Loading...
        </h2>
      ) : (
        <>
          <h2 className=" text-center font-bold text-2xl m-5">Results Page</h2>
          <div className="m-5 p-5 text-xs text-white text-center font-semibold shadow-xl bg-orange-400 rounded-xl">
            <p className="mb-1">Candidate Name : {user.name}</p>
            <p className="">Exam Name: {resultdata.tname}</p>
          </div>
          <div className="mx-5 p-5 rounded-xl shadow-xl  text-center">
            <h3 className="my-5 text-xl">Your Score</h3>
            <p className="text-3xl">{resultdata.score}</p>
            <p className="text-gray-400 mb-8">out of {l}</p>
            <button
              className="px-5 bg-orange-500 text-white rounded-lg py-2 font-thin text-xs "
              onClick={onsubmit}
            >
              VIEW SOLUTION
            </button>
          </div>
          <div className="m-5 mb-20 p-5 rounded-xl shadow-xl  text-center">
            <h3 className="my-5 text-xl">Report</h3>
            <div>
              <p className="text-3xl ">{l}</p>
              <p className="text-gray-400 mb-8">Questions</p>
            </div>
            <div>
              <p className="text-3xl text-green-500">{resultdata.score}</p>
              <p className="text-gray-400 mb-8">Correct</p>
            </div>
            <div>
              <p className="text-3xl text-red-500">
                {l - resultdata.score - na || 0}
              </p>
              <p className="text-gray-400 mb-8">Incorrect</p>
            </div>
            <div>
              <p className="text-3xl">{na}</p>
              <p className="text-gray-400 mb-8">Not Answered</p>
            </div>
            <div>
              <p className="text-3xl">{resultdata.score}</p>
              <p className="text-gray-400 mb-8">Score</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Result;
