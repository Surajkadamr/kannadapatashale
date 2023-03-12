import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorPage from "next/error";
import Cookies from "js-cookie";

function Testpage({ user }) {
  const router = useRouter();
  const { testpage } = router.query;
  const [count, setcount] = useState(0);
  const [pname, setpname] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const question = useRef();
  const [timeLeft, setTimeLeft] = useState();
  const handleAnswerOption = (answer) => {
    setSelectedOptions([(selectedOptions[count] = { answerByUser: answer })]);
    setSelectedOptions([...selectedOptions]);
  };
  const [res, setres] = useState({ answer: null, order: null });
  const [error, seterror] = useState();
  useEffect(() => {
    let errorinside;
    const fetchdetails = async () => {
      let res = await fetch(`https://kannadapatashale-backend.onrender.com/api/test/check`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + user.jwt,
        },
        body: JSON.stringify({
          tid: testpage,
          email: user.email,
        }),
      });
      const res1 = await res.json();
      setres(res1);
      let resdata = await fetch(
        `https://kannadapatashale-backend.onrender.com/api/tests/${testpage}?populate=*`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + user.jwt,
          },
        }
      );
      const data = await resdata.json();
      if (res.ok && ((res1.order === "found" && res1.answer === "not-found")||(data.data.attributes.price==0 && res1.answer === "not-found"))) {
        if (resdata.ok) {
          setpname(data.data.attributes.title);
          setTimeLeft(data.data.attributes.questions.data.length * 60);
          question.current = data.data.attributes.questions.data;
        }
      } else {
        toast.error("Method Not Allowed!", {
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
    const data = async () => {
      let resdata = await fetch(`https://kannadapatashale-backend.onrender.com/api/tests/${testpage}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + user.jwt,
        },
      });
      if (!resdata.ok) {
        seterror(true);
        errorinside = true;
      }
    };
    try {
      if (user.name !== null) {
        if (testpage) {
          errorinside = false;
          data();
          if (errorinside !== true) {
            fetchdetails();
          }
        }
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
          router.push("/login")
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  }, [testpage, res.answer]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(timeLeft - 1); // decrement time left by 1 second
    }, 1000);
    if (timeLeft === 0) {
      onsubmit();
      setTimeLeft(0);
      return;
    }

    return () => {
      clearInterval(interval); // clear the interval to stop the countdown
    };
  }, [timeLeft]);

  const onnext = () => {
    if (count < question.current.length - 1) {
      setcount(count + 1);
    }
  };
  const onback = () => {
    if (count >= 0) {
      setcount(count - 1);
    }
  };
  const onsubmit = async () => {
    let ca = 0;
    if (question) {
      for (let i = 0; i < question.current.length; i++) {
        if (!selectedOptions[i]) {
          selectedOptions[i] = { answerByUser: "notanswered" };
        }
        if (question.current[i].attributes.correctop === selectedOptions[i].answerByUser) {
          ca = ca + 1;
        }
      }
      let res = await fetch(`https://kannadapatashale-backend.onrender.com/api/answers`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.jwt}`,
        },
        body: JSON.stringify({
          data: {
            testid: testpage,
            answerarray: selectedOptions,
            score: ca,
            question: question.current,
            tname: pname,
            email: user.email,
          },
        }),
      });
      let d = await res.json();
      console.log(d);
      router.push(`/testseries/viewresults/${d.data.id}`);
    }
  };
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="select-none">
      <ToastContainer />
      {error && <ErrorPage statusCode={404} />}
      {!question.current ? (
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
        <>
          <div className="time flex m-3 px-5 py-2 text-xs bg-gray-200 rounded-lg text-center justify-between">
            <p className="m-2">{pname.slice(0, 23)}...</p>
            <p className="bg-orange-600 text-white py-2 px-5 rounded-full">
              {minutes}:{seconds}
            </p>
          </div>
          {question.current && (
            <div className="questiontab my-5 mx-5">
              <div className="flex justify-between mb-4">
                <p className="m-2">Question {count + 1}: </p>
              </div>
              <hr className=" h-0.5 bg-gray-200" />
              <div className="question my-4">
                <p className="text-base text-justify">
                  {question.current[count].attributes.qtitle}
                </p>
              </div>
              <div className="options mt-10">
                <div
                  className="flex items-center my-4"
                  onClick={(e) => handleAnswerOption("op1")}
                >
                  <input
                    type="radio"
                    className="w-6 h-6 bg-black"
                    onChange={(e) => handleAnswerOption("op1")}
                    checked={"op1" === selectedOptions[count]?.answerByUser}
                  />
                  <label
                    htmlFor="default-radio-1"
                    className="ml-2 text-base font-medium text-gray-900 "
                  >
                    {question.current[count].attributes.op1}
                  </label>
                </div>
                <div
                  className="flex items-center my-4"
                  onClick={(e) => handleAnswerOption("op2")}
                >
                  <input
                    type="radio"
                    className="w-6 h-6 bg-black"
                    onChange={(e) => handleAnswerOption("op2")}
                    checked={"op2" === selectedOptions[count]?.answerByUser}
                  />
                  <label
                    htmlFor="default-radio-1"
                    className="ml-2 text-base font-medium text-gray-900 0"
                  >
                    {question.current[count].attributes.op2}
                  </label>
                </div>
                <div
                  className="flex items-center my-4"
                  onClick={(e) => handleAnswerOption("op3")}
                >
                  <input
                    type="radio"
                    className="w-6 h-6 bg-black"
                    onChange={(e) => handleAnswerOption("op3")}
                    checked={"op3" === selectedOptions[count]?.answerByUser}
                  />
                  <label
                    htmlFor="default-radio-1"
                    className="ml-2 text-base font-medium text-gray-900 "
                  >
                    {question.current[count].attributes.op3}
                  </label>
                </div>
                <div
                  className="flex items-center my-4"
                  onClick={(e) => handleAnswerOption("op4")}
                >
                  <input
                    type="radio"
                    className="w-6 h-6 bg-black"
                    onChange={(e) => handleAnswerOption("op4")}
                    checked={"op4" === selectedOptions[count]?.answerByUser}
                  />
                  <label
                    htmlFor="default-radio-1"
                    className="ml-2 text-base font-medium text-gray-900 "
                  >
                    {question.current[count].attributes.op4}
                  </label>
                </div>
              </div>
              <div className="bottom">
                <div className="w-full ">
                  <section
                    id="bottom-navigation"
                    className="block fixed inset-x-0 bottom-0 z-10 bg-gray-100 py-2 shadow"
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
                      {!(count < question.current.length - 1) ? (
                        <button
                          type="button"
                          onClick={onsubmit}
                          className="text-white bg-green-600 hover:bg-green-400 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
                        >
                          SUBMIT
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
          )}
        </>
      )}
    </div>
  );
}

export default Testpage;
