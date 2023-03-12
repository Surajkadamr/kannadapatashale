import Link from "next/link";
import React from "react";
import ErrorPage from "next/error";
import { gql } from "@apollo/client";
import client from "middleware/apollo-client";
function Dp({ data }) {
  return (
    <div>
      {!data.oldqp.data && <ErrorPage statusCode={404} />}
      {data.oldqp.data && (
        <>
          <h1 className="mt-20 text-center mb-3 text-xl font-bold">
            {data.oldqp.data.attributes.title}
          </h1>
          <div className="flex justify-center md:mx-52 md:mb-52 mx-32 mb-32">
            <Link
              href={`${data.oldqp.data.attributes.downloadlink}`}
              className="inline-flex items-center mx-3 px-5 md:px-16 py-3 md:py-5 text-sm font-medium text-center text-white bg-orange-400 rounded-lg hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-400 "
            >
              Download
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Dp;
export async function getServerSideProps(context) {
  const id = JSON.stringify(context.params.dp);
  const { data } = await client.query({
    query: gql`
      query{
        oldqp(id:${id}){
          data{
            id
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
