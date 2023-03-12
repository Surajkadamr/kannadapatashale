import Testcard from "@/components/testcard";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";
import { gql } from "@apollo/client";
import client from "middleware/apollo-client";
function Testseries({ a, user }) {
  // const [c, setc] = useState();
  // useEffect(() => {
  //   setc(Math.random());
  // }, []); 

  return (
    <div>
      <div className=" text-white text-lg md:text-2xl px-10 text-center py-10 md:py-20 bg-orange-400">
        <p className="text-white font-bold my-3">ಪ್ರಶ್ನೆ ಸರಣಿಗಳು</p>
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
              "ಪ್ರಾಚೀನ ಕನ್ನಡ ಸಾಹಿತ್ಯ",
              "ಮಧ್ಯಕಾಲೀನ ಕನ್ನಡ ಸಾಹಿತ್ಯ",
              "ಕನ್ನಡ ಸಾಹಿತ್ಯ ಪ್ರಕಾರಗಳು",
              "ಹೊಸಗನ್ನಡ ಕವಿಗಳು",
              "ಹೊಸಗನ್ನಡ ಗದ್ಯ ಲೇಖಕರು",
            ],
          }}
        />
      </div>
      <div className="m-5">
        <div className="m-3 shadow-2xl rounded-2xl md:w-1/2 md:mx-auto">
          <div className="flex text-center">
            <img className="w-14 m-5" src="exam.png" alt="" />
            <p className=" text-center mx-0 text-lg font-semibold  my-auto">
              ಪ್ರಶ್ನೆ ಸರಣಿಗಳು
            </p>
          </div>
          <div className="m-2">
            <Link className="" href={"/testseries/a1"}>
              <p className="m-3">ಭಾಷೆ ಮತ್ತು ಭಾಷಾವಿಜ್ಞಾನ</p>
            </Link>
            <hr className="text-gray-900 w-full h-2" />
            <Link className="" href={"/testseries/b2"}>
              <p className="mx-3 mb-3">ಕನ್ನಡ ಭಾಷಾ ಚರಿತ್ರೆ</p>
            </Link>
            <hr className="text-gray-900 w-full h-2" />
            <Link className="" href={"/testseries/c3"}>
              <p className="mx-3 mb-3">ತೌಲನಿಕ ದ್ರಾವಿಡ ಭಾಷಾವಿಜ್ಞಾನ</p>
            </Link>
            <hr className="text-gray-900 w-full h-2" />
            <Link className="" href={"/testseries/d4"}>
              <p className="mx-3 mb-3">ಕನ್ನಡ ವ್ಯಾಕರಣ</p>
            </Link>
            <hr className="text-gray-900 w-full h-2" />
            <Link className="" href={"/testseries/e5"}>
              <p className="mx-3 mb-3">ಕನ್ನಡ ಛಂದಸ್ಸು</p>
            </Link>
            <hr className="text-gray-900 w-full h-2" />
            <Link className="" href={"/testseries/f6"}>
              <p className="mx-3 mb-3">ಭಾರತೀಯ ಕಾವ್ಯಮೀಮಾಂಸೆ</p>
            </Link>
            <hr className="text-gray-900 w-full h-2" />
            <Link className="" href={"/testseries/g7"}>
              <p className="mx-3 mb-3">ಪಾಶ್ಚಾತ್ಯ ಕಾವ್ಯಮೀಮಾಂಸೆ</p>
            </Link>
            <hr className="text-gray-900 w-full h-2" />
            <Link className="" href={"/testseries/h8"}>
              <p className="mx-3 mb-3">ಕನ್ನಡ ಕಾವ್ಯಮೀಮಾಂಸೆ</p>
            </Link>
            <hr className="text-gray-900 w-full h-2" />
            <Link className="" href={"/testseries/i9"}>
              <p className="mx-3 mb-3">ಸಾಹಿತ್ಯ ವಿಮರ್ಶೆ</p>
            </Link>
            <hr className="text-gray-900 w-full h-2" />
            <Link className="" href={"/testseries/j10"}>
              <p className="mx-3 mb-3">ಜಾನಪದ ಅಧ್ಯಯನ</p>
            </Link>
            <hr className="text-gray-900 w-full h-2" />
            <Link className="" href={"/testseries/k11"}>
              <p className="mx-3 mb-3">ಕನ್ನಡದಲ್ಲಿ ಗ್ರಂಥ ಸಂಪಾದನೆ</p>
            </Link>
            <hr className="text-gray-900 w-full h-2" />
            <Link className="" href={"/testseries/l12"}>
              <p className="mx-3 mb-5">ಕನ್ನಡದಲ್ಲಿ ಸಂಶೋಧನೆ</p>
            </Link>
            <hr className="text-gray-900 w-full h-2" />
            <Link className="" href={"/testseries/m13"}>
              <p className="mx-3 mb-5   ">ಸಾಂಸ್ಕೃತಿಕ ಅಧ್ಯಯನ</p>
            </Link>
            <hr className="text-gray-900 w-full h-2" />
            <Link className="" href={"/testseries/n14"}>
              <p className="mx-3 mb-3">ತೌಲನಿಕ‌ ಸಾಹಿತ್ಯ</p>
            </Link>
            <hr className="text-gray-900 w-full h-2" />
            <Link className="" href={"/testseries/o15"}>
              <p className="mx-3 mb-3">ಅನುವಾದ ಸಾಹಿತ್ಯ</p>
            </Link>
            <hr className="text-gray-900 w-full h-2" />
            <Link className="" href={"/testseries/p16"}>
              <p className="mx-3 mb-3">ಪ್ರಾಚೀನ ಕನ್ನಡ ಸಾಹಿತ್ಯ</p>
            </Link>
            <hr className="text-gray-900 w-full h-2" />
            <Link className="" href={"/testseries/q17"}>
              <p className="mx-3 mb-3">ಮಧ್ಯಕಾಲೀನ ಕನ್ನಡ ಸಾಹಿತ್ಯ</p>
            </Link>
            <hr className="text-gray-900 w-full h-2" />
            <Link className="" href={"/testseries/r18"}>
              <p className="mx-3 mb-3">ಕನ್ನಡ ಸಾಹಿತ್ಯ ಪ್ರಕಾರಗಳು</p>
            </Link>
            <hr className="text-gray-900 w-full h-2" />
            <Link className="" href={"/testseries/s19"}>
              <p className="mx-3 mb-3">ಹೊಸಗನ್ನಡ ಕವಿಗಳು</p>
            </Link>
            <hr className="text-gray-900 w-full h-2" />
            <Link className="" href={"/testseries/t20"}>
              <p className="mx-3 mb-5 pb-8">ಹೊಸಗನ್ನಡ ಗದ್ಯ ಲೇಖಕರು</p>
            </Link>
          </div>
        </div>
        <div>
          <p className="text-center my-5 font-bold">RECENTS</p>
          <div className="w-full md:grid-cols-3 md:grid">
            {a.tests.data &&
              a.tests.data.map((item) => (
                <Testcard
                  title={item.attributes.title}
                  category={item.attributes.category}
                  key={item.id}
                  id={item.id}
                  user={user}
                  nq={item.attributes.questions.data.length}
                  price={item.attributes.price}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testseries;
export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      query {
        tests (sort:"id:desc"){
          data {
            id
            attributes {
              title
              price
              category
              questions {
                data {
                  id
                }
              }
            }
          }
        }
      }
    `,
  });
const a=data;
  return { props: { a } };
}
