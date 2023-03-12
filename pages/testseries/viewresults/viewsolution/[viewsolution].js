import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

function Viewsolution({ user }) {
  const router = useRouter();
  const { viewsolution } = router.query;
  const [count, setcount] = useState(0);
  const [pname, setpname] = useState("");
  const [selectedOptions, setSelectedOptions] = useState();
  const [question, setquestion] = useState();

  useEffect(() => {
    const fetchdetails = async () => {
      let res = await fetch(
        `https://kannadapatashale-backend.onrender.com/api/answers/${viewsolution}?populate=*`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.jwt}`,
          },
        }
      );
      let d1 = await res.json();
      if (d1.data !== null) {
        setpname(d1.data.attributes.tname);
        setSelectedOptions(d1.data.attributes.answerarray);
        setquestion(d1.data.attributes.question);
      } else if (d1.error) {
        toast.error(d1.error.message, {
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
    };
    if (viewsolution && user.name) {
      fetchdetails();
    } else if (!user.name && !Cookies.get("jwt")) {
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
        router.push("/");
      }, 3000);
    }
  }, [viewsolution]);
  const onnext = () => {
    if (count < question.length - 1) {
      setcount(count + 1);
    }
  };
  const onback = () => {
    if (count >= 0) {
      setcount(count - 1);
    }
  };
  return (
    <div>
      <ToastContainer />
      {!question && !selectedOptions ? (
        <h2 className="m-auto text-center my-96 text-2xl">
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-10 h-14 mr-2 text-gray-200 animate-spin  fill-yellow-400"
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
        <div className="select-none">
          <div className="time flex m-3 px-5 py-2 text-xs bg-gray-200 rounded-lg text-center justify-between">
            <p className="m-2">{pname.slice(0, 23)}...</p>
          </div>
          {selectedOptions[count].answerByUser === "notanswered" && (
            <p className="m-3 px-5 py-3 text-xs bg-red-300 rounded-lg">
              Not Answered
            </p>
          )}
          <div className="questiontab my-5 mx-5">
            <div className="flex justify-between mb-4">
              <p className="m-2">Question {count + 1}: </p>
            </div>
            <hr className=" h-0.5 bg-gray-200" />
            <div className="question my-4">
              <p className="text-base text-justify">
                {question[count].attributes.qtitle}
              </p>
            </div>
            <div className="options mt-10">
              <div
                className={`${
                  "op1" === question[count].attributes.correctop &&
                  "bg-green-400 "
                } ${
                  "op1" !== question[count].attributes.correctop &&
                  selectedOptions[count].answerByUser === "op1" &&
                  "bg-red-400"
                } flex items-center my-4  px-2 rounded-xl`}
              >
                <input
                  type="radio"
                  className="w-6 h-6 bg-black"
                  checked={"op1" === selectedOptions[count]?.answerByUser}
                  readOnly
                />
                <label
                  htmlFor="default-radio-1"
                  className="ml-2 text-base p-2 font-medium text-gray-900 "
                >
                  {question[count].attributes.op1}
                </label>
              </div>
              <div
                className={`${
                  "op2" === question[count].attributes.correctop &&
                  "bg-green-500 "
                } ${
                  "op2" !== question[count].attributes.correctop &&
                  selectedOptions[count].answerByUser === "op2" &&
                  "bg-red-400"
                } flex items-center my-4  px-2 rounded-xl`}
              >
                <input
                  type="radio"
                  className="w-6 h-6 bg-black"
                  checked={"op2" === selectedOptions[count]?.answerByUser}
                  readOnly
                />
                <label
                  htmlFor="default-radio-1"
                  className="ml-2 text-base p-2 font-medium text-gray-900 "
                >
                  {question[count].attributes.op2}
                </label>
              </div>
              <div
                className={`${
                  "op3" === question[count].attributes.correctop &&
                  "bg-green-400 "
                } ${
                  "op3" !== question[count].attributes.correctop &&
                  selectedOptions[count].answerByUser === "op3" &&
                  "bg-red-400"
                }  flex items-center my-4  px-2 rounded-xl`}
              >
                <input
                  type="radio"
                  className="w-6 h-6 bg-black"
                  checked={"op3" === selectedOptions[count]?.answerByUser}
                  readOnly
                />
                <label
                  htmlFor="default-radio-1"
                  className="ml-2 text-base p-2 font-medium text-gray-900 "
                >
                  {question[count].attributes.op3}
                </label>
              </div>
              <div
                className={`${
                  "op4" === question[count].attributes.correctop &&
                  "bg-green-400 "
                } ${
                  "op4" !== question[count].attributes.correctop &&
                  selectedOptions[count].answerByUser === "op4" &&
                  "bg-red-400"
                }  flex items-center my-4 px-2 rounded-xl`}
              >
                <input
                  type="radio"
                  className="w-6 h-6 bg-black"
                  checked={"op4" === selectedOptions[count]?.answerByUser}
                  readOnly
                />
                <label
                  htmlFor="default-radio-1"
                  className="ml-2 text-base p-2 font-medium text-gray-900 "
                >
                  {question[count].attributes.op4}
                </label>
              </div>
            </div>
            <div className="bottom">
              <div className="">
                <section
                  id="bottom-navigation"
                  className="block fixed inset-x-0 md:bottom-0 bottom-10 z-10 bg-gray-100 py-2 shadow"
                >
                  <div id="tabs" className="flex justify-between px-5">
                    {count === 0 ? (
                      <button
                        onClick={onback}
                        type="button"
                        className="text-white bg-orange-200 hover:bg-orange-300 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
                        disabled
                      >
                        &#60;&#60; BACK
                      </button>
                    ) : (
                      <button
                        onClick={onback}
                        type="button"
                        className="text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
                      >
                        &#60;&#60; BACK
                      </button>
                    )}
                    {!(count < question.length - 1) ? (
                      <button
                        onClick={() => {
                          router.push(
                            `/testseries/viewresults/${viewsolution}`
                          );
                        }}
                        type="button"
                        className="text-white bg-green-400 hover:bg-green-500 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
                      >
                        View Results
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={onnext}
                        className="text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
                      >
                        NEXT &#62;&#62;
                      </button>
                    )}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Viewsolution;
