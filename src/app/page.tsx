"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import AudioContainer from "@/app/components/AudioContainer";

const lofiBackgroundUrl = "/assets/images/lofi.jpg";

const Home = () => {
  const [audios, setAudios] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchAudios = async () => {
      try {
        const res = await fetch("/api/audio"); // Call API route
        if (!res.ok) throw new Error("Failed to fetch audio files");
        const data = await res.json();
        setAudios(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAudios();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(".audio-container")) {
        setIsVisible(false);
      }
    };

    if (isVisible) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isVisible]);

  return (
    <main
      className="h-screen w-screen flex items-center justify-center p-6 relative transition-all duration-500 bg-[#2e2222] text-[#f0d9b5]"
      style={{
        backgroundImage: `url(${lofiBackgroundUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="absolute top-4 left-4 p-3 bg-[#9BB5DF] text-white rounded-full shadow-md hover:bg-[#7a6262] transition opacity-10 focus:opacity-10"
      >
        <FontAwesomeIcon icon={faMusic} size="lg" />
      </button>
      <div
        className={`fixed top-10 right-10 p-4 rounded-lg shadow-lg w-96 backdrop-blur-md bg-[#9BB5DF]/60 border border-[#9BB5DF] audio-container ${
          isVisible ? "" : "hidden"
        }`}
      >
        <AudioContainer audioFiles={audios} />
      </div>
    </main>
  );
};

export default Home;
