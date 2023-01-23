import { useRouter } from "next/router";
import Modal from "react-modal";
import cls from "classnames";

import { getVideoById } from "../../lib/videos";

import styles from "../../styles/Video.module.css";
import NavBar from "@/components/nav/navbar";

Modal.setAppElement("#__next");

export const getStaticProps = async (context) => {
  const { videoId } = context.params;
  const videoArr = await getVideoById(videoId);

  return {
    props: { video: videoArr.length > 0 ? videoArr[0] : {} },
    revalidate: 10,
  };
};

export const getStaticPaths = async () => {
  const listOfVideos = ["mYfJxlgR2jw", "4zH5iYM4wJo", "KCPEHsAViiQ"];

  const paths = listOfVideos.map((videoId) => ({ params: { videoId } }));

  return {
    paths,
    fallback: "blocking",
  };
};

const Video = ({ video }) => {
  const router = useRouter();
  const { videoId } = router.query;

  const { channelTitle, description, publishTime, title, viewCount } = video;

  return (
    <div className={styles.container}>
      <NavBar />
      <Modal
        className={styles.modal}
        isOpen={true}
        contentLabel="Watch the video"
        onRequestClose={() => {
          router.back();
        }}
        overlayClassName={styles.overlay}
      >
        <iframe
          className={styles.videoPlayer}
          id="ytplayer"
          type="text/html"
          width="100%"
          height="360"
          src={`http://www.youtube.com/embed/${videoId}?autoplay=1&origin=http://example.com&controls=0&rel=0`}
          frameborder="0"
        />
        <div className={styles.modalBody}>
          <div className={styles.modalBodyContent}>
            <div className={styles.col1}>
              <p className={styles.publishTime}>{publishTime}</p>
              <p className={styles.title}>{title}</p>
              <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.col2}>
              <p className={cls(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>Cast: </span>
                <span className={styles.channelTitle}>{channelTitle}</span>
              </p>
              <p className={cls(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>View Count: </span>
                <span className={styles.channelTitle}>{viewCount}</span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Video;
