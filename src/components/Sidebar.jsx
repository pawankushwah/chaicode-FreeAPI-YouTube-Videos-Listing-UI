import React from 'react';
import { Home, ShoppingBag, Quote, Laugh, Cat, Utensils, Users, Library, History } from 'lucide-react';

const Sidebar = ({ isOpen, activeTab, onTabChange }) => {
  const menuItems = [
    { id: 'home', icon: <Home size={24} />, label: 'Videos' },
    { id: 'products', icon: <ShoppingBag size={24} />, label: 'Products' },
    { id: 'quotes', icon: <Quote size={24} />, label: 'Quotes' },
    { id: 'jokes', icon: <Laugh size={24} />, label: 'Jokes' },
    { id: 'cats', icon: <Cat size={24} />, label: 'Cats' },
    { id: 'meals', icon: <Utensils size={24} />, label: 'Meals' },
    { id: 'users', icon: <Users size={24} />, label: 'Users' },
  ];

  const secondaryItems = [
    { id: 'library', icon: <Library size={24} />, label: 'Library' },
    { id: 'history', icon: <History size={24} />, label: 'History' },
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
            <div className={`shrink-0 ${activeTab === item.id ? 'text-brand' : 'text-text-secondary'}`}>
              {item.icon}
            </div>
            <span className={`${isOpen ? 'text-sm' : 'hidden'} ${activeTab === item.id ? 'text-white font-bold' : 'text-text-secondary'}`}>{item.label}</span>
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
            <div className={`shrink-0 ${activeTab === item.id ? 'text-brand' : 'text-text-secondary'}`}>
              {item.icon}
            </div>
            <span className={`${isOpen ? 'text-sm' : 'hidden'} ${activeTab === item.id ? 'text-white font-bold' : 'text-text-secondary'}`}>{item.label}</span>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
