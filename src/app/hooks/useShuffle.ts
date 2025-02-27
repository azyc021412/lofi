import { useState, useEffect } from "react";
import { AudioFile } from "../utils/getAudioFiles";

export const useShuffle = (audioFiles: AudioFile[]) => {
  const [shuffledFiles, setShuffledFiles] = useState<AudioFile[]>(audioFiles);
  const [isShuffled, setIsShuffled] = useState(false);

  useEffect(() => {
    if (isShuffled) {
      setShuffledFiles((prev) => [...prev].sort(() => 0.5 - Math.random()));
    } else {
      setShuffledFiles(audioFiles);
    }
  }, [audioFiles, isShuffled]);

  return { shuffledFiles, isShuffled, setIsShuffled };
};
