export const getVideos = async (searchQuery) => {
  const response = await fetch(
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&type=video&key=${process.env.YOUTUBE_API_KEY}`
  );

  const data = await response.json();

  return data.items.map((item) => ({
    title: item.snippet.title,
    imgUrl: item.snippet.thumbnails.high.url,
    id: item.id.videoId ?? item.id.channelId,
  }));
};
