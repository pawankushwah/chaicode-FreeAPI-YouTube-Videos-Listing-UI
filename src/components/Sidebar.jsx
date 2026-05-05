import React from 'react';

const Sidebar = ({ isOpen, activeTab, onTabChange }) => {
  const menuItems = [
    { id: 'home', icon: <path d="M4 21V10.08l8-6.91 8 6.91V21h-6v-6h-4v6H4z"/>, label: 'Home' },
    { id: 'products', icon: <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>, label: 'Products' },
    { id: 'quotes', icon: <path d="M14 17h3.35l-1 3H14v-3zm-9 0h3.35l-1 3H5v-3zM11 7H4v10h7V7zm2 0h7v10h-7V7z"/>, label: 'Quotes' },
  ];

  const secondaryItems = [
    { id: 'library', icon: <path d="M11 7l-5 5 5 5V7zM13 17l5-5-5-5v10z"/>, label: 'Library' },
    { id: 'history', icon: <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>, label: 'History' },
  ];

  return (
    <aside className={`${isOpen ? 'w-sidebar' : 'w-sidebar-collapsed'} h-[calc(100vh-var(--height-navbar))] bg-bg py-3 overflow-y-auto sticky top-(--height-navbar) hidden lg:block transition-all duration-300`}>
      <div className="px-3">
        {menuItems.map((item) => (
          <div 
            key={item.id} 
            onClick={() => onTabChange(item.id)}
            className={`flex ${isOpen ? 'flex-row gap-6 px-3' : 'flex-col items-center justify-center gap-1 px-1'} py-2.5 rounded-xl cursor-pointer transition-colors ${activeTab === item.id ? 'bg-surface-hover font-medium' : 'hover:bg-surface-hover'} mb-1`}
            title={!isOpen ? item.label : ''}
          >
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" className={`shrink-0 ${activeTab === item.id ? 'text-white' : ''}`}>
              {item.icon}
            </svg>
            <span className={`${isOpen ? 'text-sm' : 'hidden'} ${activeTab === item.id ? 'text-white' : ''}`}>{item.label}</span>
          </div>
        ))}
      </div>
      
      {isOpen && <hr className="border-none border-t border-border my-3 mx-3" />}
      
      <div className="px-3">
        {secondaryItems.map((item) => (
          <div 
            key={item.id} 
            onClick={() => onTabChange(item.id)}
            className={`flex ${isOpen ? 'flex-row gap-6 px-3' : 'flex-col items-center justify-center gap-1 px-1'} py-2.5 rounded-xl cursor-pointer transition-colors ${activeTab === item.id ? 'bg-surface-hover font-medium' : 'hover:bg-surface-hover'} mb-1`}
            title={!isOpen ? item.label : ''}
          >
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" className={`shrink-0 ${activeTab === item.id ? 'text-white' : ''}`}>
              {item.icon}
            </svg>
            <span className={`${isOpen ? 'text-sm' : 'hidden'} ${activeTab === item.id ? 'text-white' : ''}`}>{item.label}</span>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
