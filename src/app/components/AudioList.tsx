"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

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
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAudioFiles = audioFiles.filter((file) =>
    file.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-100 overflow-y-auto rounded-md p-1">
      <div className="relative">
        <input
          type="text"
          placeholder="Search audio..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 rounded-md bg-[#7A9ACE] text-white focus:outline-none"
        />
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute right-3 top-3 text-white"
        />
      </div>
      <ul className="list-none mt-3">
        {filteredAudioFiles.map((file, index) => {
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
