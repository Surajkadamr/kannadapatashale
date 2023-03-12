import Link from "next/link";
import React from "react";
import { gql } from "@apollo/client";
import client from "middleware/apollo-client";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Videocard from "@/components/videocard";
function Analysisid({ data }) {
  const router = useRouter();
  const { aid } = router.query;
  const testdata = "a1 b2 c3 d4 e5 f6 g7 h8";
  let result = testdata.indexOf(aid);
  const type = [
    "ಕೆಸೆಟ್ ಪರೀಕ್ಷೆ",
    "ನೆಟ್ ಪರೀಕ್ಷೆ",
    "ಕೇರಳ ಸೆಟ್ ಪರೀಕ್ಷೆ",
    "ಪಿಹೆಚ್.ಡಿ. ಪ್ರವೇಶ ಪರೀಕ್ಷೆ",
    "ಪ್ರೌಢಶಾಲಾ ಶಿಕ್ಷಕ ನೇಮಕಾತಿ ಪರೀಕ್ಷೆ",
    "ಪಿಯು ಕಾಲೇಜು ಉಪನ್ಯಾಸಕರ ನೇಮಕಾತಿ ಪರೀಕ್ಷೆ",
    "ಸಹಾಯಕ ಪ್ರಾಧ್ಯಾಪಕ ನೇಮಕಾತಿ ಪರೀಕ್ಷೆ",
    "ಕೆ.ಎ.ಎಸ್. ಪೂರ್ವಭಾವಿ ಪರೀಕ್ಷೆ",
  ];
  return (
    <div>
      {result === -1 && <ErrorPage statusCode={404} />}
      {result !== -1 && (
        <div>
          <div className=" text-white text-lg md:text-2xl px-10 text-center py-10 md:py-20 bg-orange-300">
            <p className="text-white font-bold my-3">
              ಹಳೆಯ ಪ್ರಶ್ನೆ ಪತ್ರಿಕೆಗಳು ವಿಶ್ಲೇಷಣೆ
            </p>
            <p className="text-white font-bold my-3">
              {type[aid.slice(1, 2) - 1]}
            </p>
          </div>
          <div className="m-5">
            {data.oldqpas.data[0] ? (
              <div>
                <p className="text-center my-5 font-bold">RECENTS</p>
                <div>
                  {data.oldqpas.data.map((item) => (
                    <Videocard
                      key={item.id}
                      title={item.attributes.title}
                      category={item.attributes.category}
                      videolink={item.attributes.videolink}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <p className="font-bold text-center mx-auto md:mt-28 mt-64 text-2xl">
                  ಪ್ರಶ್ನೆ ಪರೀಕ್ಷೆ ಪತ್ರಿಕೆ ಲಭ್ಯವಿಲ್ಲ
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Analysisid;
export async function getServerSideProps(context) {
  const id = JSON.stringify(context.params.aid);
  const { data } = await client.query({
    query: gql`
      query {
        oldqpas(filters: { category: { startsWith: ${id} } },sort:"id:desc") {
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
