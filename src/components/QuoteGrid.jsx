import React, { useState, useEffect } from 'react';
import { Quote as QuoteIcon, Copy, Check } from 'lucide-react';

const QuoteCard = ({ quote }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`"${quote.content}" — ${quote.author}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group bg-surface border border-border rounded-[2.5rem] p-8 md:p-10 hover:border-brand/50 transition-all duration-500 flex flex-col h-full relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
        <QuoteIcon size={120} />
      </div>
      
      <div className="relative z-10">
        <div className="mb-8">
           <QuoteIcon size={32} className="text-brand opacity-50" />
        </div>
        
        <p className="text-xl md:text-2xl font-medium text-text-primary leading-relaxed mb-8 italic">
          {quote.content}
        </p>
        
        <div className="mt-auto flex items-center justify-between pt-6 border-t border-border">
          <div className="flex flex-col">
            <span className="text-[10px] text-text-secondary uppercase font-black tracking-widest mb-1">Author</span>
            <span className="text-lg font-black text-text-primary group-hover:text-brand transition-colors">
              {quote.author}
            </span>
          </div>
          
          <button 
            onClick={handleCopy}
            className={`p-3 rounded-2xl border transition-all ${copied ? 'bg-green-500/10 border-green-500/50 text-green-500' : 'bg-surface-hover border-border text-text-secondary hover:text-brand hover:border-brand'}`}
          >
            {copied ? <Check size={20} /> : <Copy size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};

const QuoteGrid = ({ searchQuery }) => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setQuotes([]);
    setPage(1);
    fetchQuotes(1, false);
  }, [searchQuery]);

  const fetchQuotes = async (pageNum, isAppend = false) => {
    try {
      if (isAppend) setLoadingMore(true);
      else setLoading(true);

      const url = searchQuery
        ? `https://api.freeapi.app/api/v1/public/quotes?page=${pageNum}&limit=9&query=${searchQuery}`
        : `https://api.freeapi.app/api/v1/public/quotes?page=${pageNum}&limit=9`;

      const response = await fetch(url);
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
      <div className="p-6 md:p-10 max-w-7xl mx-auto">
        <div className="mb-12 h-20 w-64 bg-surface rounded-2xl animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-surface rounded-[2.5rem] h-80 animate-pulse border border-border" />
          ))}
        </div>
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
          {searchQuery ? `Showing results for "${searchQuery}"` : "Timeless wisdom from great thinkers throughout history. Because a single thought can change your world."}
        </p>
      </div>

      {quotes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {quotes.map((quote) => (
            <QuoteCard key={`${quote.id}-${Math.random()}`} quote={quote} />
          ))}
        </div>
      ) : !loading && (
        <div className="text-center py-20 bg-surface border border-border rounded-[3rem]">
          <QuoteIcon size={60} className="mx-auto text-brand/20 mb-6" />
          <h2 className="text-2xl font-black text-text-primary mb-2">No quotes found</h2>
          <p className="text-text-secondary">Try searching for a different keyword or author!</p>
        </div>
      )}

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
                <span>Gathering wisdom...</span>
              </div>
            ) : (
              <span className="flex items-center gap-3 relative z-10">
                <span>Discover More Quotes</span>
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

export default QuoteGrid;
