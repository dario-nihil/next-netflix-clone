import Link from "next/link";
import Card from "./card";
import cls from "classnames";

import styles from "./section-cards.module.css";

const SectionCards = ({
  title,
  videos = [],
  size,
  shouldWrap = false,
  shouldScale,
}) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={cls(styles.cardWrapper, shouldWrap && styles.wrap)}>
        {videos.map((video) => (
          <Link key={video.id} href={`/video/${video.id}`}>
            <Card
              key={video.id}
              id={video.id}
              imgUrl={video.imgUrl}
              size={size}
              shouldScale={shouldScale}
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SectionCards;
