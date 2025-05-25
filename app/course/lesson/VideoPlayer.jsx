'use client';

import { useEffect } from 'react';


export default function VideoPlayer({ title, otp, playbackInfo }) {
  useEffect(() => {
    // VdoCipher player script qo‘shamiz
    const script = document.createElement('script');
    script.src = "https://player.vdocipher.com/playerAssets/1.6.12/vdo.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.VdoPlayer) {
        // Oldingi player bo‘lsa o‘chirib tashlaymiz
        window.VdoPlayer.destroy && window.VdoPlayer.destroy();
      }

      window.VdoPlayer = new window.VdoPlayer({
        otp,
        playbackInfo,
        theme: '9ae7ff',
        container: document.getElementById('vdoPlayer'),
        autoplay: true,
      });
    };

    return () => {
      if (window.VdoPlayer) {
        window.VdoPlayer.destroy && window.VdoPlayer.destroy();
        window.VdoPlayer = null;
      }
      document.body.removeChild(script);
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
