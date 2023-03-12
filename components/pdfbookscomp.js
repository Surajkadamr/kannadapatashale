import React from "react";
import Link from "next/link";

function Pdfbookscomp({ title, link }) {
  return (
    <div className="md:mx-auto">
      <div className="max-w-full md:w-1/2 mx-4 my-3 md:mx-auto p-4 md:p-6 bg-white border border-gray-200 rounded-lg shadow-md ">
        <h5 className="mb-5 text-sm md:text-xl py-4 font-bold tracking-tight px-3 rounded-md bg-orange-100 text-gray-900 ">
          ಪಿಡಿಎಫ್ ಪುಸ್ತಕಗಳು
        </h5>
        <div className="flex justify-between">
          <h5 className="mb-2 text-base md:text-lg font-bold tracking-tight px-3 rounded-md text-gray-900 ">
            {title}
          </h5>
          <Link
            href={`/pdfbooks/${link}`}
            className="inline-flex  items-center mx-3 px-3 py-2 text-sm font-medium text-center text-white bg-orange-700 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 "
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Pdfbookscomp;
