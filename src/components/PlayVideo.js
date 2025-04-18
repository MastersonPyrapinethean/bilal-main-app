import React, { useEffect, useRef, useState } from "react";
import { FaPlayCircle } from "react-icons/fa";

export default function PlayVideo() {
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const [mediaPlaying, setMediaPlaying] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Initialize video/audio on mount
  useEffect(() => {
    const video = videoRef.current;
    const audio = audioRef.current;

    if (video && audio) {
      video.muted = true;
      video.pause();
      audio.pause();
    }
  }, []);

  // Use IntersectionObserver to detect full visibility
  useEffect(() => {
    const video = videoRef.current;
    const audio = audioRef.current;

    if (!video || !audio || !userInteracted) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio === 1) {
          video.play().catch((e) => console.error("Video play failed:", e));
          audio.pause();
          setMediaPlaying(true);
        } else {
          video.pause();
          audio.play().catch((e) => console.error("Audio play failed:", e));
          setMediaPlaying(false);
        }
      },
      { threshold: 1.0 } // 100% visible
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, [userInteracted]);

  const handlePlay = () => {
    const video = videoRef.current;
    const audio = audioRef.current;

    if (video && audio) {
      video
        .play()
        .then(() => {
          setMediaPlaying(true);
          setUserInteracted(true);
          audio.pause();
        })
        .catch((e) => {
          console.error("Playback failed:", e);
          video.muted = true;
          video
            .play()
            .then(() => {
              setMediaPlaying(true);
              setUserInteracted(true);
              audio.pause();
            })
            .catch((e) => console.error("Muted playback also failed:", e));
        });
    }
  };

  const handlePause = () => {
    const video = videoRef.current;
    const audio = audioRef.current;

    if (video && audio) {
      video.pause();
      audio.pause();
      setMediaPlaying(false);
    }
  };

  return (
    <div className="autoplay-container" style={{ position: "relative" }}>
      <video
        ref={videoRef}
        muted
        loop
        style={{
          width: "80%",
          height: "70%",
          zIndex: 1,
          cursor: "pointer",
        }}
        onClick={mediaPlaying ? handlePause : handlePlay}
      >
        <source src="/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <audio ref={audioRef} loop>
        <source src="/audio.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {!mediaPlaying && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "50%",
              padding: "12px",
              cursor: "pointer",
              pointerEvents: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
              transition: "transform 0.2s ease",
              transform: hovered ? "scale(1.05)" : "scale(1)",
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={handlePlay}
          >
            <FaPlayCircle size={40} color="black" />
          </div>
        </div>
      )}
    </div>
  );
}
