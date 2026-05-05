import React from 'react';

const VideoModal = ({ video, onClose }) => {
  if (!video) return null;

  return (
    <div className="fixed inset-0 z-2000 flex justify-center p-4 pt-10 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-colors"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
          </svg>
        </button>
      
      {/* Modal Content */}
      <div className="relative bg-bg border border-border w-full max-w-5xl rounded-2xl overflow-y-auto shadow-2xl transform transition-all animate-in fade-in zoom-in duration-300">
        {/* Video Player */}
        <div className="aspect-video w-full bg-black">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>

        {/* Video Details */}
        <div className="p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-2 line-clamp-2">
            {video.title}
          </h2>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-full bg-surface-hover flex items-center justify-center border border-border shrink-0">
              <svg viewBox="0 0 24 24" width="24" height="24" className="text-text-secondary">
                <path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
              </svg>
            </div>
            <div>
              <p className="font-medium text-text-primary">{video.channelName}</p>
              <p className="text-sm text-text-secondary">Official Channel</p>
            </div>
            <button className="ml-auto bg-text-primary text-bg px-4 py-2 rounded-full font-medium hover:opacity-90 transition-opacity">
              Subscribe
            </button>
          </div>
          <div className="bg-surface rounded-xl p-4">
            <p className="text-sm text-text-primary font-medium mb-1">
              {video.views} views • {video.timestamp}
            </p>
            <p className="text-sm text-text-secondary leading-relaxed">
              Watch this amazing video about {video.title}. Don't forget to like and subscribe for more content!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
