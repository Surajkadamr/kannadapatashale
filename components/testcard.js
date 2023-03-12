import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetcher } from "@/lib/api";
import { useRouter } from "next/router";

function Testcard({ title, category, price, nq, id, user }) {
  const [res, setres] = useState({ answer: null, order: null });
  const [loading, setloading] = useState();
  const router = useRouter();

  const type = [
    "ಭಾಷೆ ಮತ್ತು ಭಾಷಾವಿಜ್ಞಾನ",
    "ಕನ್ನಡ ಭಾಷಾ ಚರಿತ್ರೆ",
    "ತೌಲನಿಕ ದ್ರಾವಿಡ ಭಾಷಾವಿಜ್ಞಾನ",
    "ಕನ್ನಡ ವ್ಯಾಕರಣ",
    "ಕನ್ನಡ ಛಂದಸ್ಸು",
    "ಭಾರತೀಯ ಕಾವ್ಯಮೀಮಾಂಸೆ",
    "ಪಾಶ್ಚಾತ್ಯ ಕಾವ್ಯಮೀಮಾಂಸೆ",
    "ಕನ್ನಡ ಕಾವ್ಯಮೀಮಾಂಸೆ",
    "ಸಾಹಿತ್ಯ ವಿಮರ್ಶೆ",
    "ಜಾನಪದ ಅಧ್ಯಯನ",
    "ಕನ್ನಡದಲ್ಲಿ ಗ್ರಂಥ ಸಂಪಾದನೆ",
    "ಕನ್ನಡದಲ್ಲಿ  ಸಂಶೋಧನೆ",
    "ಸಾಂಸ್ಕೃತಿಕ ಅಧ್ಯಯನ",
    "ತೌಲನಿಕ‌ ಸಾಹಿತ್ಯ",
    "ಅನುವಾದ ಸಾಹಿತ್ಯ",
    "ಪ್ರಾಚೀನ ಕನ್ನಡ ಸಾಹಿತ್ಯ",
    "ಮಧ್ಯಕಾಲೀನ ಕನ್ನಡ ಸಾಹಿತ್ಯ",
    "ಕನ್ನಡ ಸಾಹಿತ್ಯ ಪ್ರಕಾರಗಳು",
    "ಹೊಸಗನ್ನಡ ಕವಿಗಳು",
    "ಹೊಸಗನ್ನಡ ಗದ್ಯ ಲೇಖಕರು",
  ];
  useEffect(() => {
    const check = async () => {
      let res = await fetcher(`https://kannadapatashale-backend.onrender.com/api/test/check`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + user.jwt,
        },
        body: JSON.stringify({
          tid: id,
          email: user.email,
        }),
      });
      setres(res);
    };
    if (user.name) {
      check();
    }
    console.log(res);
  }, [res.answer]);
  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };
  const makePayment = async (e) => {
    setloading(true);
    if (e) {
      e.preventDefault();
    }
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }

    // Make API call to the serverless API
    console.log(JSON.stringify(user.id));
    if (user.name) {
      let res1 = await fetch(`https://kannadapatashale-backend.onrender.com/api/order/preorder`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.jwt}`,
        },
        body: JSON.stringify({
          token: user.jwt,
          imp: user.id,
          email: user.email,
          price: price,
          testid: id,
        }),
      });
      let d = await res1.json();
      console.log(d);
      if (d.id) {
        var options = {
          key: "rzp_test_BXCpPzIO9BUlEu", // Enter the Key ID generated from the Dashboard
          name: "ಓದು ಕರ್ನಾಟಕ ಅಕಾಡೆಮಿ Pvt Ltd",
          currency: d.currency,
          amount: d.amount,
          order_id: d.order_id,
          description: "Thankyou",
          image: "/home1.png",
          handler: async function (response) {
            // Validate payment at server - using webhooks is a better idea.
            // const d1 = { oid: response.razorpay_order_id,pid:response.razorpay_payment_id, response,id:data.id ,sid:response.razorpay_signature };
            let res2 = await fetch(
              `https://kannadapatashale-backend.onrender.com/api/order/postorder`,
              {
                method: "POST",
                headers: {
                  "Content-type": "application/json",
                  Authorization: `Bearer ${user.jwt}`,
                },
                body: JSON.stringify({
                  oid: response.razorpay_order_id,
                  pid: response.razorpay_payment_id,
                  response: response,
                  id: d.id,
                  sid: response.razorpay_signature,
                }),
              }
            );
            let d1 = await res2.json();
            if (d1.success) {
              toast.success("Payment Successfull!", {
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
                router.push(`/testseries/test-page/${id}`);
              }, 1000);
            } else {
              toast.error("Payment un-Successfull!", {
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
                router.push("/testseries");
              }, 1000);
            }
          },
          prefill: {
            name: user.name,
            email: user.email,
            contact: user.number,
          },
        };
      } else {
        toast.error("Payment un-Successfull!", {
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
          router.push("/testseries");
        }, 1000);
      }
    }
    setloading(false);
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  const retry = async () => {
    if (res.id) {
      if (user.name) {
        if (price >0) {
          makePayment();
          setloading(true);
          let r = await fetch(
            `https://kannadapatashale-backend.onrender.com/api/answers/${res.id}`,
            {
              method: "DELETE",
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${user.jwt}`,
              },
            }
          );
          let r1 = await fetch(
            `https://kannadapatashale-backend.onrender.com/api/orders/${res.tid}`,
            {
              method: "DELETE",
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${user.jwt}`,
              },
            }
          );
          setloading(false);
          if (r1.ok && r.ok) {
            router.push(`/testseries/test-page/${id}`);
          }
        } else {
          setloading(true);
          let r2 = await fetch(
            `https://kannadapatashale-backend.onrender.com/api/answers/${res.id}`,
            {
              method: "DELETE",
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${user.jwt}`,
              },
            }
          );
          setloading(false);
          if (r2.ok) {
            router.push(`/testseries/test-page/${id}`);
          }else{
            router.push("/")
          }
        }
      }
    }
  };

  return (
    <div>
      <ToastContainer />
      {!res || loading === true ? (
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
        <div className="max-w-sm md:mx-auto m-5 bg-white border border-gray-200 rounded-lg shadow-md">
          <h5 className="mx-5 my-3 text-xs md:text-xl py-2 font-bold tracking-tight px-3 rounded-md bg-orange-100 text-gray-9004">
            {type[category.slice(1, 2) - 1]}
          </h5>
          <div className="p-5">
            <img
              className="rounded-full h-20 w-20 mx-auto mb-5"
              src="https://vajiramias.com/static/vajiramandravi/images/2131040.svg"
              alt=""
            />
            <h5 className="mb-2 text-xl text-center font-bold tracking-tight text-gray-900 ">
              {title}
            </h5>
            <>
              <hr className="bg-gray-200 w-full my-2" />
              <div className="flex my-3 justify-center md:px-14">
                <p className="font-normal text-gray-700">
                  Questions : {nq} , Time: {nq} mins
                </p>
              </div>
              <hr className="bg-gray-200 w-full my-3" />
              <div className="flex my-3 justify-center">
                <p className="font-normal text-gray-700 ">Price :</p>
                <p className=" ml-2 font-normal  text-gray-700 ">
                  {price > 0 ? "₹" + price : "Free"}
                </p>
              </div>
              <hr className="bg-gray-200 w-full my-3" />
            </>
            <div className="flex my-5 justify-around">
              {user.jwt ? (
                (res.answer === "found" && res.order === "found") ||
                (res.answer === "found" && price === 0) ? (
                  <>
                    <button
                      onClick={retry}
                      className="inline-flex mx-2 px-7 py-2 text-xs md:text-base font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300"
                    >
                      Retry
                    </button>
                    <Link
                      href={`/testseries/viewresults/${res.id}`}
                      className="inline-flex mx-2 items-center px-4 py-2 text-xs md:text-base font-medium text-center text-white bg-orange-500 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300"
                    >
                      View Results
                    </Link>
                  </>
                ) : (res.order === "found" && res.answer === "not-found") ||
                  (res.answer === "not-found" && price === 0) ? (
                  <Link
                    href={`/testseries/test-page/${id}`}
                    className="inline-flex mx-2 px-7 py-2 text-xs md:text-base font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300"
                  >
                    Start Test
                  </Link>
                ) : (
                  <button
                    onClick={makePayment}
                    className="inline-flex mx-2 items-center px-4 py-2 text-xs md:text-base font-medium text-center text-white bg-orange-500 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 "
                  >
                    Buy Now
                  </button>
                )
              ) : (
                <Link
                  href={"/signup"}
                  className="inline-flex mx-2 items-center px-4 py-2 text-xs md:text-base font-medium text-center text-white bg-orange-500 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 "
                >
                  Buy Now
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Testcard;
