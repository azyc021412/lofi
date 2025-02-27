// hooks/useAudioPlayer.ts
import { useState, useRef, useEffect } from "react";

export const useAudioPlayer = (audioUrl: string | null) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Handle play/pause toggle
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current
        .play()
        .catch((err) => console.error("Playback error:", err));
    }
    setIsPlaying(!isPlaying); // Toggle the play/pause state
  };

  // Handle mute toggle
  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Handle seeking
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime); // Update currentTime manually
  };

  useEffect(() => {
    if (audioRef.current && audioUrl) {
      audioRef.current.src = audioUrl;
      setCurrentTime(0); // Reset currentTime when the audio URL changes
    }
  }, [audioUrl]);

  // Update currentTime during playback
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime); // Update currentTime on time update
    }
  };

  // Set duration when metadata is loaded
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration); // Set duration on metadata load
    }
  };

  return {
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
  };
};
