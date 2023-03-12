import "../styles/global.css";
import Navbar from "@/components/navbar";
import Script from "next/script";
import Bottombar from "@/components/Bottombar";
import { ApolloProvider } from "@apollo/client";
import client from "middleware/apollo-client";
import Footer from "@/components/footer";
import { useEffect, useRef, useState } from "react";
import { fetcher } from "@/lib/api";
import Cookies from "js-cookie";
import LoadingBar from "react-top-loading-bar";
import { useRouter } from "next/router";
import { unsetToken } from "@/lib/auth";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [user, setuser] = useState({ name: null });
  const [loading, setloading] = useState();
  const [progress, setProgress] = useState(0);
  const [c, setc] = useState();
  const [check, setcheck] = useState(false);
  const [check1, setcheck1] = useState(false);

  useEffect(() => {
    const jwt = Cookies.get("jwt");
    const resolveUser = async () => {
      const data1 = await fetch(`http://192.168.1.38:1337/api/users/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      });
      const data = await data1.json();
      if (data1.ok) {
        setuser({
          name: data.username,
          email: data.email,
          number: data.PhoneNumber,
          id: data.id,
          jwt: jwt,
        });
        setc(Math.random());
      } else {
        unsetToken();
        setc(Math.random());
      }
    };
    router.events.on("routeChangeStart", () => {
      setProgress(30);
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });
    setc(Math.random());
    if (jwt && !user.name) {
      setloading(true);
      resolveUser();
      setloading(false);
    }
    try {
      const pathWithoutQuery = router.asPath.split("?")[0];
      let pathArray = pathWithoutQuery.split("/");
      pathArray.shift();
      setcheck(false);
      setcheck1(false)
      for (let index = 0; index < pathArray.length; index++) {
        if (pathArray[index] === "test-page") {
          setcheck(true);
        }
        if (pathArray[index] === "viewresults") {
          setcheck1(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [user.name, router.query]);
  if (loading) {
    return (
      <h2 className="m-auto text-center my-96 text-2xl">
        <div role="status">
          <svg
            aria-hidden="true"
            className="inline w-10 h-14 mr-2 text-gray-200 animate-spin  fill-yellow-400"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
        Loading...
      </h2>
    );
  }
  return (
    <ApolloProvider client={client}>
      {!loading && (
        <>
          <LoadingBar
            color="orange"
            height={3}
            progress={progress}
            waitingTime={400}
            onLoaderFinished={() => setProgress(0)}
          />
          <Navbar key={c} user={user} check={check} check1={check1} />
          <Component key={c+2} {...pageProps} user={user} />
          <Footer check={check} check1={check1} />
          <Bottombar check={check} check1={check1} />
        </>
      )}
      <Script
        src="https://cdn.jsdelivr.net/npm/tw-elements/dist/js/index.min.js"
        strategy="lazyOnload"
      ></Script>
      <Script
        src="https://unpkg.com/flowbite@1.5.4/dist/flowbite.js"
        strategy="lazyOnload"
      ></Script>
      <Script
        src="https://kit.fontawesome.com/7227a7b54d.js"
        crossorigin="anonymous"
        strategy="lazyOnload"
      ></Script>
    </ApolloProvider>
  );
}
