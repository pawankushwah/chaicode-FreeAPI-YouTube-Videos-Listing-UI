import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import CategoryBar from './components/CategoryBar';
import VideoGrid from './components/VideoGrid';
import VideoModal from './components/VideoModal';
import MobileNav from './components/MobileNav';
import { useAuth } from './context/AuthContext';
import AvatarModal from './components/AvatarModal';
import AuthModal from './components/AuthModal';

function App() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [activeTab, setActiveTab] = useState('home');
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
    document.body.style.overflow = 'auto';
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setActiveTab('home');
  };

  return (
    <div className="app-container">
      <Navbar onMenuClick={toggleSidebar} onSearch={handleSearch} />
      <div className="main-content">
        <Sidebar 
          isOpen={isSidebarOpen} 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
        <main className="content-area pb-20">
          {activeTab === 'you' ? (
            <div className="flex flex-col items-center py-10 px-4 max-w-md mx-auto h-full">
              {user ? (
                <div className="w-full space-y-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full border-2 border-border p-1 mb-4">
                      <img 
                        src={user.avatar?.url || `https://avatar.iran.liara.run/public/boy?username=${user.username}`} 
                        alt={user.username} 
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <h2 className="text-2xl font-bold text-text-primary">{user.username}</h2>
                    <p className="text-text-secondary">{user.email}</p>
                  </div>
                  
                  <div className="space-y-3">
                    <button 
                      onClick={() => setIsAvatarModalOpen(true)}
                      className="w-full py-3 px-6 bg-surface border border-border rounded-xl text-text-primary font-medium hover:bg-surface-hover transition-colors flex items-center gap-4"
                    >
                      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                      Change Profile Picture
                    </button>
                    <button 
                      onClick={logout}
                      className="w-full py-3 px-6 bg-surface border border-border rounded-xl text-brand font-medium hover:bg-surface-hover transition-colors flex items-center gap-4"
                    >
                      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                        <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
                      </svg>
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center py-20">
                  <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center mb-6">
                    <svg viewBox="0 0 24 24" width="40" height="40" className="text-text-secondary">
                      <path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-2 flex items-center gap-2">
                    <button 
                    onClick={() => setIsAuthModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-1 border border-border rounded-full text-accent font-medium hover:bg-accent/10 transition-colors"
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                    </svg>
                    <span className="inline text-md">Sign In</span>
                  </button> to ChaiTube</h3>
                  <p className="text-text-secondary mb-8">Access your videos, playlists and more from any device.</p>
                  
                </div>
              )}
            </div>
          ) : activeTab === 'home' ? (
            <>
              <CategoryBar onSortChange={setSortBy} currentSort={sortBy} />
              <VideoGrid 
                onVideoClick={handleVideoClick} 
                searchQuery={searchQuery}
                sortBy={sortBy}
              />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-var(--height-navbar)-80px)] text-center animate-in fade-in zoom-in duration-500">
              <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mb-6 relative">
                <div className="absolute inset-0 bg-brand/20 rounded-full animate-ping" />
                <svg viewBox="0 0 24 24" width="48" height="48" className="text-brand relative z-10">
                  <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-text-primary mb-2 capitalize">{activeTab === 'subs' ? 'Subscriptions' : activeTab}</h2>
              <p className="text-text-secondary text-lg max-w-sm">
                We're working hard to bring this feature to life. Stay tuned for updates!
              </p>
              <button 
                onClick={() => setActiveTab('home')}
                className="mt-8 px-6 py-2.5 bg-brand text-white rounded-full font-bold hover:bg-red-700 transition-all hover:scale-105 active:scale-95"
              >
                Back to Home
              </button>
            </div>
          )}
        </main>
      </div>
      
      <MobileNav activeTab={activeTab} onTabChange={setActiveTab} />

      {selectedVideo && (
        <VideoModal 
          video={selectedVideo} 
          onClose={handleCloseModal} 
        />
      )}

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />

      <AvatarModal 
        isOpen={isAvatarModalOpen} 
        onClose={() => setIsAvatarModalOpen(false)} 
      />
    </div>
  );
}

export default App;
