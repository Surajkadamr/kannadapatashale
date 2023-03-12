import Videocard from "@/components/videocard";
import Link from "next/link";
import React from "react";
import Typewriter from "typewriter-effect";
import { gql } from "@apollo/client";
import client from "middleware/apollo-client";
function Videos({ a }) {
  return (
    <div>
      <div className=" text-white text-lg md:text-2xl px-10 text-center py-10 md:py-20 bg-orange-300">
        <p className="text-white font-bold my-3">ವಿಡಿಯೋ ತರಗತಿಗಳು</p>
        <Typewriter
          options={{
            loop: true,
            autoStart: true,
            strings: [
              "ಭಾಷೆ ಮತ್ತು ಭಾಷಾವಿಜ್ಞಾನ",
              "ಕನ್ನಡ ಭಾಷಾ ಚರಿತ್ರೆ",
              "ತೌಲನಿಕ ದ್ರಾವಿಡ ಭಾಷಾವಿಜ್ಞಾನ",
              "ಕನ್ನಡ ವ್ಯಾಕರಣ",
              "ಕನ್ನಡ ಛಂದಸ್ಸು",
              "ಭಾರತೀಯ ಕಾವ್ಯಮೀಮಾಂಸೆ",
              "ಪಾಶ್ಚಾತ್ಯ ಕಾವ್ಯಮೀಮಾಂಸೆ",
              "ಕನ್ನಡ ಕಾವ್ಯಮೀಮಾಂಸೆ",
              "ಸಾಹಿತ್ಯ ವಿಮರ್ಶೆ",
              "ಜಾನಪದ ಅಧ್ಯಯನ",
              "ಕನ್ನಡದಲ್ಲಿ ಗ್ರಂಥ ಸಂಪಾದನೆ",
              "ಕನ್ನಡದಲ್ಲಿ  ಸಂಶೋಧನೆ",
              "ಸಾಂಸ್ಕೃತಿಕ ಅಧ್ಯಯನ",
              "ತೌಲನಿಕ‌ ಸಾಹಿತ್ಯ",
              "ಅನುವಾದ ಸಾಹಿತ್ಯ",
            ],
          }}
        />
      </div>
      <div className="m-5">
        <div className="m-3 shadow-2xl rounded-2xl md:w-1/2 md:mx-auto">
          <div className="flex text-center">
            <img className="w-14 m-5" src="/video-camera.png" alt="" />
            <p className=" text-center mx-0 text-lg font-semibold  my-auto">
              ವಿಡಿಯೋ ತರಗತಿಗಳು
            </p>
          </div>
          <div className="m-2">
            <Link className="" href={"/videos/a1"}>
              <p className="m-3">ಭಾಷೆ ಮತ್ತು ಭಾಷಾವಿಜ್ಞಾನ</p>
            </Link>
            <hr className="text-gray-900 w-full h-2" />
            <Link className="" href={"/videos/b2"}>
              <p className="mx-3 mb-3">ಕನ್ನಡ ಭಾಷಾ ಚರಿತ್ರೆ</p>
            </Link>
            <hr className="text-gray-900 w-full h-2" />
            <Link className="" href={"/videos/c3"}>
              <p className="mx-3 mb-3">ತೌಲನಿಕ ದ್ರಾವಿಡ ಭಾಷಾವಿಜ್ಞಾನ</p>
            </Link>
            <hr className="text-gray-900 w-full h-2" />
            <Link className="" href={"/videos/d4"}>
              <p className="mx-3 mb-3">ಕನ್ನಡ ವ್ಯಾಕರಣ</p>
            </Link>
            <hr className="text-gray-900 w-full h-2" />
            <Link className="" href={"/videos/e5"}>
              <p className="mx-3 mb-3">ಕನ್ನಡ ಛಂದಸ್ಸು</p>
            </Link>
            <hr className="text-gray-900 w-full h-2" />
            <Link className="" href={"/videos/f6"}>
              <p className="mx-3 mb-3">ಭಾರತೀಯ ಕಾವ್ಯಮೀಮಾಂಸೆ</p>
            </Link>
            <hr className="text-gray-900 w-full h-2" />
            <Link className="" href={"/videos/g7"}>
              <p className="mx-3 mb-3">ಪಾಶ್ಚಾತ್ಯ ಕಾವ್ಯಮೀಮಾಂಸೆ</p>
            </Link>
            <hr className="text-gray-900 w-full h-2" />
            <Link className="" href={"/videos/h8"}>
              <p className="mx-3 mb-3">ಕನ್ನಡ ಕಾವ್ಯಮೀಮಾಂಸೆ</p>
            </Link>
            <hr className="text-gray-900 w-full h-2" />
            <Link className="" href={"/videos/i9"}>
              <p className="mx-3 mb-3">ಸಾಹಿತ್ಯ ವಿಮರ್ಶೆ</p>
            </Link>
            <hr className="text-gray-900 w-full h-2" />
            <Link className="" href={"/videos/j10"}>
              <p className="mx-3 mb-3">ಜಾನಪದ ಅಧ್ಯಯನ</p>
            </Link>
            <hr className="text-gray-900 w-full h-2" />
            <Link className="" href={"/videos/k11"}>
              <p className="mx-3 mb-3">ಕನ್ನಡದಲ್ಲಿ ಗ್ರಂಥ ಸಂಪಾದನೆ</p>
            </Link>
            <hr className="text-gray-900 w-full h-2" />
            <Link className="" href={"/videos/l12"}>
              <p className="mx-3 mb-3">ಕನ್ನಡದಲ್ಲಿ ಸಂಶೋಧನೆ</p>
            </Link>
            <hr className="text-gray-900 w-full h-2" />
            <Link className="" href={"/videos/m13"}>
              <p className="mx-3 mb-3">ಸಾಂಸ್ಕೃತಿಕ ಅಧ್ಯಯನ</p>
            </Link>
            <hr className="text-gray-900 w-full h-2" />
            <Link className="" href={"/videos/n14"}>
              <p className="mx-3 mb-3">ತೌಲನಿಕ‌ ಸಾಹಿತ್ಯ</p>
            </Link>
            <hr className="text-gray-900 w-full h-2" />
            <Link className="" href={"/videos/o15"}>
              <p className="mx-3 mb-5 pb-8">ಅನುವಾದ ಸಾಹಿತ್ಯ </p>
            </Link>
          </div>
        </div>
        <div>
          <p className="text-center my-5 font-bold">RECENTS</p>
            {a.videos.data &&
              a.videos.data.map((item) => (
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
  );
}

export default Videos;
export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      query {
        videos (sort:"id:desc"){
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
const a=data;
  return { props: { a } };
}
