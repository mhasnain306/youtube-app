import useVideos from "../hooks/useVideos";
import { InputsType } from "./ChannelForm";
import VideoCard from "./VideoCard";

interface Props {
  playlistId: string;
  queryData: InputsType;
}
const Videos = ({ queryData, playlistId }: Props) => {
  const { data: videos, error } = useVideos(
    playlistId,
    queryData
  );
  if (!playlistId) return;
  if (error) return <p className="text-danger">{error}</p>;
  return (
    <div className="video-container d-flex flex-wrap justify-content-between">
      {videos &&
        videos.map((item) => (
          <VideoCard
            key={item.id}
            videoData={{
              thumbnailUrl: item.snippet.thumbnails.high.url,
              videoTitle: item.snippet.title,
              videoUrl:
                "https://www.youtube.com/watch?v=" +
                item.snippet.resourceId.videoId,
              publishedAt: item.snippet.publishedAt,
            }}
          />
        ))}
    </div>
  );
};

export default Videos;