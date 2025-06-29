'use client';
import { useEffect, useRef, useState } from 'react';

export default function WelcomeAudio() {
  const audioRef = useRef(null);
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    const handleClick = () => {
      if (!played && audioRef.current) {
        audioRef.current.play();
        setPlayed(true);
      }
    };

    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [played]);

  return <audio ref={audioRef} src="/sounds/Welcome.mp3" preload="auto" />;
}
