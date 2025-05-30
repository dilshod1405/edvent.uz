'use client';

import { useEffect } from 'react';

export default function VideoPlayer({ title, otp, playbackInfo }) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://player.vdocipher.com/playerAssets/1.6.12/vdo.js";
    script.async = true;

    // Player yuklanganda ishga tushirish
    script.onload = () => {
      if (window.VdoPlayer) {
        new window.VdoPlayer({
          otp,
          playbackInfo,
          theme: '9ae7ff', // optional, default theme
          container: '#vdoPlayer',
          autoplay: true,
        });
      }
    };

    document.body.appendChild(script);

    // Tozalash: player va script
    return () => {
      const container = document.getElementById('vdoPlayer');
      if (container) container.innerHTML = '';

      const existingScript = document.querySelector('script[src*="vdo.js"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, [otp, playbackInfo]);

  return (
    <div>
      <h1 className="mb-4 text-3xl font-bold">{title}</h1>
      <div
        id="vdoPlayer"
        className="mb-6 rounded-md shadow-lg"
        style={{ width: '100%', height: '360px' }}
      />
    </div>
  );
}
