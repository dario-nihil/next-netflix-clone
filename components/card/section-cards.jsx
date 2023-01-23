import Link from "next/link";
import Card from "./card";
import styles from "./section-cards.module.css";

const SectionCards = ({ title, videos = [], size }) => {
  console.log({ videos });
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos.map((video) => (
          <Link key={video.id} href={`/video/${video.id}`}>
            <Card
              key={video.id}
              id={video.id}
              imgUrl={video.imgUrl}
              size={size}
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SectionCards;
