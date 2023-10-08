import { FormEvent, useRef } from "react";
import useThumbnail from "../hooks/useThumbnail";
import getVideoId from "../services/getVideoId";

const Thumbnail = () => {
  const {
    thumbnailData,
    error,
    setError,
    isLoading,
    fetchthumbnail,
    selectedUrl,
    setSelectedUrl,
  } = useThumbnail();
  const userInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (userInputRef.current) {
      const id = getVideoId(userInputRef.current.value);
      if (id) fetchthumbnail(id);
      else setError("Invalid URL");
    }
  };

  return (
    <>
      <div
        style={{
          maxWidth: "500px",
          width: "100%",
          border: "1px solid black",
          padding: "10px",
        }}
        className="rounded-3"
      >
        <h1 className="display-6 mb-3">Download Youtube Video Thumbnail</h1>
        <form onSubmit={handleSubmit} className="mb-3 d-flex">
          <input
            className="form-control"
            ref={userInputRef}
            type="text"
            placeholder="Paste video url"
            required
          />
          <button type="submit" className="btn btn-primary ms-2">
            Search
          </button>
        </form>
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
        {isLoading && <p className="text-primary">Loading ...</p>}
        {!error && (
          <img
            className="w-100 rounded"
            src={
              thumbnailData.find((thumbnail) => thumbnail.type === "standard")
                ?.url
            }
          />
        )}
        {!isLoading && error && (
          <p className="text-danger">No Thumbnail found.</p>
        )}
      </div>
    </>
  );
};

export default Thumbnail;
