import Head from "next/head";

import SectionCards from "@/components/card/section-cards";
import NavBar from "@/components/nav/navbar";
import Banner from "@/components/banner/banner";
import {
  getPopularVideos,
  getVideos,
  getWatchItAgainVideos,
} from "../lib/videos";
import styles from "@/styles/Home.module.css";

export const getServerSideProps = async () => {
  const userId = "did:ethr:0x1B82eEb77f0693a3D336AB8557B94FE5E6f28c9F";
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3N1ZXIiOiJkaWQ6ZXRocjoweDFCODJlRWI3N2YwNjkzYTNEMzM2QUI4NTU3Qjk0RkU1RTZmMjhjOUYiLCJwdWJsaWNBZGRyZXNzIjoiMHgxQjgyZUViNzdmMDY5M2EzRDMzNkFCODU1N0I5NEZFNUU2ZjI4YzlGIiwiZW1haWwiOiJkYXJpby5uaWhpbEBnbWFpbC5jb20iLCJvYXV0aFByb3ZpZGVyIjpudWxsLCJwaG9uZU51bWJlciI6bnVsbCwid2FsbGV0cyI6W10sImlhdCI6MTY3NDU3MjQzMCwiZXhwIjoxNjc1MTc3MjMwLCJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsidXNlciIsImFkbWluIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS11c2VyLWlkIjoiZGlkOmV0aHI6MHgxQjgyZUViNzdmMDY5M2EzRDMzNkFCODU1N0I5NEZFNUU2ZjI4YzlGIn19.R0iEdDMq-vv9aqnmb3ZS8A3CoH9sum24yXkvmdToAbk";

  const watchItAgainVideos = await getWatchItAgainVideos(token, userId);
  console.log({ watchItAgainVideos });
  const disneyVideos = await getVideos("disney trailer");
  const productivityVideos = await getVideos("productivity trailer");
  const travelVideos = await getVideos("travel trailer");
  const popularVideos = await getPopularVideos();

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
