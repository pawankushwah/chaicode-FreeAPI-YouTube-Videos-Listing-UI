import React, { useState, useEffect } from 'react';
import { Laugh, Copy, Share2, Check } from 'lucide-react';

const JokeCard = ({ joke }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(joke.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out this joke!',
        text: joke.content,
        url: window.location.href,
      }).catch(console.error);
    } else {
      handleCopy();
    }
  };

  // Generate a random gradient based on joke ID
  const gradients = [
    'from-pink-500/10 to-purple-500/10',
    'from-blue-500/10 to-cyan-500/10',
    'from-orange-500/10 to-yellow-500/10',
    'from-green-500/10 to-emerald-500/10',
    'from-indigo-500/10 to-violet-500/10',
  ];
  const gradient = gradients[joke.id % gradients.length];

  return (
    <div className={`group relative bg-surface border border-border rounded-3xl p-8 hover:border-brand/50 transition-all duration-500 flex flex-col h-full overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]`}>
      {/* Background Decor */}
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-700`} />
      
      <div className="relative z-10 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-brand/10 flex items-center justify-center text-brand mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
          <Laugh size={28} />
        </div>
        
        <p className="text-xl md:text-2xl font-medium text-text-primary leading-relaxed line-clamp-6 group-hover:line-clamp-none transition-all duration-500">
          {joke.content}
        </p>
      </div>

      <div className="mt-auto pt-6 flex items-center justify-between relative z-10">
        <div className="flex gap-2">
          {joke.categories?.map((cat, idx) => (
            <span 
              key={idx} 
              className="px-3 py-1 bg-surface-hover text-text-secondary text-[10px] font-bold rounded-full border border-border uppercase tracking-widest"
            >
              {cat}
            </span>
          ))}
          {(!joke.categories || joke.categories.length === 0) && (
            <span className="px-3 py-1 bg-surface-hover text-text-secondary text-[10px] font-bold rounded-full border border-border uppercase tracking-widest">
              General
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <button 
            onClick={handleCopy}
            className="p-2.5 rounded-full bg-surface-hover border border-border text-text-secondary hover:text-brand hover:border-brand transition-all duration-300"
            title="Copy Joke"
          >
            {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
          </button>
          <button 
            onClick={handleShare}
            className="p-2.5 rounded-full bg-surface-hover border border-border text-text-secondary hover:text-brand hover:border-brand transition-all duration-300"
            title="Share Joke"
          >
            <Share2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

const JokeGrid = () => {
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    fetchJokes(1, false);
  }, []);

  const fetchJokes = async (pageNum, isAppend = false) => {
    try {
      if (isAppend) setLoadingMore(true);
      else setLoading(true);

      const response = await fetch(`https://api.freeapi.app/api/v1/public/randomjokes?page=${pageNum}&limit=9`);
      const json = await response.json();

      if (json.success) {
        setJokes(prev => isAppend ? [...prev, ...json.data.data] : json.data.data);
        setHasMore(json.data.nextPage);
      } else {
        setError('Failed to fetch some laughter');
      }
    } catch (err) {
      setError('Comedy central is currently offline. Please check your connection.');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleShowMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchJokes(nextPage, true);
  };

  if (loading && page === 1) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-12 h-20 w-64 bg-surface rounded-2xl animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-surface rounded-[2rem] h-80 animate-pulse border border-border shadow-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (error && jokes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-4">
        <div className="w-20 h-20 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-6">
          <Laugh size={40} className="rotate-180" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">Oops! Something went wrong</h2>
        <p className="text-text-secondary max-w-md mb-8">{error}</p>
        <button 
          onClick={() => fetchJokes(1, false)}
          className="px-8 py-3 bg-brand text-white rounded-full font-bold hover:scale-105 transition-transform"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto min-h-screen">
      <div className="mb-16 relative">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand/5 blur-3xl rounded-full" />
        <h1 className="text-4xl md:text-6xl font-black text-text-primary tracking-tight mb-4 relative z-10">
          The Laugh <span className="text-brand">Factory</span>
        </h1>
        <p className="text-text-secondary text-lg md:text-xl max-w-2xl relative z-10">
          Handpicked collection of the web's funniest jokes. Because everyone deserves a good laugh today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {jokes.map((joke) => (
          <JokeCard key={`${joke.id}-${Math.random()}`} joke={joke} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-20 mb-12">
          <button
            onClick={handleShowMore}
            disabled={loadingMore}
            className="group relative px-10 py-4 bg-surface border border-border text-text-primary rounded-full font-bold hover:border-brand transition-all duration-300 disabled:opacity-50 overflow-hidden"
          >
            <div className="absolute inset-0 bg-brand/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            {loadingMore ? (
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-brand border-t-transparent rounded-full animate-spin" />
                <span>Brewing more jokes...</span>
              </div>
            ) : (
              <span className="flex items-center gap-3 relative z-10">
                <span>Show Me More Humor</span>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="group-hover:translate-y-1 transition-transform duration-300">
                  <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/>
                </svg>
              </span>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default JokeGrid;
