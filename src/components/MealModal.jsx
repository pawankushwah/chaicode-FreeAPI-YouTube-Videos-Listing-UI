import React from 'react';
import { X, Globe, Utensils, Play, BookOpen, ListChecks } from 'lucide-react';

const MealModal = ({ meal, onClose }) => {
  if (!meal) return null;

  // Extract ingredients and measures
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({ name: ingredient, measure });
    }
  }

  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 md:p-10">
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-5xl bg-surface/50 border border-border rounded-lg overflow-y-auto  max-h-[90vh] flex flex-col lg:flex-row animate-in zoom-in-95 duration-500 shadow-2xl">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-3 bg-black/40 backdrop-blur-md text-white rounded-full hover:bg-brand transition-colors"
        >
          <X size={24} />
        </button>

        {/* Left Side: Media */}
        <div className="xl:w-5/12 relative xl:sticky xl:top-0 h-full lg:h-auto">
          <img 
            src={meal.strMealThumb} 
            alt={meal.strMeal}
            className="w-full h-full min-h-64 object-cover"
          />
          <div className="absolute lg:top-0 inset-0 bg-gradient-to-t from-surface via-transparent to-transparent md:bg-gradient-to-r" />
          
          <div className="absolute bottom-8 left-8 right-8">
            <span className="px-4 py-1.5 bg-brand text-white text-[10px] font-black uppercase tracking-widest rounded-full mb-4 inline-block">
              {meal.strCategory}
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-2">
              {meal.strMeal}
            </h2>
            <div className="flex items-center gap-3 text-white/60">
              <Globe size={16} />
              <span className="text-xs font-bold uppercase tracking-wider">{meal.strArea} Cuisine</span>
            </div>
          </div>
        </div>

        {/* Right Side: Details */}
        <div className="xl:w-7/12 p-8 md:p-12 bg-surface xl:overflow-auto">
          <div className="space-y-10">
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              {meal.strYoutube && (
                <a 
                  href={meal.strYoutube} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-2xl font-bold hover:scale-105 transition-transform"
                >
                  <Play size={18} fill="currentColor" />
                  Watch Video
                </a>
              )}
              {meal.strSource && (
                <a 
                  href={meal.strSource} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-surface-hover border border-border text-text-primary rounded-2xl font-bold hover:border-brand transition-all"
                >
                  <BookOpen size={18} />
                  Original Recipe
                </a>
              )}
            </div>

            {/* Ingredients */}
            <section>
              <div className="flex items-center gap-3 text-brand mb-6">
                <ListChecks size={24} />
                <h3 className="text-xl font-black uppercase tracking-tight">Ingredients</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ingredients.map((ing, i) => (
                  <div key={i} className="flex flex-col gap-3 p-3 bg-surface-hover border border-border rounded-xl">
                    <div className='flex items-center gap-2'>
                    <div className="w-2 h-2 rounded-full bg-brand" />
                    <span className="text-sm text-text-primary font-medium">{ing.name}</span>
                    </div>
                    <span className="text-xs text-text-secondary ml-auto">{ing.measure}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Instructions */}
            <section>
              <div className="flex items-center gap-3 text-brand mb-6">
                <Utensils size={24} />
                <h3 className="text-xl font-black uppercase tracking-tight">Instructions</h3>
              </div>
              <div className="space-y-6">
                {meal.strInstructions.split('\r\n').filter(s => s.trim()).map((step, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand font-black text-sm group-hover:bg-brand group-hover:text-white transition-all">
                      {i + 1}
                    </div>
                    <p className="text-text-secondary leading-relaxed pt-1">
                      {step.trim()}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealModal;
