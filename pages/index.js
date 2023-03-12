import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Blogcard from "@/components/Blogcard";
import { gql } from "@apollo/client";
import client from "middleware/apollo-client";
export default function Home({data}) {
  return (
    <>
      <Head>
        <title>ಓದು ಕರ್ನಾಟಕ ಅಕಾಡೆಮಿ</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Splide
          aria-label="Images"
          className="relative my-5 md:w-1/2 w-full mx-auto "
        >
          <SplideSlide>
            <img className="w-full" src="/v1.png" alt="Image 1" />
          </SplideSlide>
          <SplideSlide>
            <img src="/v2.jpg" className="w-full" alt="Image 2" />
          </SplideSlide>
          <SplideSlide>
            <img src="/v3.png" className="w-full" alt="Image 3" />
          </SplideSlide>
        </Splide>
        <div className="sm:w-5/6 w-full mx-auto ">
          <div className="sm:flex sm:justify-center grid-cols-3 grid mx-auto">
            <Link
              href={"/oldquestionpapers"}
              className="m-5 py-5 w-24 shadow-2xl rounded-xl"
            >
              <img className="px-5" src="petition.png" alt="" />
              <p className="mt-3 px-3 text-center text-[1.35vh]">
                ಹಳೆಯ ಪ್ರಶ್ನೆಪತ್ರಿಕೆಗಳು
              </p>
            </Link>
            <Link
              href={"/testseries"}
              className="m-5 p-5 w-24 shadow-2xl rounded-xl"
            >
              <img src="exam.png" alt="" />
              <p className="mt-3 text-center text-[1.35vh]"> ಪ್ರಶ್ನೆ ಸರಣಿಗಳು</p>
            </Link>
            <Link
              href={"/books"}
              className="m-5 p-5 w-24 shadow-2xl rounded-xl"
            >
              <img src="/books.png" alt="" />
              <p className="mt-3 text-center text-[1.35vh]"> ನಮ್ಮ ಪುಸ್ತಕಗಳು</p>
            </Link>
            <Link
              href={"/oldquestionpapers/analysis"}
              className="m-5 py-5 md:px-5 w-24 shadow-2xl rounded-xl"
            >
              <img className="md:px-0 px-5" src="/puzzle.png" alt="" />
              <p className="mt-3 md:px-0 px-1 text-center text-[1.35vh]">
                ಪ್ರಶ್ನೆ ಪತ್ರಿಕೆಗಳ ವಿಶ್ಲೇಷಣೆ
              </p>
            </Link>
            <Link
              href={"/videos"}
              className="m-5 p-5 w-24 shadow-2xl rounded-xl"
            >
              <img src="/video-camera.png" alt="" />
              <p className="mt-3 text-center text-[1.35vh]">ವಿಡಿಯೋ ತರಗತಿಗಳು</p>
            </Link>
            <Link
              href={"/pdfbooks"}
              className="m-5 p-5 w-24 shadow-2xl rounded-xl"
            >
              <img src="/download-pdf.png" alt="" />
              <p className="mt-3 text-center text-[1.35vh]">
                ಪಿಡಿಎಫ್ ಪುಸ್ತಕಗಳು
              </p>
            </Link>
          </div>
        </div>
        <div>
          <p className="text-center my-5 font-bold">LATEST BLOGS</p>
          <div className="lg:grid lg:grid-cols-3 p-5 text-justify">
            {data.blogs.data &&
              data.blogs.data.map((item) => (
                <Blogcard
                  key={item.id}
                  title={item.attributes.title.slice(0, 28)}
                  link={item.id}
                  desc={item.attributes.desc.slice(0, 150)}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      query {
        blogs {
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
  return { props: { data } };
}
