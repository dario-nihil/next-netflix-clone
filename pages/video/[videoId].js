import { useRouter } from "next/router";
import { useEffect, useReducer } from "react";
import Modal from "react-modal";
import cls from "classnames";

import { getVideoById } from "../../lib/videos";
import NavBar from "@/components/nav/navbar";
import DisLike from "@/components/icons/dislike-icon";
import Like from "@/components/icons/like-icon";

import styles from "../../styles/Video.module.css";

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
  const isDev = process.env.DEVELOPMENT;

  const listOfVideos = isDev
    ? [
        "I_l4qI0nXz8",
        "bKh2G73gCCs",
        "CaimKeDcudo",
        "0-wPm99PF9U",
        "Znsa4Deavgg",
      ]
    : ["mYfJxlgR2jw", "4zH5iYM4wJo", "KCPEHsAViiQ"];

  const paths = listOfVideos.map((videoId) => ({ params: { videoId } }));

  return {
    paths,
    fallback: "blocking",
  };
};

const initialState = {
  toggleLike: false,
  toggleDislike: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "like":
      return {
        toggleLike: !state.toggleLike,
        toggleDislike: false,
      };
    case "dislike":
      return {
        toggleDislike: !state.toggleDislike,
        toggleLike: false,
      };
    default:
      // maybe throw an error???
      return state;
  }
};

const Video = ({ video }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();
  const { videoId } = router.query;

  const { channelTitle, description, publishTime, title, viewCount } = video;

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/stats?videoId=${videoId}`, {
        method: "GET",
      });

      const data = await response.json();
      if (data.findVideo?.length > 0) {
        const foo = data.findVideo[0];
        const favourited = data.findVideo[0].favourited;

        favourited === 1
          ? dispatch({ type: "like" })
          : dispatch({ type: "dislike" });
      }
    })();
  }, [videoId]);

  const handleToggleLike = () => {
    dispatch({ type: "like" });
  };

  const handleToggleDislike = () => {
    dispatch({ type: "dislike" });
  };

  useEffect(() => {
    (async () => {
      if (state.toggleLike || state.toggleDislike) {
        await fetch("/api/stats", {
          method: "POST",
          body: JSON.stringify({
            videoId,
            favourited: state.toggleLike ? 1 : 0,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
    })();
  }, [state.toggleLike, state.toggleDislike, videoId]);

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
        <div className={styles.likeDislikeBtnWrapper}>
          <div className={styles.likeBtnWrapper}>
            <button onClick={handleToggleLike}>
              <div className={styles.btnWrapper}>
                <Like selected={state.toggleLike} />
              </div>
            </button>
          </div>
          <button onClick={handleToggleDislike}>
            <div className={styles.btnWrapper}>
              <DisLike selected={state.toggleDislike} />
            </div>
          </button>
        </div>
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
