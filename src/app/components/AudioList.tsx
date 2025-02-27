import React, { useState } from "react";
import useKeyboardEvent from "../hooks/useKeyboardEvent";

interface AudioFile {
  title: string;
  url: string;
}

interface AudioListProps {
  audioFiles: AudioFile[];
  onSelectAudio: (url: string) => void;
  currentAudioUrl?: string | null;
}

const AudioList: React.FC<AudioListProps> = ({
  audioFiles,
  onSelectAudio,
  currentAudioUrl,
}) => {
  const [containerHeight, setContainerHeight] = useState("h-20");

  useKeyboardEvent("x", () => {
    setContainerHeight((prevHeight) =>
      prevHeight === "h-20" ? "h-100" : "h-20"
    );
  });

  return (
    <div
      className={`${containerHeight} overflow-y-auto rounded-md p-1 transition-all duration-300`}
    >
      <ul className="list-none mt-3">
        {audioFiles.map((file, index) => {
          const isActive = file.url === currentAudioUrl;
          return (
            <li
              key={index}
              onClick={() => onSelectAudio(file.url)}
              className={`cursor-pointer text-md py-1 px-1 mb-1 rounded-md transition-colors duration-200 ${
                isActive
                  ? "font-bold text-[#a7f5e5]"
                  : "font-bold text-white hover:bg-[#9BB5DF]"
              }`}
            >
              {file.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AudioList;
