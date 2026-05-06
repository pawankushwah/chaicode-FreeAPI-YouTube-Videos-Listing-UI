import React, { useState, useEffect } from 'react';
import { Cat, RefreshCw, ExternalLink, Info, Heart, Share2, ChevronDown, ChevronUp } from 'lucide-react';

const CatViewer = ({ searchQuery }) => {
  const [cat, setCat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showAllStats, setShowAllStats] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('cat_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const fetchCat = async () => {
    try {
      setIsRefreshing(true);
      // If we have a search query, we could potentially fetch a specific breed, 
      // but for now we'll just treat it as a refresh trigger to stay consistent with the "Random" theme.
      const response = await fetch('https://api.freeapi.app/api/v1/public/cats/cat/random');
      const json = await response.json();

      if (json.success) {
        setCat(json.data);
        setShowAllStats(false);
      } else {
        setError('Failed to find a furry friend.');
      }
    } catch (err) {
      setError('The cats are currently hiding. Please check your connection.');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchCat();
  }, [searchQuery]);

  useEffect(() => {
    localStorage.setItem('cat_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = () => {
    if (!cat) return;
    const isFav = favorites.some(f => f.id === cat.id);
    if (isFav) {
      setFavorites(favorites.filter(f => f.id !== cat.id));
    } else {
      setFavorites([...favorites, cat]);
    }
  };

  const handleShare = async () => {
    if (!cat) return;
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Meet ${cat.name}`,
          text: `Check out this ${cat.name} cat! ${cat.description}`,
          url: cat.image,
        });
      } else {
        await navigator.clipboard.writeText(cat.image);
        alert('Image URL copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  if (loading && !cat) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)]">
        <div className="w-20 h-20 border-4 border-brand border-t-transparent rounded-full animate-spin mb-6" />
        <p className="text-text-secondary animate-pulse text-lg">Finding the cutest cat for you...</p>
      </div>
    );
  }

  const isFavorite = cat && favorites.some(f => f.id === cat.id);

  const coreStats = [
    { label: 'Intelligence', value: cat?.intelligence },
    { label: 'Affection', value: cat?.affection_level },
    { label: 'Child Friendly', value: cat?.child_friendly },
    { label: 'Energy', value: cat?.energy_level },
    { label: 'Grooming', value: cat?.grooming },
    { label: 'Social Needs', value: cat?.social_needs },
  ];

  const extendedStats = [
    { label: 'Adaptability', value: cat?.adaptability },
    { label: 'Dog Friendly', value: cat?.dog_friendly },
    { label: 'Health Issues', value: cat?.health_issues },
    { label: 'Shedding Level', value: cat?.shedding_level },
    { label: 'Stranger Friendly', value: cat?.stranger_friendly },
    { label: 'Vocalisation', value: cat?.vocalisation },
  ];

  const flags = [
    { label: 'Hypoallergenic', value: cat?.hypoallergenic },
    { label: 'Rare', value: cat?.rare },
    { label: 'Natural', value: cat?.natural },
    { label: 'Hairless', value: cat?.hairless },
    { label: 'Short Legs', value: cat?.short_legs },
  ].filter(f => f.value === 1);

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto min-h-screen animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-6xl font-black text-text-primary tracking-tight mb-2">
            Cat <span className="text-brand">Spotlight</span>
          </h1>
          <p className="text-text-secondary text-lg">
            {searchQuery ? `Searching for "${searchQuery}" cats...` : "Meet your new digital companion."}
          </p>
        </div>
      </div>

      {cat && (
        <div className="space-y-8">
          {/* Main Image - MIDDLE (Moved inside check to prevent crash) */}
          <div className="group relative overflow-hidden rounded-[2.5rem] bg-surface border border-border shadow-2xl max-h-[600px]">
            <img 
              src={cat.image} 
              alt={cat.name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Quick Actions overlay */}
            <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 flex flex-wrap justify-between items-center gap-4 transition-all duration-500 md:opacity-0 md:translate-y-12 md:group-hover:translate-y-0 md:group-hover:opacity-100">
              <div className="flex gap-2 md:gap-3">
                <button 
                  onClick={toggleFavorite}
                  className={`p-2.5 md:p-3 backdrop-blur-md border rounded-2xl transition-all ${isFavorite ? 'bg-brand/80 border-brand text-white' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}`}
                >
                  <Heart size={20} className="md:w-6 md:h-6" fill={isFavorite ? 'currentColor' : 'none'} />
                </button>
                <button 
                  onClick={handleShare}
                  className="p-2.5 md:p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white hover:bg-white/20 transition-colors"
                >
                  <Share2 size={20} className="md:w-6 md:h-6" />
                </button>
              </div>
              <div className="flex gap-2 md:gap-3 items-center">
                <a 
                  href={cat.wikipedia_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hidden sm:flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-surface-hover/80 backdrop-blur-md rounded-xl border border-border hover:border-brand/50 group transition-all"
                >
                  <span className="font-bold text-xs md:text-base">Wikipedia</span>
                  <ExternalLink size={14} className="md:w-4 md:h-4 text-text-secondary group-hover:text-brand transition-colors" />
                </a>
                <button 
                  onClick={fetchCat}
                  disabled={isRefreshing}
                  className="group flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 bg-brand text-white rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all shadow-lg shadow-brand/20 disabled:opacity-70"
                >
                  <RefreshCw size={18} className={`md:w-5 md:h-5 ${isRefreshing ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
                  <span className="text-xs md:text-base">{isRefreshing ? 'Finding Cat...' : 'Meow More'}</span>
                </button> 
              </div>
            </div>
          </div>

          {/* Breed Characteristics - TOP */}
          <div className="bg-brand/5 border border-brand/10 rounded-[2rem] p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3 text-brand">
                <Cat size={24} />
                <h3 className="text-xl font-bold uppercase tracking-tight">Breed Characteristics</h3>
              </div>
              <button 
                onClick={() => setShowAllStats(!showAllStats)}
                className="flex items-center gap-2 text-sm font-bold text-brand hover:underline"
              >
                {showAllStats ? <><ChevronUp size={18} /> Less</> : <><ChevronDown size={18} /> More</>}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
              {(showAllStats ? [...coreStats, ...extendedStats] : coreStats).map((stat, i) => (
                <div key={i} className="flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-300" style={{ animationDelay: `${i * 50}ms` }}>
                  <span className="text-sm font-medium text-text-secondary">{stat.label}</span>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, j) => (
                      <div 
                        key={j} 
                        className={`w-3.5 h-1.5 rounded-full ${j < stat.value ? 'bg-brand' : 'bg-brand/10'}`} 
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {showAllStats && flags.length > 0 && (
              <div className="mt-8 pt-6 border-t border-brand/10 flex flex-wrap gap-3 animate-in fade-in duration-500">
                {flags.map((flag, i) => (
                  <span key={i} className="px-4 py-1.5 bg-brand text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                    {flag.label}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Title and Description - BOTTOM */}
          <div className="bg-surface border border-border rounded-[2.5rem] p-10 shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-5">
                <Cat size={120} />
             </div>

             <div className="relative z-10">
              <div className="flex items-center gap-3 text-brand mb-4">
                <Info size={20} />
                <span className="text-sm font-bold uppercase tracking-widest">Breed Identity</span>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <h2 className="text-4xl md:text-5xl font-black text-text-primary">{cat.name}</h2>
                <div className="flex gap-2">
                   <span className="px-4 py-1.5 bg-surface-hover border border-border rounded-full text-xs font-bold text-text-primary uppercase tracking-wider">
                      {cat.origin}
                   </span>
                   <span className="px-4 py-1.5 bg-surface-hover border border-border rounded-full text-xs font-bold text-text-primary uppercase tracking-wider">
                      {cat.life_span} Years
                   </span>
                </div>
              </div>

              <p className="text-xl text-text-secondary leading-relaxed mb-8 max-w-3xl">
                {cat.description}
              </p>

              <div className="flex flex-col gap-2">
                <span className="text-[10px] text-text-secondary uppercase font-black tracking-widest">Temperament</span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {cat.temperament.split(',').map((t, idx) => (
                    <span key={idx} className="px-4 py-2 bg-brand/5 border border-brand/10 rounded-xl text-sm font-medium text-brand">
                      {t.trim()}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-border flex flex-wrap gap-4">
                
              </div>
             </div>
          </div>
        </div>
      )}

      {error && !cat && (
        <div className="bg-surface border border-red-500/20 rounded-3xl p-12 text-center mt-10">
          <p className="text-red-500 text-lg mb-6">{error}</p>
          <button onClick={fetchCat} className="text-brand font-bold underline">Try again</button>
        </div>
      )}
    </div>
  );
};

export default CatViewer;
