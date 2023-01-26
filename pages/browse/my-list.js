import SectionCards from "@/components/card/section-cards";
import NavBar from "@/components/nav/navbar";
import Head from "next/head";
import { getMyList } from "../../lib/videos";
import { verifyToken } from "../../lib/utils";

import styles from "../../styles/MyList.module.css";

export const getServerSideProps = async (context) => {
  const token = context.req ? context.req?.cookies.token : null;
  const userId = verifyToken(token);

  if (!userId) {
    return {
      props: {},
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const videos = await getMyList(token, userId);

  return {
    props: {
      myListVideos: videos,
    },
  };
};

const MyList = ({ myListVideos }) => {
  return (
    <>
      <Head>
        <title>My List</title>
      </Head>
      <main className={styles.main}>
        <NavBar />
        <div className={styles.sectionWrapper}>
          <SectionCards
            title="Test"
            videos={myListVideos}
            size="medium"
            shouldWrap
            shouldScale={false}
          />
        </div>
      </main>
    </>
  );
};

export default MyList;
