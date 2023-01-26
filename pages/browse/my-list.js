import SectionCards from "@/components/card/section-cards";
import NavBar from "@/components/nav/navbar";
import Head from "next/head";

const MyList = () => {
  return (
    <div>
      <Head>
        <title>My List</title>
      </Head>
      <main>
        <NavBar />
        <div>
          <SectionCards title="Test" videos={[]} size="medium" />
        </div>
      </main>
    </div>
  );
};

export default MyList;
