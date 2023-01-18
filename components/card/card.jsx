import Image from "next/image";
import styles from "./card.module.css";

const Card = ({ imgUrl, size }) => {
  const classMap = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem,
  };

  return (
    <div className={styles.container}>
      The Card Component
      <div className={classMap[size]}>
        <Image
          src={imgUrl}
          alt="image"
          className={styles.cardImg}
          fill={true}
        />
      </div>
    </div>
  );
};

export default Card;
