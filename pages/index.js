import Head from "next/head";

import SectionCards from "@/components/card/section-cards";
import NavBar from "@/components/nav/navbar";
import Banner from "@/components/banner/banner";
import styles from "@/styles/Home.module.css";

export default function Home() {
  const disneyVideos = [
    {
      id: 0,
      imgUrl: "/static/clifford.webp",
    },
    {
      id: 1,
      imgUrl: "/static/clifford.webp",
    },
    {
      id: 2,
      imgUrl: "/static/clifford.webp",
    },
    {
      id: 3,
      imgUrl: "/static/clifford.webp",
    },
    {
      id: 4,
      imgUrl: "/static/clifford.webp",
    },
  ];
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
      <div className={styles.sectionWrapper}>
        <SectionCards title="Disney" videos={disneyVideos} size="large" />
        <SectionCards title="Disney" videos={disneyVideos} size="medium" />
      </div>
    </div>
  );
}
