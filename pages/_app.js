import { useEffect } from "react";
import { useRouter } from "next/router";
import { magic } from "../lib/magic-client";
import { Roboto_Slab } from "@next/font/google";
import "@/styles/globals.css";

const robotoSlab = Roboto_Slab({ weight: ["700"], subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const checkLogIn = async () => {
      const isLoggedIn = await magic.user.isLoggedIn();

      if (isLoggedIn) {
        router.push("/");
      } else {
        router.push("/login");
      }
    };

    checkLogIn();
  }, []);
  return (
    <>
      <style jsx global>
        {`
          html {
            font-family: ${robotoSlab.style.fontFamily};
          }
        `}
      </style>
      <Component {...pageProps} />
    </>
  );
}
