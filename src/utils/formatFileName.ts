export const formatFilename = (filename: string): string => {
  return filename
    .replace(/[-_]/g, " ")
    .replace(/\.mp3$/i, "")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
