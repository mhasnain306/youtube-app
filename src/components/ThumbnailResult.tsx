import useThumbnail from "../hooks/useThumbnail";

interface Props {
  inputUrl: string;
}
const ThumbnailResult = ({ inputUrl }: Props) => {
  const { thumbnailData, error, selectedUrl, setSelectedUrl, isLoading } =
    useThumbnail(inputUrl);

  if (isLoading) return <p className="text-primary">Loading... </p>;
  if (error) return <p className="text-danger">No Thumbnail found.</p>;

  return (
    <>
      <div className="d-flex mb-3">
        <select
          defaultValue={"quality"}
          className="me-4"
          onChange={(e) => setSelectedUrl(e.target.value)}
        >
          <option value="quality" disabled>
            Select Quality
          </option>
          {!error &&
            thumbnailData.map((thumbnail) => (
              <option key={thumbnail.type} value={thumbnail.url}>
                {thumbnail.type}
              </option>
            ))}
        </select>
        <a
          className={
            selectedUrl && !error
              ? "btn btn-primary"
              : "btn btn-primary disabled"
          }
          href={selectedUrl}
          role="button"
          type="button"
          target="blank"
        >
          Download
        </a>
      </div>
      <img
        className="w-100 rounded"
        src={
          thumbnailData.find((thumbnail) => thumbnail.type === "standard")?.url
        }
      />
    </>
  );
};

export default ThumbnailResult;
