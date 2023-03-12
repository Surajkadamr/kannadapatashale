import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
function Orders({ user }) {
  const router = useRouter();
  const [data, setcheck] = useState();
  const [loading, setloading] = useState();

  useEffect(() => {
    setloading(true);
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
    } else {
      const c = async () => {
        let res2 = await fetch(
          `https://kannadapatashale-backend.onrender.com/api/book-order/check`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${user.jwt}`,
            },
            body: JSON.stringify({
              email: user.email,
            }),
          }
        );
        let d1 = await res2.json();
        if (res2.ok && d1.res === "found") {
          setcheck(d1.check1);
        } else {
          console.error(d1);
        }
      };
      c();
    }
    setloading(false);
  }, []);
  if (loading) {
    return (
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
    );
  }
  return (
    <div>
      <ToastContainer />
      <div className=" text-white text-lg md:text-2xl px-10 text-center py-16 md:py-20 bg-orange-400">
        <p className="text-white font-bold my-3">MY ORDERS</p>
      </div>
      <div>
        <p className="text-center my-5 font-bold">ORDERS</p>
        {data &&
          data.map((item) => (
            <div className="m-5 lg:flex lg:justify-center" key={item.id}>
              <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
                  <img class="rounded-t-lg" src={`${item.imagelink}`} alt="" />
                <div class="p-5">
                    <p className="mb-2 text-2xl font-extrabold text-green-600">Order Successfully Placed!</p>
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                      {item.title}
                    </h5>
                    <p class="mb-1 font-normal text-gray-700 ">
                    Order Id : {item.order_id}
                  </p>
                  <p class="mb-1 font-normal text-gray-700 ">
                  Qty : {item.qty}
                  </p>
                  <p class="mb-1 font-normal text-gray-700 ">
                  Total Amount Paid : ₹{item.amount}
                  </p>
                  <p class="mb-1 font-bold text-gray-700 ">
                  Deliver to 
                  <p className="font-semibold text-gray-400"> {item.name}</p>
                  <p className="font-semibold text-gray-400"> {item.address},{item.city}, {item.pincode}</p>
                  <p className="font-semibold text-gray-400"> Phone : {item.number}</p>
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Orders;
// export async function getServerSideProps(context) {
//     const { data } = await client.query({
//       query: gql`
//       query {
//         bookOrders(
//           filters: { status: { eq: "paid" }, email: { eq: Coo } }
//         ) {
//           data {
//             id
//             attributes {
//               qty
//               amount
//               address
//               imagelink
//               title
//             }
//           }
//         }
//       }
//       `,
//     });
//     return { props: { data } };
//   }
