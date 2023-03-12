import Link from "next/link";
import React from "react";
import { gql } from "@apollo/client";
import client from "middleware/apollo-client";
import Oqpcomp from "@/components/oqpcomp";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Videocard from "@/components/videocard";

function VideosCategory({ data }) {
  const router = useRouter();
  const { category } = router.query;
  const testdata = "a1 b2 c3 d4 e5 f6 g7 h8 i9 j10 k11 l12 m13 n14 o15";
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
  ];
  return (
    <div>
      {result === -1 && <ErrorPage statusCode={404} />}
      {result !== -1 && (
        <div>
          <div className=" text-white text-lg md:text-2xl px-10 text-center py-10 md:py-20 bg-orange-300">
            <p className="text-white font-bold my-3">ವಿಡಿಯೋ ತರಗತಿಗಳು</p>
            <p className="text-white font-bold my-3">
              {type[category.slice(1, 3) - 1]}
            </p>
          </div>
          <div className="m-5">
            {data.videos.data[0] ? (
              <div>
                <p className="text-center my-5 font-bold">RECENTS</p>
                  {data.videos.data.map((item) => (
                    <Videocard
                      key={item.id}
                      videolink={item.attributes.videolink}
                      title={item.attributes.title}
                      category={item.attributes.category}
                    />
                  ))}
              </div>
            ) : (
              <div>
                <p className="font-bold text-center mx-auto md:mt-28 mt-64 text-2xl">
                  ವಿಡಿಯೋ ಲಭ್ಯವಿಲ್ಲ
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default VideosCategory;
export async function getServerSideProps(context) {
  const id = JSON.stringify(context.params.category);
  const { data } = await client.query({
    query: gql`
      query {
        videos(filters: { category: { startsWith: ${id} } },sort:"id:desc") {
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
