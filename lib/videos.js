export const getVideos = async (searchQuery) => {
  try {
    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&type=video&key=${process.env.YOUTUBE_API_KEY}`
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
