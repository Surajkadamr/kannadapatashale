import Link from "next/link";
import React from "react";
import { gql } from "@apollo/client";
import client from "middleware/apollo-client";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Testcard from "@/components/testcard";

function Category({ data ,user}) {
  const router = useRouter();
  const { category } = router.query;
  const testdata =
    "a1 b2 c3 d4 e5 f6 g7 h8 i9 j10 k11 l12 m13 n14 o15 p16 q17 r18 s19 t20";
  let result = testdata.indexOf(category);
  const type = [
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
  ];
  return (
    <div>
      {result === -1 && <ErrorPage statusCode={404} />}
      {result !== -1 && (
        <div>
          <div className=" text-white text-lg md:text-2xl px-10 text-center py-10 md:py-20 bg-orange-300">
            <p className="text-white font-bold my-3">ಪ್ರಶ್ನೆ ಸರಣಿಗಳು</p>
            <p className="text-white font-bold my-3">
              {type[category.slice(1, 2) - 1]}
            </p>
          </div>
          <div className="m-5">
            {data.tests.data[0] ? (
              <div>
                <p className="text-center my-5 font-bold">RECENTS</p>
                <div>
                <div className="md:grid md:grid-cols-3">
                  {data.tests.data.map((item) => (
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
            ) : (
              <div>
                <p className="font-bold text-center mx-auto md:mt-28 mt-64 text-2xl">
                  ಪರೀಕ್ಷಾ ಪತ್ರಿಕೆ ಲಭ್ಯವಿಲ್ಲ
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Category;
export async function getServerSideProps(context) {
  const id = JSON.stringify(context.params.category);
  const { data } = await client.query({
    query: gql`
      query {
        tests(filters: { category: { startsWith: ${id} } },sort:"id:desc") {
          data {
            id
            attributes {
              title
              category
              price
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

  return { props: { data } };
}
