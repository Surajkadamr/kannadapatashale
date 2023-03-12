import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorPage from "next/error";
import { gql } from "@apollo/client";
import client from "middleware/apollo-client";

const Sbook = ({ data, user }) => {
  const router = useRouter();
  const { sbooks } = router.query;
  const [review, setreview] = useState("");
  const [c, setc] = useState(1);
  const change = (e) => {
    setreview(e.target.value);
  };
  const post = async () => {
    if (user.name) {
      let res = await fetch(`https://kannadapatashale-backend.onrender.com/api/book-reviews`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + user.jwt,
        },
        body: JSON.stringify({
          data: {
            book_id: sbooks,
            review: review,
            name: user.name,
            email: user.email,
          },
        }),
      });
      setc(Math.random());
      if (res.ok) {
        router.push("/books/" + sbooks);
      } else {
        router.push("/");
      }
    } else {
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
      }, 2000);
    }
  };
  return (
    <div>
      <ToastContainer />
      {!data.book.data && <ErrorPage statusCode={404} />}
      {data.book.data && (
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container px-5 py-10 mx-auto">
            <div className="lg:w-4/5 mx-auto justify-center flex flex-wrap">
              <img
                alt="ecommerce"
                className=" w-auto lg:h-[90vh] h-64  object-cover rounded"
                src={`https://kannadapatashale-backend.onrender.com/uploads/${data.book.data.attributes.image.data[0].attributes.hash}${data.book.data.attributes.image.data[0].attributes.ext}`}
              />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  ಓದು ಕರ್ನಾಟಕ ಅಕಾಡೆಮಿ
                </h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {data.book.data.attributes.title}
                </h1>
                <div className="flex mb-4">
                  <span className="flex items-center">
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 text-orange-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 text-orange-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 text-orange-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 text-orange-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 text-orange-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <span className="text-gray-600 ml-3">4 Reviews</span>
                  </span>
                  <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                    <a className="text-gray-500">
                      <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                      </svg>
                    </a>
                    <a className="text-gray-500">
                      <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                      </svg>
                    </a>
                    <a className="text-gray-500">
                      <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                      </svg>
                    </a>
                  </span>
                </div>
                {data.book.data.attributes.qtyleft > 0 ? (
                  <div className="flex mb-5 md:justify-start justify-between">
                    <span className=" block title-font font-medium text-2xl pr-2 text-gray-900">
                      ₹{data.book.data.attributes.offer_price}.00
                    </span>
                    <p className="mt-1 text-black font-bold text-lg font-sans pr-2 line-through">
                      ₹{data.book.data.attributes.original_price}.00
                    </p>
                    <p className="text-red-500 mt-2 text-sm">
                      -
                      {Math.floor(
                        ((data.book.data.attributes.original_price -
                          data.book.data.attributes.offer_price) /
                          data.book.data.attributes.original_price) *
                          100
                      )}
                      % off
                    </p>
                    {user.name ? (
                      <Link href={`/books/checkout/${data.book.data.id}`}>
                        <button className="flex ml-3 md:text-base text-sm text-white bg-orange-500 border-0 py-2 px-6 focus:outline-none hover:bg-orange-600 rounded">
                          Buy Now
                        </button>
                      </Link>
                    ) : (
                      <Link href={`/login`}>
                        <button className="flex ml-3 md:text-base text-sm text-white bg-orange-500 border-0 py-2 px-6 focus:outline-none hover:bg-orange-600 rounded">
                          Buy Now
                        </button>
                      </Link>
                    )}
                  </div>
                ) : (
                  <p className="text-red-600 my-5 font-extrabold text-3xl">
                    Sold Out!
                  </p>
                )}
                <hr className="mb-5" />
                <p className="leading-relaxed text-justify">
                  {data.book.data.attributes.description}
                </p>
                <div>
                  <h1 className="my-5 font-bold text-2xl">Reviews</h1>
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Your Review
                  </label>
                  <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50">
                    <div className="px-4 py-2 bg-white rounded-t-lg ">
                      <textarea
                        id="comment"
                        rows="4"
                        value={review}
                        onChange={change}
                        name={review}
                        className="w-full px-0 text-sm text-gray-900 bg-white border-0  focus:ring-0"
                        placeholder="Write a comment..."
                        required
                      ></textarea>
                    </div>
                    <div className="flex items-center justify-between px-3 py-2 border-t ">
                      <button
                        type="submit"
                        onClick={post}
                        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-orange-400 rounded-lg focus:ring-4 focus:ring-orange-200  hover:bg-orange-800"
                      >
                        Post comment
                      </button>
                    </div>
                  </div>
                  <hr className="text-gray-900 w-full h-2 my-4" />
                  {data.bookReviews.data[0] ? (
                    data.bookReviews.data.map((item) => (
                      <div
                        key={item.id+c}
                        className="bg-orange-50 rounded-3xl p-5 my-5"
                      >
                        <h1 className="pt-2 text-lg font-semibold ">
                          {item.attributes.name}
                        </h1>
                        <p className="pb-5 text-xs font-normal">
                          Submitted on {item.attributes.createdAt.slice(8, 10)}-
                          {item.attributes.createdAt.slice(5, 7)}-
                          {item.attributes.createdAt.slice(0, 4)}
                        </p>
                        <p>{item.attributes.review}</p>
                      </div>
                    ))
                  ) : (
                    <div className="bg-orange-50 rounded-3xl p-5 my-5">
                      <h1 className="font-bold">No Review Available</h1>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
export default Sbook;
export async function getServerSideProps(context) {
  const id = JSON.stringify(context.params.sbooks);
  const { data } = await client.query({
    query: gql`
      query {
        book(id:${id}) {
          data {
            id
            attributes {
              title
              description
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
        bookReviews(filters:{book_id:{eq:${context.params.sbooks}}}){
          data{
           id
           attributes{
             name
             review
             book_id
             createdAt
           }
         }
       }
      }
    `,
  });
  return { props: { data } };
}
