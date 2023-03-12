import Link from "next/link";
import React from "react";
import ErrorPage from "next/error";
import { gql } from "@apollo/client";
import client from "middleware/apollo-client";
function Pdfid({ data }) {
  return (
    <div>
      {!data.pdfbook.data && <ErrorPage statusCode={404} />}
      {data.pdfbook.data && (
        <>
          <div className="m-5 shadow-2xl rounded-2xl md:w-1/2 md:mx-auto">
            <div className="flex justify-center">
              <img className="w-14 m-5" src="/download-pdf.png" alt="" />
              <p className=" text-center mx-0 text-lg font-semibold  my-auto">
                ಪಿಡಿಎಫ್ ಪುಸ್ತಕಗಳು
              </p>
            </div>
            <h1 className="my-20 text-center mb-3 text-xl font-bold">
              {data.pdfbook.data.attributes.title}
            </h1>
            <div className="flex justify-center  md:mx-52 md:mb-52 mx-32 pb-32">
              <Link
                href={`${data.pdfbook.data.attributes.downloadlink}`}
                className="inline-flex items-center mx-3 px-5 md:px-16 py-3 md:py-5 text-sm font-medium text-center text-white bg-orange-400 rounded-lg hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-400 "
              >
                Download
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Pdfid;
export async function getServerSideProps(context) {
  const id = JSON.stringify(context.params.pdfid);
  const { data } = await client.query({
    query: gql`
      query{
        pdfbook(id:${id}){
          data{
            attributes{
              title
              downloadlink
            }
          }
        }
      }
      `,
  });
  return { props: { data } };
}
