import SectionCards from "@/components/card/section-cards";
import NavBar from "@/components/nav/navbar";
import Head from "next/head";

import styles from "../../styles/MyList.module.css";

const MyList = () => {
  return (
    <>
      <Head>
        <title>My List</title>
      </Head>
      <main className={styles.main}>
        <NavBar />
        <div className={styles.sectionWrapper}>
          <SectionCards title="Test" videos={[]} size="medium" />
        </div>
      </main>
    </>
  );
};

export default MyList;
