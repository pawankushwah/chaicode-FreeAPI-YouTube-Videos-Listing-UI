import React from 'react';

const VideoCard = ({ video, onClick }) => {
  return (
    <div 
      className="flex flex-col gap-3 cursor-pointer group w-full"
      onClick={() => onClick(video)}
    >
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-surface">
        <img 
          src={video.thumbnail} 
          alt={video.title} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
        />
        <span className="absolute bottom-2 right-2 bg-black/80 text-white px-1.5 py-0.5 rounded-md text-xs font-medium">
          {video.duration}
        </span>
      </div>
      <div className="flex gap-3">
        <div className="w-9 h-9 rounded-full bg-surface-hover flex items-center justify-center shrink-0">
          <svg viewBox="0 0 24 24" width="24" height="24" className="text-text-secondary">
            <path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
          </svg>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-medium text-text-primary line-clamp-2 leading-tight">
            {video.title}
          </h3>
          <p className="text-sm text-text-secondary hover:text-text-primary">
            {video.channelName}
          </p>
          <p className="text-sm text-text-secondary">
            {video.views} views • {video.timestamp}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
