import fs from "fs";
import path from "path";
import { formatFilename } from "./formatUtils";

export interface AudioFile {
  title: string;
  url: string;
}

export const getAudioFiles = (): AudioFile[] => {
  const musicFolderPath = path.join(process.cwd(), "public", "assets", "music");
  const filenames = fs.readdirSync(musicFolderPath);
  const audioFiles: AudioFile[] = filenames
    .filter((filename) => filename.endsWith(".mp3"))
    .map((filename) => {
      const title = formatFilename(filename);
      return {
        title,
        url: `/assets/music/${filename}`,
      };
    });

  return audioFiles;
};
