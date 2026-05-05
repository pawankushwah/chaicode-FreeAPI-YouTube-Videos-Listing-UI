import { useAuth } from '../context/AuthContext';

const MobileNav = ({ activeTab, onTabChange }) => {
  const { user } = useAuth();

  const navItems = [
    { id: 'home', icon: <path d="M4 21V10.08l8-6.91 8 6.91V21h-6v-6h-4v6H4z"/>, label: 'Home' },
    { id: 'shorts', icon: <path d="M10 14.65v-5.3L15 12l-5 2.65zM12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 18c4.41 0 8-3.59 8-8s-3.59-8-8-8-8 3.59-8 8 3.59 8 8 8z"/>, label: 'Shorts' },
    { id: 'subs', icon: <path d="M10 18v-6l5 3-5 3zm7-15H7v1h10V3zm3 3H4v1h16V6zm2 3H2v12h20V9zM3 10h18v10H3V10z"/>, label: 'Subscriptions' },
    { id: 'you', label: 'You' },
  ];

  return (
    <nav className="fixed  lg:hidden bottom-0 left-0 right-0 bg-bg border-t border-border flex justify-around items-center h-16 z-[2000] shadow-[0_-4px_10px_rgba(0,0,0,0.5)]">
      {navItems.map((item) => (
        <div 
          key={item.id} 
          onClick={() => onTabChange(item.id)}
          className={`flex flex-col items-center justify-center gap-1 cursor-pointer w-full h-full transition-colors ${activeTab === item.id ? 'text-white' : 'text-text-secondary hover:text-white'}`}
        >
          {item.id === 'you' ? (
            <div className={`w-6 h-6 rounded-full overflow-hidden flex items-center justify-center border ${activeTab === 'you' ? 'border-white' : 'border-transparent'}`}>
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
          ) : (
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              {item.icon}
            </svg>
          )}
          <span className="text-[10px]">{item.label}</span>
        </div>
      ))}
    </nav>
  );
};

export default MobileNav;
