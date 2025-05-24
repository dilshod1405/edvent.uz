export default function VideoPlayer({ title, videoUrl }) {
  return (
    <div>
      <h1 className="mb-4 text-3xl font-bold">{title}</h1>
      <div className="mb-6 overflow-hidden rounded-md shadow-lg aspect-video">
        <iframe src={videoUrl} style={{border: 'none', width: '100%', height: '100%'}} allowFullScreen={true} allow="encrypted-media"></iframe>
      </div>
    </div>
  );
}
