import { QuoteIcon } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const QuoteCard = ({ quote }) => {
  return (
    <div className="bg-surface border border-border rounded-2xl p-6 group hover:border-accent transition-all duration-300 flex flex-col h-full relative overflow-hidden">
      <div className="absolute -top-4 -left-4 text-accent opacity-10 group-hover:opacity-20 transition-opacity">
        <QuoteIcon size={80} className='rotate-180' />
      </div>

      <p className="text-lg md:text-xl font-medium text-text-primary mb-6 leading-relaxed relative z-10  max-h-40 overflow-auto">
        "{quote.content}"
      </p>

      <div className="mt-auto flex flex-col gap-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-surface-hover border border-border flex items-center justify-center text-accent font-bold uppercase">
            {quote.author.charAt(0)}
          </div>
          <div>
            <h4 className="text-sm font-bold text-text-primary">{quote.author}</h4>
            <p className="text-[10px] text-text-secondary uppercase tracking-widest">{quote.authorSlug}</p>
          </div>
        </div>

        {quote.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {quote.tags.map((tag, idx) => (
              <span 
                key={idx} 
                className="px-2 py-0.5 bg-accent/5 text-accent text-[9px] font-bold rounded-md border border-accent/10 uppercase tracking-tighter"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const QuoteGrid = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    fetchQuotes(1, false);
  }, []);

  const fetchQuotes = async (pageNum, isAppend = false) => {
    try {
      if (isAppend) setLoadingMore(true);
      else setLoading(true);

      const response = await fetch(`https://api.freeapi.app/api/v1/public/quotes?page=${pageNum}&limit=10`);
      const json = await response.json();

      if (json.success) {
        setQuotes(prev => isAppend ? [...prev, ...json.data.data] : json.data.data);
        setHasMore(json.data.nextPage);
      } else {
        setError('Failed to load quotes');
      }
    } catch (err) {
      setError('Something went wrong. Please check your connection.');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleShowMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchQuotes(nextPage, true);
  };

  if (loading && page === 1) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-surface rounded-2xl h-64 animate-pulse border border-border" />
        ))}
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto min-h-screen">
      <div className="mb-16 relative">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand/5 blur-3xl rounded-full" />
        <h1 className="text-4xl md:text-6xl font-black text-text-primary tracking-tight mb-4 relative z-10">
          Quote <span className="text-brand">Gallery</span>
        </h1>
        <p className="text-text-secondary text-lg md:text-xl max-w-2xl relative z-10">
          Timeless wisdom from great thinkers throughout history. Because a single thought can change your world.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quotes.map((quote) => (
          <QuoteCard key={`${quote.id}-${Math.random()}`} quote={quote} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-12 mb-8">
          <button
            onClick={handleShowMore}
            disabled={loadingMore}
            className="mt-8 px-6 py-2.5 bg-surface border border-border text-text-primary rounded-full font-medium hover:bg-surface-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"

          >
            {loadingMore ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <span className="flex items-center gap-2">
                <span>Load More Wisdom</span>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="group-hover:translate-y-1 transition-transform">
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

export default QuoteGrid;
