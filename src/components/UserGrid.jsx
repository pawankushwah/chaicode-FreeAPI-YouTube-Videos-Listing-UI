import React, { useState, useEffect } from 'react';
import { User, Mail, MapPin, Phone, Calendar, ArrowRight, RefreshCw } from 'lucide-react';
import UserModal from './UserModal';

const UserCard = ({ user, onClick }) => {
  return (
    <div 
      onClick={() => onClick(user)}
      className="group bg-surface border border-border rounded-[2.5rem] p-8 hover:border-brand/50 transition-all duration-500 flex flex-col items-center text-center cursor-pointer hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-brand/5 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-700" />
      
      <div className="relative z-10 mb-6">
        <div className="w-24 h-24 rounded-full border-4 border-surface p-1 shadow-xl group-hover:scale-105 transition-transform duration-500">
          <img 
            src={user.picture.large} 
            alt={user.name.first} 
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-brand rounded-full flex items-center justify-center text-white border-4 border-surface text-[10px] font-black uppercase">
          {user.nat}
        </div>
      </div>

      <div className="relative z-10 space-y-2 mb-6">
        <h3 className="text-2xl font-black text-text-primary group-hover:text-brand transition-colors">
          {user.name.title}. {user.name.first} {user.name.last}
        </h3>
        <p className="text-sm font-medium text-text-secondary flex items-center justify-center gap-2">
          <Mail size={14} />
          {user.email}
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-2 gap-4 w-full pt-6 border-t border-border">
        <div className="flex flex-col items-center gap-1">
          <span className="text-[10px] text-text-secondary uppercase font-black tracking-widest">Age</span>
          <span className="text-sm font-bold text-text-primary">{user.dob.age} Years</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-[10px] text-text-secondary uppercase font-black tracking-widest">Location</span>
          <span className="text-sm font-bold text-text-primary truncate w-full px-2">{user.location.city}</span>
        </div>
      </div>

      <div className="mt-8 relative z-10 w-full">
         <div className="flex items-center justify-center gap-2 text-xs font-bold text-brand uppercase tracking-widest opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
            View Full Profile <ArrowRight size={14} />
         </div>
      </div>
    </div>
  );
};

const UserGrid = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    fetchUsers(1, false);
  }, []);

  const fetchUsers = async (pageNum, isAppend = false) => {
    try {
      if (isAppend) setLoadingMore(true);
      else setLoading(true);

      const response = await fetch(`https://api.freeapi.app/api/v1/public/randomusers?page=${pageNum}&limit=9`);
      const json = await response.json();

      if (json.success) {
        setUsers(prev => isAppend ? [...prev, ...json.data.data] : json.data.data);
        setHasMore(json.data.nextPage);
      } else {
        setError('Failed to fetch community');
      }
    } catch (err) {
      setError('Connection to the global directory failed.');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleShowMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchUsers(nextPage, true);
  };

  if (loading && page === 1) {
    return (
      <div className="p-6 md:p-10 max-w-7xl mx-auto">
        <div className="mb-12 h-20 w-64 bg-surface rounded-2xl animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-surface rounded-[2.5rem] h-96 animate-pulse border border-border" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto min-h-screen">
      <div className="mb-16 relative">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand/5 blur-3xl rounded-full" />
        <h1 className="text-4xl md:text-6xl font-black text-text-primary tracking-tight mb-4 relative z-10">
          Global <span className="text-brand">Directory</span>
        </h1>
        <p className="text-text-secondary text-lg md:text-xl max-w-2xl relative z-10">
          Connect with people from every corner of the world. A diverse community of creators, thinkers, and explorers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {users.map((user) => (
          <UserCard 
            key={`${user.login.uuid}-${Math.random()}`} 
            user={user} 
            onClick={setSelectedUser}
          />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-20 mb-12">
          <button
            onClick={handleShowMore}
            disabled={loadingMore}
            className="group relative px-10 py-4 bg-surface border border-border text-text-primary rounded-full font-bold hover:border-brand transition-all duration-300 disabled:opacity-50 overflow-hidden"
          >
            <div className="absolute inset-0 bg-brand/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            {loadingMore ? (
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-brand border-t-transparent rounded-full animate-spin" />
                <span>Searching profiles...</span>
              </div>
            ) : (
              <span className="flex items-center gap-3 relative z-10">
                <span>Meet More People</span>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="group-hover:translate-y-1 transition-transform duration-300">
                  <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/>
                </svg>
              </span>
            )}
          </button>
        </div>
      )}

      {selectedUser && (
        <UserModal 
          user={selectedUser} 
          onClose={() => setSelectedUser(null)} 
        />
      )}
    </div>
  );
};

export default UserGrid;
