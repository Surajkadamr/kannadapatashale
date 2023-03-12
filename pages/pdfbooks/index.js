import Pdfbookscomp from "@/components/pdfbookscomp";
import Link from "next/link";
import React from "react";
import { gql } from "@apollo/client";
import client from "middleware/apollo-client";
function Pdfbook({ a }) {
  return (
    <div>
      <div className="m-5">
        <div className="m-3 shadow-2xl rounded-2xl md:w-1/2 md:mx-auto">
          <div className="flex text-center">
            <img className="w-14 m-5" src="download-pdf.png" alt="" />
            <p className=" text-center mx-0 text-lg font-semibold  my-auto">
              ಪಿಡಿಎಫ್ ಪುಸ್ತಕಗಳು
            </p>
          </div>
        </div>
        <div>
          <p className="text-center my-5 font-bold">RECENTS</p>
          {a.pdfbooks.data &&
            a.pdfbooks.data.map((item) => (
              <Pdfbookscomp
                title={item.attributes.title}
                key={item.id}
                link={item.id}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Pdfbook;
export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      query {
        pdfbooks (sort:"id:desc"){
          data {
            id
            attributes {
              title
            }
          }
        }
      }
    `,
  });
const a = data;
  return { props: { a } };
}
