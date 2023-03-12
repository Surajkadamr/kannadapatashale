import React, { useEffect, useState } from "react";
import { FaMinusCircle } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/Io";
import { useRouter } from "next/router";
import Head from "next/head";
import Script from "next/script";
import { gql } from "@apollo/client";
import client from "middleware/apollo-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

function Checkout({ user, data }) {
  const [name, setfname] = useState("");
  const [email, setemail] = useState("");
  const [address, setaddress] = useState("");
  const [phone, setphone] = useState("");
  const [wphone, setwphone] = useState("");
  const [city, setcity] = useState("");
  const [pincode, setpincode] = useState("");
  const [cart, setcart] = useState({
    qty: 1,
  });
  const [loading, setloading] = useState();
  const router = useRouter();
  const { bid } = router.query;
  useEffect(() => {
    if (!user.name && !Cookies.get("jwt")) {
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
    } else if (user.name) {
      setfname(user.name);
      setemail(user.email);
      setphone(user.number);
    }
  }, []);
  const onchange = (e) => {
    if (e.target.name == "name") {
      setfname(e.target.value);
    } else if (e.target.name == "address") {
      setaddress(e.target.value);
    } else if (e.target.name == "phone") {
      setphone(e.target.value);
    } else if (e.target.name == "city") {
      setcity(e.target.value);
    } else if (e.target.name == "pincode") {
      setpincode(e.target.value);
    } else if (e.target.name == "wnumber") {
      setwphone(e.target.value);
    }
  };
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
    e.preventDefault();
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }

    // Make API call to the serverless API
    if (user.name) {
      let res1 = await fetch(
        `https://kannadapatashale-backend.onrender.com/api/book-order/preorder`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.jwt}`,
          },
          body: JSON.stringify({
            name: user.name,
            number: phone,
            address: address,
            book_id: bid,
            city: city,
            pincode: pincode,
            qty: cart.qty,
            wnumber: wphone,
            token: user.jwt,
            imp: user.id,
            email: user.email,
            price: cart.qty * data.book.data.attributes.offer_price,
            imagelink:`https://kannadapatashale-backend.onrender.com/uploads/${data.book.data.attributes.image.data[0].attributes.hash}${data.book.data.attributes.image.data[0].attributes.ext}`,
            title:`${data.book.data.attributes.title}`
          }),
        }
      );
      let d = await res1.json();
      if (d.id) {
        var options = {
          key: "rzp_test_BXCpPzIO9BUlEu", // Enter the Key ID generated from the Dashboard
          name: "ಓದು ಕರ್ನಾಟಕ ಅಕಾಡೆಮಿ Pvt Ltd",
          currency: d.currency,
          amount: d.amount,
          order_id: d.order_id,
          description: "Thankyou",
          image: "https://kannadapatashale-backend.onrender.com/home1.png",
          handler: async function (response) {
            // Validate payment at server - using webhooks is a better idea.
            // const d1 = { oid: response.razorpay_order_id,pid:response.razorpay_payment_id, response,id:data.id ,sid:response.razorpay_signature };
            let res2 = await fetch(
              `https://kannadapatashale-backend.onrender.com/api/book-order/postorder`,
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
                  book_id: bid,
                  qty: cart.qty,
                  sid: response.razorpay_signature,
                }),
              }
            );
            let d1 = await res2.json();
            if (d1.success === "true") {
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
                router.push(`/account`);
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
  return (
    <>
      <>
        <Head>
          <title>ಓದು ಕರ್ನಾಟಕ ಅಕಾಡೆಮಿ</title>
          <meta name="description" content="ಓದು ಕರ್ನಾಟಕ ಅಕಾಡೆಮಿ | Books" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <ToastContainer />
        {loading === true ? (
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
            <div className="mt-5">
              <h1 className="flex items-center text-3xl justify-center font-bold text-black text-md lg:text-3xl">
                Checkout
              </h1>
            </div>
            <div className="container p-6 mx-auto w-full lg:w-1/2">
              <div className="flex flex-col w-full px-0 mx-auto md:flex-row">
                <div className="flex flex-col md:w-full">
                  <h2 className="mb-4 font-bold md:text-xl text-heading ">
                    1. Shipping Address
                  </h2>
                  <form className="justify-center w-full mx-auto">
                    <div className="">
                      <div className="space-x-0 lg:flex lg:space-x-4">
                        <div className="w-full lg:w-1/2">
                          <label
                            htmlFor="Name"
                            className="block mb-3 text-sm font-semibold text-gray-500"
                          >
                            Name
                          </label>
                          <input
                            name="name"
                            readOnly={false}
                            value={name}
                            onChange={onchange}
                            type="text"
                            placeholder="First Name"
                            className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-orange-600"
                          />
                        </div>
                        <div className="w-full lg:w-1/2">
                          <label
                            htmlFor="Whatsapp Number"
                            className="block mb-3 text-sm font-semibold text-gray-500"
                          >
                            Whatsapp Number
                          </label>
                          <input
                            maxLength={10}
                            minLength={10}
                            name="wnumber"
                            type="text"
                            value={wphone}
                            onChange={onchange}
                            placeholder="Whatsapp Number"
                            className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-orange-600"
                          />
                        </div>
                      </div>
                      <div className="mt-4 space-x-0 lg:flex lg:space-x-4">
                        <div className="w-full lg:w-1/2">
                          <label
                            htmlFor="Email"
                            className="block mb-3 text-sm font-semibold text-gray-500"
                          >
                            Email
                          </label>
                          <input
                            value={email}
                            readOnly={true}
                            name="email"
                            type="email"
                            placeholder="Email"
                            className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-orange-600"
                          />
                        </div>
                        <div className="w-full lg:w-1/2 ">
                          <label
                            htmlFor="phone"
                            className="block mb-3 text-sm font-semibold text-gray-500"
                          >
                            Phone Number
                          </label>
                          <input
                            readOnly={false}
                            maxLength={10}
                            minLength={10}
                            name="phone"
                            type="text"
                            value={phone}
                            onChange={onchange}
                            placeholder="Phone Number"
                            className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-orange-600"
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="w-full">
                          <label
                            htmlFor="Address"
                            className="block mb-3 text-sm font-semibold text-gray-500"
                          >
                            Address
                          </label>
                          <textarea
                            value={address}
                            onChange={onchange}
                            className="w-full px-4 py-3 text-xs border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-orange-600"
                            name="address"
                            cols="20"
                            rows="4"
                            placeholder="Address"
                          ></textarea>
                        </div>
                      </div>
                      <div className="space-x-0 lg:flex lg:space-x-4">
                        <div className="w-full lg:w-1/2">
                          <label
                            htmlFor="city"
                            className="block mb-3 text-sm font-semibold text-gray-500"
                          >
                            City
                          </label>
                          <input
                            name="city"
                            value={city}
                            onChange={onchange}
                            type="text"
                            placeholder="City"
                            className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-orange-600"
                          />
                        </div>
                        <div className="w-full lg:w-1/2 ">
                          <label
                            htmlFor="postcode"
                            className="block mb-3 text-sm font-semibold text-gray-500"
                          >
                            Postcode
                          </label>
                          <input
                            maxLength={6}
                            minLength={6}
                            name="pincode"
                            type="text"
                            value={pincode}
                            onChange={onchange}
                            placeholder="Post Code"
                            className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-orange-600"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col md:w-full">
                        <h2 className="my-5 font-bold md:text-xl text-heading ">
                          2. Review Cart Items & Pay
                        </h2>
                      </div>
                      <div className="mt-8">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            <li className="flex pt-2 pb-8">
                              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img
                                  src={`https://kannadapatashale-backend.onrender.com/uploads/${data.book.data.attributes.image.data[0].attributes.hash}${data.book.data.attributes.image.data[0].attributes.ext}`}
                                  className="h-full w-full object-cover "
                                />
                              </div>

                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3> {data.book.data.attributes.title}</h3>
                                    <p className="ml-4">
                                      ₹{data.book.data.attributes.offer_price}
                                      .00
                                    </p>
                                  </div>
                                  <p className="mt-1 text-sm text-gray-500">
                                    Book
                                  </p>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <div className="flex text-center">
                                    <FaMinusCircle
                                      onClick={() => {
                                        if (cart.qty > 0) {
                                          setcart({
                                            ...cart,
                                            qty: cart.qty - 1,
                                          });
                                        }
                                      }}
                                      className="text-lg mr-3 text-gray-500"
                                    />
                                    <p className="text-gray-500">{cart.qty}</p>
                                    <IoMdAddCircle
                                      onClick={() => {
                                        setcart({ ...cart, qty: cart.qty + 1 });
                                      }}
                                      className="text-xl ml-3 text-gray-500"
                                    />
                                  </div>
                                  <div className="flex">
                                    <button
                                      onClick={() => {
                                        if (cart.qty > 0) {
                                          setcart({ ...cart, qty: 0 });
                                        }
                                      }}
                                      type="button"
                                      className="font-medium text-orange-600 hover:text-orange-500"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>

                      {data.book.data.attributes.qtyleft > 0 &&
                      data.book.data.attributes.qtyleft > cart.qty ? (
                        <div className="flex justify-center my-6">
                          {cart.qty * data.book.data.attributes.offer_price !=
                          0 ? (
                            <button
                              className="w-full px-6 py-2 text-white bg-orange-600 hover:bg-orange-900"
                              onClick={makePayment}
                            >
                              Pay{" "}
                              {cart.qty * data.book.data.attributes.offer_price}
                            </button>
                          ) : (
                            <button className="w-full px-6 py-2 text-white bg-orange-400 hover:bg-gray-200 cursor-not-allowed">
                              Pay{" "}
                              {cart.qty * data.book.data.attributes.offer_price}
                            </button>
                          )}
                        </div>
                      ) : (
                        <p className="text-red-600 my-5 text-center font-extrabold text-3xl">
                          Sold Out!
                        </p>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    </>
  );
}

export default Checkout;
export async function getServerSideProps(context) {
  const id = JSON.stringify(context.params.bid);
  const { data } = await client.query({
    query: gql`
      query {
        book(id:${id}) {
          data {
            id
            attributes {
              title
              offer_price
              qtyleft
              original_price
              image {
                data {
                  attributes {
                    hash
                    ext
                  }
                }
              }
            }
          }
        }
      }
    `,
  });
  return { props: { data } };
}
