import React, { useState, useEffect } from 'react';

const QuoteCard = ({ quote }) => {
  return (
    <div className="bg-surface border border-border rounded-2xl p-6 group hover:border-accent transition-all duration-300 flex flex-col h-full relative overflow-hidden">
      <div className="absolute -top-4 -left-4 text-accent opacity-10 group-hover:opacity-20 transition-opacity">
        <svg viewBox="0 0 24 24" width="80" height="80" fill="currentColor">
          <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C15.4647 8 15.017 8.44772 15.017 9V12C15.017 12.5523 14.5693 13 14.017 13H11.017C10.4647 13 10.017 12.5523 10.017 12V9C10.017 6.79086 11.8079 5 14.017 5H19.017C21.2261 5 23.017 6.79086 23.017 9V15C23.017 17.2091 21.2261 19 19.017 19H17.017C15.3598 19 14.017 20.3421 14.017 22L14.017 21ZM1.017 21L1.017 18C1.017 16.8954 1.91243 16 3.017 16H6.017C6.56928 16 7.017 15.5523 7.017 15V9C7.017 8.44772 6.56928 8 6.017 8H3.017C2.46472 8 2.017 8.44772 2.017 9V12C2.017 12.5523 1.56928 13 1.017 13H-1.983C-2.53528 13 -2.983 12.5523 -2.983 12V9C-2.983 6.79086 -1.19214 5 1.017 5H6.017C8.22614 5 10.017 6.79086 10.017 9V15C10.017 17.2091 8.22614 19 6.017 19H4.017C2.35985 19 1.017 20.3421 1.017 22L1.017 21Z"/>
        </svg>
      </div>

      <p className="text-lg md:text-xl font-medium text-text-primary mb-6 leading-relaxed relative z-10">
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
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-3xl font-black text-text-primary tracking-tight mb-2">Quotes Gallery</h1>
        <p className="text-text-secondary text-sm">Timeless wisdom from great thinkers throughout history.</p>
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
            className="group flex items-center gap-3 px-10 py-4 bg-brand text-white rounded-full font-bold hover:bg-red-700 transition-all active:scale-95 disabled:opacity-50 shadow-xl shadow-brand/20"
          >
            {loadingMore ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Load More Wisdom</span>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="group-hover:translate-y-1 transition-transform">
                  <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/>
                </svg>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default QuoteGrid;
