import Testcard from "@/components/testcard";
import Link from "next/link";
import React from "react";
import Typewriter from "typewriter-effect";
import { gql } from "@apollo/client";
import client from "middleware/apollo-client";
import Bookcomponent from "@/components/bookcomponent";
function Testseries({ data, user }) {
  return (
    <div>
      <div className=" text-white text-lg md:text-2xl px-10 text-center py-10 md:py-20 bg-orange-400">
        <p className="text-white font-bold my-3">ನಮ್ಮ ಪುಸ್ತಕಗಳು </p>
        <Typewriter
          options={{
            loop: true,
            autoStart: true,
            strings: [
              "ಕನ್ನಡ ಸಾಹಿತ್ಯ ಸಂಪದ",
              "ಕನ್ನಡ ಶಾಸ್ತ್ರ ಸಂಪದ",
              "ಕನ್ನಡ ಪ್ರಶ್ನೋತ್ತರ ಸಂಪದ",
            ],
          }}
        />
      </div>

      <div className="m-5">
        <p className="text-center my-5 font-bold">RECENTS</p>
        {data.books.data &&
          data.books.data.map((item) => (
            <Bookcomponent
              key={item.id}
              id={item.id}
              title={item.attributes.title}
              image={`https://kannadapatashale-backend.onrender.com/uploads/${item.attributes.image.data[0].attributes.hash}${item.attributes.image.data[0].attributes.ext}`}
              price={item.attributes.offer_price}
              oprice={item.attributes.original_price}
              qtyleft={item.attributes.qtyleft}
            />
          ))}
      </div>
    </div>
  );
}

export default Testseries;
export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      query {
        books (sort:"id:desc"){
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
