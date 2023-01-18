import Image from "next/image";
import styles from "./banner.module.css";

const Banner = ({ title, subTitle, imgUrl }) => {
  const handleOnPlay = () => {
    console.log("Handle onPlay");
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftWrapper}>
        <div className={styles.left}>
          <div className={styles.nseriesWrapper}>
            <p className={styles.firstLetter}>N</p>
            <p className={styles.series}>S E R I E S</p>
          </div>
          <h3 className={styles.title}>{title}</h3>
          <h3 className={styles.subTitle}>{subTitle}</h3>
          <div className={styles.playBtnWrapper}>
            <button className={styles.btnWithIcon} onClick={handleOnPlay}>
              <Image
                width={32}
                height={32}
                src="/static/play_arrow.svg"
                alt="A play arrow icon "
              />
              <span className={styles.playText}>Play</span>
            </button>
          </div>
        </div>
      </div>
      <Image
        className={styles.bannerImg}
        src={imgUrl}
        alt={title}
        width={650}
        height={400}
        style={{ objectFit: "fill" }}
      ></Image>
    </div>
  );
};

export default Banner;
