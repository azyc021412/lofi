"use client";

import { useState, useEffect } from "react";
import Audio from "@/app/components/Audio";
import useKeyboardEvent from "./hooks/useKeyboardEvent";
import { AudioFile } from "./utils/getAudioFiles";

const lofiBackgroundUrl = "/assets/images/lofi.jpg";

const Home = () => {
  const [audios, setAudios] = useState<AudioFile[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const fetchAudios = async () => {
      try {
        const res = await fetch("/api/audio");
        if (!res.ok) throw new Error("Failed to fetch audio files");
        const data = await res.json();

        const sortedData = data.sort(
          (a: { title: string }, b: { title: string }) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
            if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
            return 0;
          }
        );

        setAudios(sortedData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAudios();
  }, []);

  useKeyboardEvent("z", () => {
    setIsVisible((prev) => !prev);
  });

  return (
    <main
      className="h-screen w-screen flex items-center justify-center p-6 relative transition-all duration-500 bg-[#2e2222] text-[#f0d9b5]"
      style={{
        backgroundImage: `url(${lofiBackgroundUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className={`fixed top-10 right-10 p-4 rounded-lg shadow-lg w-96 backdrop-blur-md bg-[#9BB5DF]/60 border border-[#9BB5DF] audio-container ${
          isVisible ? "" : "hidden"
        }`}
      >
        <Audio audioFiles={audios} />
      </div>
    </main>
  );
};

export default Home;
