import React from "react";
import Blogcard from "@/components/Blogcard";
import { gql } from "@apollo/client";
import client from "middleware/apollo-client";
function Blogs({ a }) {
  return (
    <div>
      <div className=" text-white text-lg md:text-2xl px-10 text-center py-16 md:py-20 bg-orange-400">
        <p className="text-white font-bold my-3">BLOGS</p>
      </div>
      <div>
        <p className="text-center my-5 font-bold">LATEST BLOGS</p>
        <div className="lg:grid lg:grid-cols-3 p-5 text-justify">
          {a.blogs.data &&
            a.blogs.data.map((item) => (
              <Blogcard
                key={item.id}
                title={item.attributes.title.slice(0,28)}
                link={item.id}
                desc={item.attributes.desc.slice(0, 150)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Blogs;
export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
    query {
      blogs(sort:"id:desc"){
        data {
          id
          attributes {
            title
            desc
          }
        }
      }
    }
    `,
  });
  const a=data;
  return { props: { a } };
}
