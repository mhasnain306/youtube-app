import { FormEvent, useRef, useState } from "react";
import getVideoId from "../services/getVideoId";

interface Props {
  onSubmit: (inputUrl: string) => void;
}
const ThumbnailForm = ({ onSubmit }: Props) => {
  const userInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (userInputRef.current) {
      const id = getVideoId(userInputRef.current.value);
      console.log(id);

      id ? (onSubmit(id), setError("")) : setError("Wrong Input");
    }
  };

  return (
    <>
      <div className="me-5">
        <h3 className="mb-4">
          Download Youtube-Video's Thumbnail
        </h3>
        <form onSubmit={handleSubmit} className="mb-3">
          <div className="">
            <input
              className="form-control"
              ref={userInputRef}
              type="text"
              placeholder="Paste video url"
              required
            />
            {error && <p className="text-danger">Wrong Input</p>}
          </div>
          <button type="submit" className="btn btn-dark my-2">
            Search
          </button>
        </form>
      </div>
    </>
  );
};

export default ThumbnailForm;
