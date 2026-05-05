import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Youtube_Logo from "../assets/youtube.svg";
import AuthModal from "./AuthModal";
import AvatarModal from "./AvatarModal";

const Navbar = ({ onMenuClick, onSearch }) => {
  const [searchInput, setSearchInput] = useState('');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchInput);
    setIsMobileSearchOpen(false);
  };

  if (isMobileSearchOpen) {
    return (
      <nav className="fixed top-0 left-0 right-0 h-navbar bg-bg flex items-center px-2 z-1000 border-b border-border animate-in slide-in-from-top duration-200">
        <button 
          onClick={() => setIsMobileSearchOpen(false)}
          className="p-2 rounded-full hover:bg-surface-hover mr-2"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" className="text-white">
            <path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
          </svg>
        </button>
        <form className="flex-1 flex items-center" onSubmit={handleSearchSubmit}>
          <div className="flex flex-1 bg-[#121212] border border-border rounded-full overflow-hidden">
            <input
              type="text"
              placeholder="Search"
              autoFocus
              className="flex-1 px-4 py-1.5 text-lg bg-transparent border-none outline-none text-white"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="submit" className="hidden lg:block bg-surface px-4 border-l border-border ">
              <svg viewBox="0 0 24 24" width="20" height="20" className="text-white">
                <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
              </svg>
            </button>
          </div>
        </form>
        <button className="bg-[#181818] aspect-square w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-hover ml-2">
          <svg viewBox="0 0 24 24" width="22" height="22" className="text-white">
            <path fill="currentColor" d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"></path>
            <path fill="currentColor" d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"></path>
          </svg>
        </button>
      </nav>
    );
  }

  return (
    <nav className="fixed top-0 left-0 right-0 h-navbar bg-bg flex items-center justify-between px-4 z-1000 border-b border-border">
      <div className="flex items-center gap-4">
        <button
          className="p-2 rounded-full hover:bg-surface-hover hidden lg:block"
          onClick={(e) => { onMenuClick(e); setSearchInput(''); setIsMobileSearchOpen(false); }}
        >
          <svg viewBox="0 0 24 24" width="24" height="24" className="text-white">
            <path fill="currentColor" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
          </svg>
        </button>
        <div className="flex items-center gap-1 cursor-pointer">
          <img src={Youtube_Logo} alt="YouTube Logo" className="h-6" />
          <span className="text-white font-bold text-xl tracking-tighter font-outfit">ChaiTube</span>
        </div>
      </div>

      <form
        className="flex-1 max-w-[720px] hidden md:flex justify-center"
        onSubmit={handleSearchSubmit}
      >
        <div className="flex items-center gap-3 w-full">
          <div className="flex flex-1 bg-[#121212] border border-border rounded-full overflow-hidden ml-8">
            <input
              type="text"
              placeholder="Search"
              className="flex-1 px-4 py-2 text-lg bg-transparent border-none outline-none text-white"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button
              type="submit"
              className="bg-surface px-5 border-l border-border hover:bg-neutral-800 rounded-none"
            >
              <svg viewBox="0 0 24 24" width="24" height="24" className="text-white">
                <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
              </svg>
            </button>
          </div>
          <button type="button" className="bg-[#181818] w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-hover">
            <svg viewBox="0 0 24 24" width="24" height="24" className="text-white">
              <path fill="currentColor" d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"></path>
              <path fill="currentColor" d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"></path>
            </svg>
          </button>
        </div>
      </form>

      <div className="flex items-center gap-1">
        <button 
          onClick={() => setIsMobileSearchOpen(true)}
          className="p-2 rounded-full hover:bg-surface-hover md:hidden"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" className="text-white">
            <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
          </svg>
        </button>

        {user ? (
          <div className="flex items-center gap-2">
            <div className="items-center gap-4 hidden md:hidden">
              {/* create video */}
              <button className="p-2 rounded-full hover:bg-surface-hover hidden sm:flex">
                <svg viewBox="0 0 24 24" width="24" height="24" className="text-white">
                  <path fill="currentColor" d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"></path>
                </svg>
              </button>

              {/* notifications */}
              <button className="p-2 rounded-full hover:bg-surface-hover hidden sm:flex">
                <svg viewBox="0 0 24 24" width="24" height="24" className="text-white">
                  <path fill="currentColor" d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"></path>
                </svg>
              </button>
            </div>

            <div className="relative hidden lg:block">
              <div 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-8 h-8 rounded-full bg-surface-hover flex items-center justify-center cursor-pointer border border-border overflow-hidden active:scale-95 transition-transform"
              >
                <img 
                  src={user.avatar?.url || `https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`} 
                  alt={user.username} 
                  className="w-full h-full object-cover"
                />
              </div>

              {isProfileOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsProfileOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-48 bg-surface border border-border rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-4 border-b border-border bg-[#181818]">
                      <p className="text-sm font-medium text-text-primary truncate">{user.username}</p>
                      <p className="text-xs text-text-secondary truncate">{user.email}</p>
                    </div>
                    <button 
                      onClick={() => {
                        setIsAvatarModalOpen(true);
                        setIsProfileOpen(false);
                      }}
                      className="w-full px-4 py-3 text-left text-sm text-text-primary hover:bg-surface-hover transition-colors flex items-center gap-3 border-b border-border"
                    >
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                      Change Avatar
                    </button>
                    <button 
                      onClick={() => {
                        logout();
                        setIsProfileOpen(false);
                      }}
                      className="w-full px-4 py-3 text-left text-sm text-text-primary hover:bg-surface-hover transition-colors flex items-center gap-3"
                    >
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                        <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
                      </svg>
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          <button 
            onClick={() => setIsAuthModalOpen(true)}
            className="hidden lg:flex items-center gap-2 px-4 py-1.5 border border-border rounded-full text-accent font-medium hover:bg-accent/10 transition-colors"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
            </svg>
            <span className="hidden sm:inline">Sign In</span>
          </button>
        )}
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
      
      <AvatarModal 
        isOpen={isAvatarModalOpen} 
        onClose={() => setIsAvatarModalOpen(false)} 
      />
    </nav>
  );
};

export default Navbar;
