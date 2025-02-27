import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackward,
  faForward,
  faPlay,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

interface CustomAudioPlayerProps {
  audioUrl: string | null;
  title: string;
  onNext: () => void;
  onPrevious: () => void;
}

export default function CustomAudioPlayer({
  audioUrl,
  title,
  onNext,
  onPrevious,
}: CustomAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .catch((err) => console.error("Playback error:", err));
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    const handleTimeUpdate = () => setCurrentTime(audioElement.currentTime);
    const handleLoadedMetadata = () => setDuration(audioElement.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audioElement.addEventListener("timeupdate", handleTimeUpdate);
    audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);
    audioElement.addEventListener("play", handlePlay);
    audioElement.addEventListener("pause", handlePause);

    return () => {
      audioElement.removeEventListener("timeupdate", handleTimeUpdate);
      audioElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audioElement.removeEventListener("play", handlePlay);
      audioElement.removeEventListener("pause", handlePause);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = audioUrl || "";
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current
          .play()
          .catch((err) => console.error("Autoplay error:", err));
      }
    }
  }, [audioUrl]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current && isPlaying) {
        setCurrentTime(audioRef.current.currentTime);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  if (!audioUrl) {
    return <div className="text-gray-400">Select an audio file to play</div>;
  }

  return (
    <div className="flex flex-col items-center p-4 bg-[#7A9ACE] rounded-md space-y-4">
      <audio ref={audioRef} autoPlay className="hidden" />

      <div className="flex items-center justify-between w-full mb-4">
        <button onClick={onPrevious} className="text-white hover:text-gray-300">
          <FontAwesomeIcon icon={faBackward} size="lg" />
        </button>

        <div className="flex flex-col items-center text-center">
          <span className="text-white text-md font-semibold">{title}</span>
          <span className="text-gray-300 text-sm">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>

        <button onClick={onNext} className="text-white hover:text-gray-300">
          <FontAwesomeIcon icon={faForward} size="lg" />
        </button>
      </div>

      <div className="flex items-center space-x-4 w-full">
        <button onClick={togglePlay} className="text-white hover:text-gray-300">
          {isPlaying ? (
            <FontAwesomeIcon icon={faPause} size="lg" />
          ) : (
            <FontAwesomeIcon icon={faPlay} size="lg" />
          )}
        </button>
        <input
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          onChange={handleSeek}
          className="w-full accent-[#64748B]"
        />
      </div>
    </div>
  );
}
