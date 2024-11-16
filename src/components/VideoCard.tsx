import useConvertToPKT from "../hooks/useConvertToPKT";

export interface VideoCardType {
  thumbnailUrl: string;
  videoTitle: string;
  videoUrl: string;
  publishedAt: string;
}
interface Props {
  videoData: VideoCardType;
}
const VideoCard = ({ videoData }: Props) => {
  const { date, year, month } = useConvertToPKT(
    videoData.publishedAt
  );
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img
        src={videoData.thumbnailUrl}
        className="card-img-top"
        alt=""
      />
      <div className="card-body">
        <h5 className="card-title">
          <a target="blank" href={videoData.videoUrl}>
            {videoData.videoTitle}
          </a>
        </h5>
        <p>
          {month} {date}
          {", "}
          {year}
        </p>
      </div>
    </div>
  );
};

export default VideoCard;
