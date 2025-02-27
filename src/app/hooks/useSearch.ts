import { useState } from "react";
import { AudioFile } from "../utils/getAudioFiles";

export const useSearch = (audioFiles: AudioFile[]) => {
  const [filteredFiles, setFilteredFiles] = useState<AudioFile[]>(audioFiles);

  const handleSearch = (query: string) => {
    if (query.trim() === "") {
      setFilteredFiles(audioFiles);
    } else {
      setFilteredFiles(
        audioFiles.filter((file) =>
          file.title.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  return {
    filteredFiles: filteredFiles.length ? filteredFiles : audioFiles,
    handleSearch,
  };
};
