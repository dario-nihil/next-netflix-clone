import Image from "next/image";
import styles from "./card.module.css";

const Card = ({ imgUrl, size }) => {
  return (
    <div>
      The Card Component
      <Image src={imgUrl} alt="image" width={300} height={300} />
    </div>
  );
};

export default Card;
