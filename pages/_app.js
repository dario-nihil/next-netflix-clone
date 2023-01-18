import { Roboto_Slab } from "@next/font/google";
import "@/styles/globals.css";

const robotoSlab = Roboto_Slab({ weight: ["700"], subsets: ["latin"] });

export default function App({ Component, pageProps }) {
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
