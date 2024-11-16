import { useState } from "react";
import ThumbnailResult from "./ThumbnailResult";
import ThumbnailForm from "./ThumbnailForm";

const ThumbnailContainer = () => {
  const [inputUrl, setInputUrl] = useState("");
  return (
    <div
      style={{
        backgroundColor: "black",
        color: "white",
        margin: "0 auto",
        maxWidth: "1100px",
        width: "100%",
        padding: "20px",
      }}
      className="rounded-3 d-flex"
    >
      <ThumbnailForm
        onSubmit={(inputUrl) => setInputUrl(inputUrl)}
      />
      {inputUrl && <ThumbnailResult inputUrl={inputUrl} />}
    </div>
  );
};

export default ThumbnailContainer;
