import React, { useState } from "react";
import YouTube from "react-youtube";
import "./VideoModal.css"; // Optional for styling

const VideoModal = (videoUrl: string) => {
  const [isOpen, setIsOpen] = useState(false);

  // Extract YouTube video ID from the URL
  const getVideoId = (url: string) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/;
    const match = url.match(regex);
    return match ? match[1] : undefined;
  };

  const videoId = getVideoId(videoUrl);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={openModal}>Play Video</button>

      {isOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <YouTube
              videoId={videoId}
              opts={{ width: "100%", height: "400px" }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default VideoModal;
