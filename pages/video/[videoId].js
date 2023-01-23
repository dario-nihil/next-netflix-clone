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
        <div>Modal body</div>
      </Modal>
    </div>
  );
};

export default Video;
