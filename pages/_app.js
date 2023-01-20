import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { magic } from "../lib/magic-client";
import { Roboto_Slab } from "@next/font/google";
import "@/styles/globals.css";

const robotoSlab = Roboto_Slab({ weight: ["700"], subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLogIn = async () => {
      const isLoggedIn = await magic.user.isLoggedIn();

      if (isLoggedIn) {
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    };

    checkLogIn();
  }, []);

  useEffect(() => {
    const handleRouteChangeComplete = () => {
      setIsLoading(false);
    };

    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    router.events.on("routeChangeError", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
      router.events.off("routeChangeError", handleRouteChangeComplete);
    };
  }, [router]);

  let contentDisplayed = <div>Loading...</div>;

  if (!isLoading) {
    contentDisplayed = (
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

  return contentDisplayed;
}
