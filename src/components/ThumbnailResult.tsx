import useThumbnail from "../hooks/useThumbnail";
import { Spinner } from "@chakra-ui/react";

interface Props {
  inputUrl: string;
}
const ThumbnailResult = ({ inputUrl }: Props) => {
  console.log(inputUrl);

  const {
    thumbnailData,
    isLoading,
    error,
    selectedUrl,
    setSelectedUrl,
  } = useThumbnail(inputUrl);

  const thumbnailNames: { [key: string]: string } = {
    default: "Default",
    medium: "Medium",
    high: "High",
    standard: "Standard",
    maxres: "Maximum Resolution",
  };

  if (isLoading)
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="black.500"
        size="xl"
        margin={"0 auto"}
      />
    );
  if (error)
    return <p className="text-danger">No Thumbnail found.</p>;

  return (
    <>
      <div>
        <div className="d-flex mb-3">
          <select
            defaultValue={"quality"}
            className="me-4 bg-dark px-3"
            onChange={(e) => setSelectedUrl(e.target.value)}
          >
            <option value="quality" disabled>
              Select Quality
            </option>
            {!error &&
              thumbnailData.map((thumbnail) => (
                <option
                  key={thumbnail.type}
                  value={thumbnail.url}
                >
                  {thumbnailNames[thumbnail.type]}
                </option>
              ))}
          </select>
          <a
            className={
              selectedUrl && !error
                ? "btn btn-dark"
                : "btn btn-dark disabled"
            }
            href={selectedUrl}
            role="button"
            type="button"
            target="blank"
          >
            Download
          </a>
        </div>
        <div>
          <img
            className="w-100 rounded"
            src={
              thumbnailData.find(
                (thumbnail) => thumbnail.type === "standard"
              )?.url
            }
          />
        </div>
      </div>
    </>
  );
};

export default ThumbnailResult;
