import React, { useState, useEffect } from "react";
import AudioList from "./AudioList";
import Search from "./Search";
import AudioPlayer from "./AudioPlayer";
import { useSearch } from "../hooks/useSearch";
import { useShuffle } from "../hooks/useShuffle";

interface AudioFile {
  title: string;
  url: string;
}

interface AudioContainerProps {
  audioFiles: AudioFile[];
}

const Audio: React.FC<AudioContainerProps> = ({ audioFiles }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { filteredFiles, handleSearch } = useSearch(audioFiles);
  const { shuffledFiles, isShuffled, setIsShuffled } = useShuffle(audioFiles);
  const [currentTrack, setCurrentTrack] = useState<AudioFile | null>(
    audioFiles[0]
  );

  useEffect(() => {
    if (filteredFiles.length > 0) {
      setCurrentTrack(filteredFiles[currentIndex]);
    }
  }, [filteredFiles, currentIndex]);

  useEffect(() => {
    if (audioFiles.length > 0 && !currentTrack) {
      setCurrentTrack(audioFiles[0]);
    }
  }, [audioFiles, currentTrack]);

  const handleShuffle = () => {
    setIsShuffled((prev) => !prev);
    setCurrentIndex(0);
  };

  const handleSelectAudio = (url: string) => {
    const selectedTrack = filteredFiles.find((file) => file.url === url);
    if (selectedTrack) {
      setCurrentTrack(selectedTrack);
      setCurrentIndex(filteredFiles.indexOf(selectedTrack));
    }
  };

  const handleNextPrevious = (direction: "next" | "previous") => {
    let nextIndex: number;

    if (isShuffled) {
      nextIndex = Math.floor(Math.random() * filteredFiles.length);
    } else {
      nextIndex =
        direction === "next"
          ? (currentIndex + 1) % filteredFiles.length
          : (currentIndex - 1 + filteredFiles.length) % filteredFiles.length;
    }

    setCurrentTrack(filteredFiles[nextIndex]);
    setCurrentIndex(nextIndex);
  };

  if (!audioFiles.length) {
    return;
  }

  return (
    <div className="p-2 flex flex-col space-y-4 w-full max-w-xl h-full">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-[#E2E8F0]">mp3</h2>
        <button
          onClick={handleShuffle}
          className="text-sm px-3 py-1 bg-[#7A9ACE] text-[#E2E8F0] rounded-md"
        >
          Shuffle: {isShuffled ? "On" : "Off"}
        </button>
      </div>

      <Search onSearch={handleSearch} />

      <AudioList
        audioFiles={isShuffled ? shuffledFiles : filteredFiles}
        currentAudioUrl={currentTrack?.url || null}
        onSelectAudio={handleSelectAudio}
      />

      <AudioPlayer
        audioUrl={currentTrack?.url || null}
        title={currentTrack?.title || ""}
        onNext={() => handleNextPrevious("next")}
        onPrevious={() => handleNextPrevious("previous")}
      />
    </div>
  );
};

export default Audio;
