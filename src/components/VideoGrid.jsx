import React, { useState, useEffect } from 'react';
import VideoCard from './VideoCard';

const API_URL = 'https://api.freeapi.app/api/v1/public/youtube/videos';

const formatViews = (views) => {
  if (!views) return '0';
  const num = parseInt(views);
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

const formatTimestamp = (dateString) => {
  const now = new Date();
  const past = new Date(dateString);
  const diffInMs = now - past;
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) return 'Today';
  if (diffInDays === 1) return 'Yesterday';
  if (diffInDays < 30) return `${diffInDays} days ago`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
  return `${Math.floor(diffInDays / 365)} years ago`;
};

const formatDuration = (duration) => {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '0:00';
  const [ , hours, minutes, seconds] = match.map(x => x ? parseInt(x) : 0);
  const h = hours > 0 ? `${hours}:` : '';
  const m = minutes.toString().padStart(hours > 0 ? 2 : 1, '0');
  const s = seconds.toString().padStart(2, '0');
  return `${h}${m}:${s}`;
};

const VideoGrid = ({ onVideoClick, searchQuery, sortBy }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  const fetchVideos = async (pageToFetch, isLoadMore = false) => {
    try {
      if (isLoadMore) setLoadingMore(true);
      else setLoading(true);

      const url = new URL(API_URL);
      url.searchParams.set('page', pageToFetch);
      url.searchParams.set('limit', 12);
      url.searchParams.set('sortBy', sortBy);
      if (searchQuery) {
        url.searchParams.set('query', searchQuery);
      }

      const response = await fetch(url.toString());
      const json = await response.json();
      
      if (json.success) {
        const mappedVideos = json.data.data.map(video => {
          const item = video.items;
          return {
            id: item.id,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.maxres?.url || item.snippet.thumbnails.high.url,
            channelName: item.snippet.channelTitle,
            views: formatViews(item.statistics.viewCount),
            timestamp: formatTimestamp(item.snippet.publishedAt),
            duration: formatDuration(item.contentDetails.duration)
          };
        });

        if (isLoadMore) {
          setVideos(prev => [...prev, ...mappedVideos]);
        } else {
          setVideos(mappedVideos);
        }
        
        setHasNextPage(json.data.nextPage);
      } else {
        setError('Failed to fetch videos');
      }
    } catch (err) {
      setError('An error occurred while fetching videos');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Fetch when searchQuery or sortBy changes
  useEffect(() => {
    setPage(1);
    fetchVideos(1, false);
  }, [searchQuery, sortBy]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchVideos(nextPage, true);
  };

  if (loading && page === 1) return <div className="flex justify-center items-center h-[400px] text-lg text-text-secondary">Searching for videos...</div>;
  if (error && videos.length === 0) return <div className="flex justify-center items-center h-[400px] text-lg text-brand">{error}</div>;

  return (
    <div className="flex flex-col items-center w-full pb-10">
      {videos.length === 0 && !loading ? (
        <div className="flex flex-col items-center justify-center h-[400px] text-center">
          <svg viewBox="0 0 24 24" width="64" height="64" className="text-surface-hover mb-4">
            <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
          </svg>
          <h3 className="text-xl font-medium text-text-primary">No videos found</h3>
          <p className="text-text-secondary">Try different keywords or filters</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-10 py-4 w-full">
            {videos.map(video => (
              <VideoCard 
                key={`${video.id}-${Math.random()}`}
                video={video} 
                onClick={onVideoClick}
              />
            ))}
          </div>

          {hasNextPage && (
            <button 
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="mt-8 px-6 py-2.5 bg-surface border border-border text-text-primary rounded-full font-medium hover:bg-surface-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingMore ? 'Loading more...' : 'Load More'}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default VideoGrid;
