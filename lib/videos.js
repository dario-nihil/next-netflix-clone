import videosData from "../data/videos.json";

const fetchVideos = async (url) => {
  const BASE_URL = "https://youtube.googleapis.com/youtube/v3";

  const response = await fetch(
    `${BASE_URL}/${url}&key=${process.env.YOUTUBE_API_KEY}`
  );

  return await response.json();
};

export const getCommonVideos = async (url) => {
  const isDev = process.env.DEVELOPMENT;

  try {
    const data = isDev ? videosData : await fetchVideos(url);

    if (data?.error) {
      console.error("Youtube API error", data.error);
      return [];
    }

    return data.items.map((item) => ({
      title: item.snippet.title,
      imgUrl: item.snippet.thumbnails.high.url,
      id: item.id.videoId ?? item.id,
      description: item.snippet.description,
      publishTime: item.snippet.publishedAt,
      viewCount: item?.statistics?.viewCount ? item.statistics.viewCount : 0,
      channelTitle: item.snippet.channelTitle,
    }));
  } catch (error) {
    console.log("Something went wrong with video library", error);
    return [];
  }
};

export const getPopularVideos = async () => {
  const URL =
    "videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US";
  return getCommonVideos(URL);
};

export const getVideos = async (searchQuery) => {
  const URL = `search?part=snippet&q=${searchQuery}&type=video`;
  return getCommonVideos(URL);
};

export const getVideoById = async (videoId) => {
  const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`;
  return await getCommonVideos(URL);
};
