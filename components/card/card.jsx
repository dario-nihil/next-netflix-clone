import Image from "next/image";
import { useState } from "react";
import styles from "./card.module.css";

const Card = ({ imgUrl, size }) => {
  const [imgSrc, setImgSrc] = useState(imgUrl);

  const classMap = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem,
  };

  const handleOnError = () => {
    setImgSrc(
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1159&q=80"
    );
  };

  return (
    <div className={styles.container}>
      The Card Component
      <div className={classMap[size]}>
        <Image
          onError={handleOnError}
          src={imgSrc}
          alt="image"
          className={styles.cardImg}
          fill={true}
        />
      </div>
    </div>
  );
};

export default Card;
