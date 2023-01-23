import { useRouter } from "next/router";
import Modal from "react-modal";

import styles from "../../styles/Video.module.css";

Modal.setAppElement("#__next");

const Video = () => {
  const router = useRouter();
  const { videoId } = router.query;

  return (
    <div className={styles.container}>
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
      </Modal>
    </div>
  );
};

export default Video;
