import React from "react";
import { gql } from "@apollo/client";
import client from "middleware/apollo-client";
import ErrorPage from "next/error";

function Sblog({ title, desc }) {
  return (
    <div>
      {!title && <ErrorPage statusCode={404} />}
      {title && <div className="my-5 mx-10 ">
        <h2 className="m-5 text-2xl text-center font-bold">{title}</h2>
        <p className="text-justify">{desc}</p>
      </div>}
    </div>
  );
}

export default Sblog;
export async function getServerSideProps(context) {
  const { data } = await client.query({
    query: gql`
    query {
      blog(id: ${context.params.id}) {
        data {
          attributes {
            title
            desc
          }
        }
      }
    }
    `,
  });
  if (data.blog.data !== null) {
    return {
      props: {
        title: data.blog.data.attributes.title,
        desc: data.blog.data.attributes.desc,
      },
    };
  } else {
    return {
      props: {
        title: null,
        desc: null,
      },
    };
  }
}
