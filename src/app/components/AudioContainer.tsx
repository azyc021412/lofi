"use client";

import React, { useState, useEffect } from "react";
import AudioList from "./AudioList";
import CustomAudioPlayer from "./CustomAudioPlayer";

interface AudioFile {
  title: string;
  url: string;
}

interface AudioContainerProps {
  audioFiles: AudioFile[];
}

const AudioContainer: React.FC<AudioContainerProps> = ({ audioFiles }) => {
  const [shuffledFiles, setShuffledFiles] = useState<AudioFile[]>([]);
  const [isShuffled, setIsShuffled] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const shuffled = [...audioFiles].sort(() => 0.5 - Math.random());
    setShuffledFiles(shuffled);
  }, [audioFiles]);

  const handleShuffle = () => {
    setIsShuffled((prev) => !prev);
    setCurrentIndex(0);
  };

  const handleNext = () => {
    const list = isShuffled ? shuffledFiles : audioFiles;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % list.length);
  };

  const handlePrevious = () => {
    const list = isShuffled ? shuffledFiles : audioFiles;
    setCurrentIndex((prevIndex) => (prevIndex - 1 + list.length) % list.length);
  };

  const listToUse = isShuffled ? shuffledFiles : audioFiles;
  const currentTrack = listToUse[currentIndex];

  const handleSelectAudio = (url: string) => {
    const indexInList = listToUse.findIndex((f) => f.url === url);
    if (indexInList >= 0) {
      setCurrentIndex(indexInList);
    }
  };

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

      <AudioList
        audioFiles={audioFiles}
        currentAudioUrl={currentTrack?.url || null}
        onSelectAudio={handleSelectAudio}
      />

      <CustomAudioPlayer
        audioUrl={currentTrack?.url || null}
        title={currentTrack?.title || ""}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </div>
  );
};

export default AudioContainer;
