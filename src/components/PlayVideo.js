import React, { useState, useEffect, useRef } from "react";
import { FaPlay, FaPlayCircle } from "react-icons/fa";

export default function PlayVideo() {
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const [mediaPlaying, setMediaPlaying] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  // Initialize media and handle autoplay restrictions
  useEffect(() => {
    const video = videoRef.current;
    const audio = audioRef.current;

    if (video && audio) {
      video.muted = true; // Required for autoplay in most browsers
      video.pause();
      audio.pause();
    }
  }, []);

  // Handle scroll events to toggle between video and audio
  useEffect(() => {
    const handleScroll = () => {
      const video = videoRef.current;
      const audio = audioRef.current;

      if (video && audio && userInteracted) {
        const videoRect = video.getBoundingClientRect();
        const isVideoInView = (
          videoRect.top < window.innerHeight && 
          videoRect.bottom > 0
        );

        if (isVideoInView && !mediaPlaying) {
          video.play().catch(e => console.error("Video play failed:", e));
          audio.pause();
          setMediaPlaying(true);
        } else if (!isVideoInView && mediaPlaying) {
          video.pause();
          audio.play().catch(e => console.error("Audio play failed:", e));
          setMediaPlaying(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [mediaPlaying, userInteracted]);

  const handlePlay = () => {
    const video = videoRef.current;
    const audio = audioRef.current;

    if (video && audio) {
      video.play()
        .then(() => {
          setMediaPlaying(true);
          setUserInteracted(true);
          audio.pause();
        })
        .catch(e => {
          console.error("Playback failed:", e);
          // If video play fails, try with muted audio
          video.muted = true;
          video.play()
            .then(() => {
              setMediaPlaying(true);
              setUserInteracted(true);
              audio.pause();
            })
            .catch(e => console.error("Muted playback also failed:", e));
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
          cursor: "pointer"
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
      pointerEvents: "none"
    }}
  >
    <div 
      style={{
        backgroundColor: 'white',
        borderRadius: "50%",
        padding: "12px",
        cursor: "pointer",
        pointerEvents: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        transition: "transform 0.2s",
        transform: "scale(1)",
        ':hover': {
          transform: "scale(1.05)"
        }
      }}
      onClick={handlePlay}
    >
      <FaPlayCircle size={40} color="black" />
    </div>
  </div>
)}
    </div>
  );
}