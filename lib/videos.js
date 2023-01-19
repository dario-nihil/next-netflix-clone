export const getCommonVideos = async (url) => {
  try {
    const BASE_URL = "https://youtube.googleapis.com/youtube/v3";

    const response = await fetch(
      `${BASE_URL}/${url}&key=${process.env.YOUTUBE_API_KEY}`
    );

    const data = await response.json();

    if (data?.error) {
      console.error("Youtube API error", data.error);
      return [];
    }

    return data.items.map((item) => ({
      title: item.snippet.title,
      imgUrl: item.snippet.thumbnails.high.url,
      id: item.id.videoId ?? item.id,
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
