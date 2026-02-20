import React, { useState, useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import trailerThumb from "../../assets/brown_street.jpeg";

const Hero = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = "cqGjhVJWtEg"; // replace with your trailer video ID

  // Load Gothic font dynamically
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {!isPlaying ? (
        // 🎬 Custom Thumbnail + Play Button
        <div className="relative w-full h-full">
          <img
            src={trailerThumb}
            alt="Trailer Thumbnail"
            className="w-full h-full object-cover"
          />

          {/* Overlay content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p
              className="text-white  text-4xl md:text-6xl tracking-widest mb-6 font-custom"
            >
              PLAY TEASER
            </p>
            <button
              onClick={() => setIsPlaying(true)}
              className="group flex items-center justify-center w-24 h-24 rounded-full border-4 border-white/80 bg-transparent text-white transition duration-300 hover:scale-110 hover:border-[#e0c4a2] shadow-[0_0_20px_rgba(255,255,255,0.4)]"
            >
              <FaPlay
                size={32}
                className="ml-1 text-white group-hover:text-[#e0c4a2]"
              />
            </button>
          </div>
        </div>
      ) : (
        // 🎥 Fullscreen YouTube iframe
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&controls=1&modestbranding=1&rel=0`}
          title="YouTube Video Background"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      )}
    </section>
  );
};

export default Hero;
