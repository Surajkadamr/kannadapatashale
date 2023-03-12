import Link from "next/link";
import React, { useState } from "react";

function Bookcomponent({ title, image, id, price, oprice ,qtyleft}) {
  //   const [first, setfirst] = useState(false);
  return (
    <div className="md:flex md:justify-center mb-5">
      <div className="lg:w-1/4 md:w-1/2 p-4 w-full  bg-orange-50 rounded-3xl">
        <Link
          href={`/books/${id}`}
          className="block relative h-[65vh] md:justify-center p-1 rounded mx-auto overflow-hidden"
        >
          <img
            alt="ecommerce"
            className="object-cover w-full h-full rounded-lg block"
            src={image}
          />
        </Link>
        <Link href={`/books/${id}`}>
          <div className="p-5 text-2xl rounded-lg">
            <h3 className="text-black-500 font-bold text-xs tracking-widest title-font mb-1">
              ಓದು ಕರ್ನಾಟಕ ಅಕಾಡೆಮಿ
            </h3>
            <h2 className="text-black title-font text-base font-medium">
              {title}
            </h2>
            {qtyleft > 0 ?
              <div className="flex">
                <p className="mt-1 text-black font-extrabold font-sans pr-2">
                  ₹{price}
                </p>
                <p className="mt-2 text-black font-bold text-lg font-sans pr-2 line-through">
                  ₹{oprice}
                </p>
                <p className="text-red-500 mt-3 text-sm">
                  -{Math.floor(((oprice - price) / oprice) * 100)}% off
                </p>
              </div> : <p className="text-red-600 mt-1 font-extrabold text-3xl">Sold Out!</p>
            }
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Bookcomponent;
