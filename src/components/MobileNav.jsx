import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Compass, X, ChevronRight, Home, ShoppingBag, Quote, Laugh, Cat, Utensils, Users, Video } from 'lucide-react';

const MobileNav = ({ activeTab, onTabChange }) => {
  const { user } = useAuth();
  const [isExploreOpen, setIsExploreOpen] = useState(false);

  const mainItems = [
    { id: 'home', icon: <Video size={24} />, label: 'Videos' },
    { id: 'products', icon: <ShoppingBag size={24} />, label: 'Shop' },
  ];

  const exploreItems = [
    { id: 'quotes', icon: <Quote size={28} />, label: 'Quotes', desc: 'Timeless Wisdom' },
    { id: 'jokes', icon: <Laugh size={28} />, label: 'Jokes', desc: 'Unlimited Laughs' },
    { id: 'cats', icon: <Cat size={28} />, label: 'Cats', desc: 'Feline Friends' },
    { id: 'meals', icon: <Utensils size={28} />, label: 'Meals', desc: 'Delicious Recipes' },
    { id: 'users', icon: <Users size={28} />, label: 'Users', desc: 'Global Community' },
  ];

  const handleTabClick = (id) => {
    onTabChange(id);
    setIsExploreOpen(false);
  };

  const isExploreActive = exploreItems.some(item => item.id === activeTab);

  return (
    <>
      {/* Explore Bottom Sheet Overlay */}
      {isExploreOpen && (
        <div className="fixed inset-0 z-[2500] animate-in fade-in duration-300">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
            onClick={() => setIsExploreOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-surface border-t border-border rounded-t-[2.5rem] p-8 pb-12 animate-in slide-in-from-bottom duration-500 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-black text-text-primary">Explore More</h3>
              <button 
                onClick={() => setIsExploreOpen(false)}
                className="p-2 bg-surface-hover rounded-full text-text-secondary"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {exploreItems.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`flex items-center gap-5 p-5 rounded-3xl border transition-all active:scale-[0.98] ${activeTab === item.id ? 'bg-brand/10 border-brand/50' : 'bg-surface-hover border-border'}`}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${activeTab === item.id ? 'bg-brand text-white' : 'bg-bg text-brand'}`}>
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-black text-lg ${activeTab === item.id ? 'text-brand' : 'text-text-primary'}`}>{item.label}</h4>
                    <p className="text-sm text-text-secondary">{item.desc}</p>
                  </div>
                  <ChevronRight size={20} className="text-text-secondary" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <nav className="fixed lg:hidden bottom-0 left-0 right-0 bg-bg/80 backdrop-blur-xl border-t border-border flex justify-around items-center h-20 z-[2000] px-4 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        {/* Main Nav Items */}
        {mainItems.map((item) => (
          <div 
            key={item.id} 
            onClick={() => handleTabClick(item.id)}
            className={`flex flex-col items-center justify-center gap-1.5 cursor-pointer flex-1 h-full transition-all duration-300 ${activeTab === item.id ? 'text-brand' : 'text-text-secondary'}`}
          >
            <div className={`p-1.5 rounded-xl transition-all duration-300 ${activeTab === item.id ? 'bg-brand/10' : ''}`}>
              {item.icon}
            </div>
            <span className={`text-[11px] font-bold uppercase tracking-widest ${activeTab === item.id ? 'opacity-100' : 'opacity-60'}`}>
              {item.label}
            </span>
          </div>
        ))}

        {/* Explore Button */}
        <div 
          onClick={() => setIsExploreOpen(true)}
          className={`flex flex-col items-center justify-center gap-1.5 cursor-pointer flex-1 h-full transition-all duration-300 ${isExploreActive || isExploreOpen ? 'text-brand' : 'text-text-secondary'}`}
        >
          <div className={`p-1.5 rounded-xl transition-all duration-300 ${(isExploreActive || isExploreOpen) ? 'bg-brand/10' : ''}`}>
            <Compass size={24} className={(isExploreActive || isExploreOpen) ? 'animate-pulse' : ''} />
          </div>
          <span className={`text-[11px] font-bold uppercase tracking-widest ${(isExploreActive || isExploreOpen) ? 'opacity-100' : 'opacity-60'}`}>
            Explore
          </span>
        </div>

        {/* User Profile */}
        <div 
          onClick={() => handleTabClick('you')}
          className={`flex flex-col items-center justify-center gap-1.5 cursor-pointer flex-1 h-full transition-all duration-300 ${activeTab === 'you' ? 'text-brand' : 'text-text-secondary'}`}
        >
          <div className={`w-8 h-8 rounded-full overflow-hidden flex items-center justify-center border-2 transition-all duration-300 ${activeTab === 'you' ? 'border-brand scale-110 shadow-lg shadow-brand/20' : 'border-transparent'}`}>
            {user ? (
              <img 
                src={user.avatar?.url || `https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`} 
                alt="You" 
                className="w-full h-full object-cover"
              />
            ) : (
              <Users size={20} />
            )}
          </div>
          <span className={`text-[11px] font-bold uppercase tracking-widest ${activeTab === 'you' ? 'opacity-100' : 'opacity-60'}`}>
            You
          </span>
        </div>
      </nav>
    </>
  );
};

export default MobileNav;
