import Videocard from "@/components/videocard";
import Link from "next/link";
import React from "react";
import Typewriter from "typewriter-effect";
import { gql } from "@apollo/client";
import client from "middleware/apollo-client";
function Analysis({ data }) {
  return (
    <div>
      <div className=" text-white text-lg md:text-2xl px-10 text-center py-10 md:py-20 bg-orange-300">
        <p className="text-white font-bold my-3">
          ಹಳೆಯ ಪ್ರಶ್ನೆ ಪತ್ರಿಕೆಗಳು ವಿಶ್ಲೇಷಣೆ
        </p>
        <Typewriter
          options={{
            loop: true,
            autoStart: true,
            strings: [
              "ಕೆಸೆಟ್ ಪರೀಕ್ಷೆ ",
              "ನೆಟ್ ಪರೀಕ್ಷೆ ",
              "ಕೇರಳ ಸೆಟ್ ಪರೀಕ್ಷೆ ",
              "ಪಿಹೆಚ್.ಡಿ. ಪ್ರವೇಶ ಪರೀಕ್ಷೆ ",
              "ಪ್ರೌಢಶಾಲಾ ಶಿಕ್ಷಕ ನೇಮಕಾತಿ ಪರೀಕ್ಷೆ ",
              "ಪಿಯು ಕಾಲೇಜು ಉಪನ್ಯಾಸಕರ ನೇಮಕಾತಿ ಪರೀಕ್ಷೆ ",
              "ಸಹಾಯಕ ಪ್ರಾಧ್ಯಾಪಕ ನೇಮಕಾತಿ ಪರೀಕ್ಷೆ ",
              "ಕೆ.ಎ.ಎಸ್. ಪೂರ್ವಭಾವಿ ಪರೀಕ್ಷೆ ",
            ],
          }}
        />
      </div>
      <div className="m-5">
        <div className="m-3 shadow-2xl rounded-2xl md:w-1/2 md:mx-auto">
          <div className="flex text-center">
            <img
              className="w-14 my-5 ml-5 mr-0 md:m-5"
              src="/puzzle.png"
              alt=""
            />
            <p className=" text-center mx-0 text-lg font-semibold  my-auto">
              ಹಳೆಯ ಪ್ರಶ್ನೆ ಪತ್ರಿಕೆಗಳು ವಿಶ್ಲೇಷಣೆ
            </p>
          </div>
          <div className="m-2">
            <Link className="" href={"/oldquestionpapers/analysis/a1"}>
              <p className="m-3">ಕೆಸೆಟ್ ಪರೀಕ್ಷೆ </p>
            </Link>
            <hr className="text-gray-900 w-full h-2" />
            <Link className="" href={"/oldquestionpapers/analysis//b2"}>
              <p className="mx-3 mb-3">ನೆಟ್ ಪರೀಕ್ಷೆ </p>
            </Link>
            <hr className="text-gray-900 w-full h-2" />
            <Link className="" href={"/oldquestionpapers/analysis/c3"}>
              <p className="mx-3 mb-3">ಕೇರಳ ಸೆಟ್ ಪರೀಕ್ಷೆ </p>
            </Link>
            <hr className="text-gray-900 w-full h-2" />
            <Link className="" href={"/oldquestionpapers/analysis/d4"}>
              <p className="mx-3 mb-3">ಪಿಹೆಚ್.ಡಿ. ಪ್ರವೇಶ ಪರೀಕ್ಷೆ </p>
            </Link>
            <hr className="text-gray-900 w-full h-2" />
            <Link className="" href={"/oldquestionpapers/analysis/e5"}>
              <p className="mx-3 mb-3">ಪ್ರೌಢಶಾಲಾ ಶಿಕ್ಷಕ ನೇಮಕಾತಿ ಪರೀಕ್ಷೆ </p>
            </Link>
            <hr className="text-gray-900 w-full h-2" />
            <Link className="" href={"/oldquestionpapers/analysis/f6"}>
              <p className="mx-3 mb-3">
                ಪಿಯು ಕಾಲೇಜು ಉಪನ್ಯಾಸಕರ ನೇಮಕಾತಿ ಪರೀಕ್ಷೆ{" "}
              </p>
            </Link>
            <hr className="text-gray-900 w-full h-2" />
            <Link className="" href={"/oldquestionpapers/analysis/g7"}>
              <p className="mx-3 mb-3">ಸಹಾಯಕ ಪ್ರಾಧ್ಯಾಪಕ ನೇಮಕಾತಿ ಪರೀಕ್ಷೆ </p>
            </Link>
            <hr className="text-gray-900 w-full h-2" />
            <Link className="" href={"/oldquestionpapers/analysis/h8"}>
              <p className="mx-3 mb-5 pb-8">ಕೆ.ಎ.ಎಸ್. ಪೂರ್ವಭಾವಿ ಪರೀಕ್ಷೆ </p>
            </Link>
          </div>
        </div>
        <div>
          <p className="text-center my-5 font-bold">RECENTS</p>
          <div>
            {data.oldqpas.data &&
              data.oldqpas.data.map((item) => (
                <Videocard
                  key={item.id}
                  title={item.attributes.title}
                  category={item.attributes.category}
                  videolink={item.attributes.videolink}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analysis;
export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      query {
        oldqpas (sort:"id:desc"){
          data {
            id
            attributes {
              title
              category
              videolink
            }
          }
        }
      }
    `,
  });

  return { props: { data } };
}
