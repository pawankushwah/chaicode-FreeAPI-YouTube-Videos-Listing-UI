import React from 'react';

const Sidebar = ({ isOpen }) => {
  const menuItems = [
    { icon: <path d="M4 21V10.08l8-6.91 8 6.91V21h-6v-6h-4v6H4z"/>, label: 'Home', active: true },
    { icon: <path d="M10 14.65v-5.3L15 12l-5 2.65zM12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 18c4.41 0 8-3.59 8-8s-3.59-8-8-8-8 3.59-8 8 3.59 8 8 8z"/>, label: 'Shorts' },
    { icon: <path d="M10 18v-6l5 3-5 3zm7-15H7v1h10V3zm3 3H4v1h16V6zm2 3H2v12h20V9zM3 10h18v10H3V10z"/>, label: 'Subscriptions' },
  ];

  const secondaryItems = [
    { icon: <path d="M11 7l-5 5 5 5V7zM13 17l5-5-5-5v10z"/>, label: 'Library' },
    { icon: <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>, label: 'History' },
  ];

  return (
    <aside className={`${isOpen ? 'w-sidebar' : 'w-sidebar-collapsed'} h-[calc(100vh-var(--height-navbar))] bg-bg py-3 overflow-y-auto sticky top-(--height-navbar) hidden lg:block transition-all duration-300`}>
      <div className="px-3">
        {menuItems.map((item, index) => (
          <div 
            key={index} 
            className={`flex ${isOpen ? 'flex-row gap-6 px-3' : 'flex-col items-center justify-center gap-1 px-1'} py-2.5 rounded-xl cursor-pointer transition-colors ${item.active ? 'bg-surface-hover font-medium' : 'hover:bg-surface-hover'} mb-1`}
            title={!isOpen ? item.label : ''}
          >
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" className="shrink-0">
              {item.icon}
            </svg>
            <span className={`${isOpen ? 'text-sm' : 'hidden'}`}>{item.label}</span>
          </div>
        ))}
      </div>
      
      {isOpen && <hr className="border-none border-t border-border my-3 mx-3" />}
      
      <div className="px-3">
        {secondaryItems.map((item, index) => (
          <div 
            key={index} 
            className={`flex ${isOpen ? 'flex-row gap-6 px-3' : 'flex-col items-center justify-center gap-1 px-1'} py-2.5 rounded-xl cursor-pointer transition-colors hover:bg-surface-hover`}
            title={!isOpen ? item.label : ''}
          >
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" className="shrink-0">
              {item.icon}
            </svg>
            <span className={`${isOpen ? 'text-sm' : 'hidden'}`}>{item.label}</span>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
