import React, { useState, useEffect } from 'react';
import { Utensils, Globe, Tag, Play, Info, ChevronRight } from 'lucide-react';
import MealModal from './MealModal';

const MealCard = ({ meal, onClick }) => {
  return (
    <div 
      onClick={() => onClick(meal)}
      className="group bg-surface border border-border rounded-[2rem] overflow-hidden hover:border-brand/50 transition-all duration-500 flex flex-col h-full cursor-pointer hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
    >
      <div className="aspect-video overflow-hidden relative">
        <img 
          src={meal.strMealThumb} 
          alt={meal.strMeal} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-black text-white uppercase tracking-widest">
            {meal.strCategory}
          </span>
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
          <div className="flex items-center gap-2 text-white/80">
            <Globe size={14} />
            <span className="text-[10px] font-bold uppercase tracking-tight">{meal.strArea}</span>
          </div>
          {meal.strYoutube && (
            <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center text-white shadow-lg">
              <Play size={14} fill="currentColor" />
            </div>
          )}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-1 relative">
        <h3 className="text-xl font-black text-text-primary mb-3 line-clamp-1 group-hover:text-brand transition-colors">
          {meal.strMeal}
        </h3>
        
        {meal.strTags && (
          <div className="flex flex-wrap gap-2 mb-4">
            {meal.strTags.split(',').slice(0, 2).map((tag, i) => (
              <span key={i} className="flex items-center gap-1 text-[9px] font-bold text-text-secondary uppercase tracking-tighter">
                <Tag size={10} />
                {tag.trim()}
              </span>
            ))}
          </div>
        )}

        <p className="text-sm text-text-secondary line-clamp-3 mb-6 flex-1 italic leading-relaxed">
          "{meal.strInstructions.substring(0, 120)}..."
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <span className="text-[10px] font-black text-brand uppercase tracking-widest flex items-center gap-1">
            View Recipe <ChevronRight size={14} />
          </span>
          <div className="flex -space-x-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-6 h-6 rounded-full border-2 border-surface bg-surface-hover flex items-center justify-center text-[8px] font-bold text-text-secondary">
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const MealGrid = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    fetchMeals(1, false);
  }, []);

  const fetchMeals = async (pageNum, isAppend = false) => {
    try {
      if (isAppend) setLoadingMore(true);
      else setLoading(true);

      const response = await fetch(`https://api.freeapi.app/api/v1/public/meals?page=${pageNum}&limit=9`);
      const json = await response.json();

      if (json.success) {
        setMeals(prev => isAppend ? [...prev, ...json.data.data] : json.data.data);
        setHasMore(json.data.nextPage);
      } else {
        setError('Failed to load the kitchen');
      }
    } catch (err) {
      setError('The chef is busy. Please check your connection.');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleShowMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMeals(nextPage, true);
  };

  if (loading && page === 1) {
    return (
      <div className="p-6 md:p-10 max-w-7xl mx-auto">
        <div className="mb-12 h-20 w-64 bg-surface rounded-2xl animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-surface rounded-[2rem] aspect-[4/5] animate-pulse border border-border shadow-lg" />
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
          Gourmet <span className="text-brand">Kitchen</span>
        </h1>
        <p className="text-text-secondary text-lg md:text-xl max-w-2xl relative z-10">
          Discover a world of flavors with our curated collection of delicious recipes. From street food to fine dining.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {meals.map((meal) => (
          <MealCard 
            key={`${meal.idMeal}-${Math.random()}`} 
            meal={meal} 
            onClick={setSelectedMeal}
          />
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
                <span>Preparing more recipes...</span>
              </div>
            ) : (
              <span className="flex items-center gap-3 relative z-10">
                <span>Explore More Cuisines</span>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="group-hover:translate-y-1 transition-transform duration-300">
                  <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/>
                </svg>
              </span>
            )}
          </button>
        </div>
      )}

      {selectedMeal && (
        <MealModal 
          meal={selectedMeal} 
          onClose={() => setSelectedMeal(null)} 
        />
      )}
    </div>
  );
};

export default MealGrid;
