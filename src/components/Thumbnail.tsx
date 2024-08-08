import { FormEvent, useRef, useState } from "react";
import ThumbnailResult from "./ThumbnailResult";

const Thumbnail = () => {
  const [inputUrl, setInputUrl] = useState("");
  const userInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (userInputRef.current) {
      setInputUrl(userInputRef.current.value);
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
        {inputUrl && <ThumbnailResult inputUrl={inputUrl} />}
      </div>
    </>
  );
};

export default Thumbnail;
