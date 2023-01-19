import Head from "next/head";

import SectionCards from "@/components/card/section-cards";
import Card from "@/components/card/card";
import NavBar from "@/components/nav/navbar";
import Banner from "@/components/banner/banner";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix Clone</title>
        <meta
          name="description"
          content="Application for streaming video content."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar userName="dario@test.com" />
      <Banner
        title="Clifford the red dog"
        subTitle="a very cute dog"
        imgUrl="/static/clifford.webp"
      />
      <SectionCards title="Disney" />
    </div>
  );
}
