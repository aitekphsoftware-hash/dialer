
import { useState, useEffect, useRef, useCallback } from 'react';

export const useSound = (url: string, { loop = false, volume = 0.5 } = {}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(url);
    audio.loop = loop;
    audio.volume = volume;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [url, loop, volume]);

  const play = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.error("Error playing sound:", e));
    }
  }, []);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  return { play, stop };
};
