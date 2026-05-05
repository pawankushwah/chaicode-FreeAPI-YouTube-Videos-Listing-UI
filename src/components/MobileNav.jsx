import { useAuth } from '../context/AuthContext';

const MobileNav = ({ activeTab, onTabChange }) => {
  const { user } = useAuth();

  const navItems = [
    { id: 'home', icon: <path d="M4 21V10.08l8-6.91 8 6.91V21h-6v-6h-4v6H4z"/>, label: 'Home' },
    { id: 'products', icon: <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>, label: 'Products' },
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
