'use client';

export default function VideoPlayer({ title, otp, playbackInfo }) {
  const iframeSrc = `https://player.vdocipher.com/v2/?otp=${otp}&playbackInfo=${playbackInfo}`;

  return (
    <div className="p-6 bg-gray-900 rounded-lg shadow-lg">
      <h1 className="mb-4 text-3xl font-bold">{title}</h1>
      <iframe
        src={iframeSrc}
        style={{ border: 0, width: '100%', height: '405px' }}
        allow="encrypted-media"
        allowFullScreen
        title="VdoCipher Player"
      ></iframe>
    </div>
  );
}
