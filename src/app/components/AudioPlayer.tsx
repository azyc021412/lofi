import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackward,
  faForward,
  faPlay,
  faPause,
  faVolumeUp,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";
import { useAudioPlayer } from "../hooks/useAudioPlayer";
import { formatTime } from "../utils/formatUtils";
import useKeyboardEvent from "../hooks/useKeyboardEvent"; // Import the hook

interface AudioPlayerProps {
  audioUrl: string | null;
  title: string;
  onNext: () => void;
  onPrevious: () => void;
}

export default function AudioPlayer({
  audioUrl,
  title,
  onNext,
  onPrevious,
}: AudioPlayerProps) {
  const {
    audioRef,
    isPlaying,
    isMuted,
    togglePlay,
    toggleMute,
    handleSeek,
    currentTime,
    duration,
    handleTimeUpdate,
    handleLoadedMetadata,
  } = useAudioPlayer(audioUrl);

  // Using the useKeyboardEvent hook for Space and M keys
  useKeyboardEvent(" ", togglePlay); // Space key to play/pause
  useKeyboardEvent("m", toggleMute); // M key to mute/unmute

  if (!audioUrl) {
    return <div className="text-gray-400">Select an audio file to play</div>;
  }

  return (
    <div className="flex flex-col items-center p-4 bg-[#7A9ACE] rounded-md space-y-4">
      <audio
        ref={audioRef}
        autoPlay
        onTimeUpdate={handleTimeUpdate} // Update currentTime on time update
        onLoadedMetadata={handleLoadedMetadata} // Set duration when metadata is loaded
        onPlay={() => {}}
        onPause={() => {}}
        onEnded={onNext}
        className="hidden"
      />

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
        <button onClick={toggleMute} className="text-white hover:text-gray-300">
          <FontAwesomeIcon
            icon={isMuted ? faVolumeMute : faVolumeUp}
            size="lg"
          />
        </button>
      </div>
    </div>
  );
}
