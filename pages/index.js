import Head from "next/head";

import SectionCards from "@/components/card/section-cards";
import NavBar from "@/components/nav/navbar";
import Banner from "@/components/banner/banner";
import {
  getPopularVideos,
  getVideos,
  getVideoForDevelopment,
} from "../lib/videos";
import styles from "@/styles/Home.module.css";

export const getServerSideProps = async () => {
  const disneyVideos = await getVideos("disney trailer");
  const productivityVideos = await getVideos("productivity trailer");
  const travelVideos = await getVideos("travel trailer");
  const popularVideos = await getPopularVideos();

  // use this during development to not consume the youtube api credit
  // const disneyVideos = getVideoForDevelopment();
  // const productivityVideos = getVideoForDevelopment();
  // const travelVideos = getVideoForDevelopment();
  // const popularVideos = getVideoForDevelopment();

  return {
    props: { disneyVideos, travelVideos, productivityVideos, popularVideos },
  };
};

export default function Home({
  disneyVideos,
  travelVideos,
  productivityVideos,
  popularVideos,
}) {
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
      <div className={styles.main}>
        <NavBar />
        <Banner
          videoId="bKh2G73gCCs"
          title="Clifford the red dog"
          subTitle="a very cute dog"
          imgUrl="/static/clifford.webp"
        />
        <div className={styles.sectionWrapper}>
          <SectionCards title="Disney" videos={disneyVideos} size="large" />
          <SectionCards title="Travel" videos={travelVideos} size="small" />
          <SectionCards
            title="Productivity"
            videos={productivityVideos}
            size="medium"
          />
          <SectionCards title="Popular" videos={popularVideos} size="small" />
        </div>
      </div>
    </div>
  );
}
