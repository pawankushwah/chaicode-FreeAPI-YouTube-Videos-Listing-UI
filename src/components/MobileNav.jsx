import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Compass, X, ChevronRight } from 'lucide-react';

const MobileNav = ({ activeTab, onTabChange }) => {
  const { user } = useAuth();
  const [isExploreOpen, setIsExploreOpen] = useState(false);

  const mainItems = [
    { id: 'home', icon: <path d="M4 21V10.08l8-6.91 8 6.91V21h-6v-6h-4v6H4z"/>, label: 'Videos' },
    { id: 'products', icon: <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>, label: 'Shop' },
  ];

  const exploreItems = [
    { id: 'quotes', icon: <path d="M14 17h3.35l-1 3H14v-3zm-9 0h3.35l-1 3H5v-3zM11 7H4v10h7V7zm2 0h7v10h-7V7z"/>, label: 'Quotes', desc: 'Timeless Wisdom' },
    { id: 'jokes', icon: <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h2V9H7v2zm8 0h2V9h-2v2zm-3 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>, label: 'Jokes', desc: 'Unlimited Laughs' },
    { id: 'cats', icon: <path d="M12 2c-1.1 0-2 .9-2 2v.2c-1.3.4-2.4 1.2-3.2 2.3-.3-.1-.7-.2-1-.2-1.7 0-3 1.3-3 3 0 .7.3 1.3.7 1.8-.4.8-.7 1.7-.7 2.7 0 3.3 2.7 6 6 6s6-2.7 6-6c0-1-.3-1.9-.7-2.7.4-.5.7-1.1.7-1.8 0-1.7-1.3-3-3-3-.3 0-.7.1-1 .2-.8-1.1-1.9-1.9-3.2-2.3V4c0-1.1-.9-2-2-2z"/>, label: 'Cats', desc: 'Feline Friends' },
    { id: 'meals', icon: <path d="M3 2v7c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2V2M7 2v20M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3v7"/>, label: 'Meals', desc: 'Delicious Recipes' },
    { id: 'users', icon: <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm13 14v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>, label: 'Users', desc: 'Global Community' },
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
                    <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                      {item.icon}
                    </svg>
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
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                {item.icon}
              </svg>
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
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
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
