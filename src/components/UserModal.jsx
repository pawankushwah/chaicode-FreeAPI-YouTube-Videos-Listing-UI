import React from 'react';
import { X, Mail, MapPin, Phone, Calendar, User, ShieldCheck, Smartphone, Globe } from 'lucide-react';

const UserModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 md:p-10">
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-4xl bg-surface border border-border rounded-[3rem] overflow-hidden max-h-[90vh] flex flex-col md:flex-row animate-in zoom-in-95 duration-500 shadow-2xl">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-3 bg-black/40 backdrop-blur-md text-white rounded-full hover:bg-brand transition-colors"
        >
          <X size={24} />
        </button>

        {/* Left Side: Identity Header */}
        <div className="md:w-5/12 relative overflow-hidden bg-brand/5 border-r border-border flex flex-col items-center justify-center p-12 text-center">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute top-0 left-0 w-32 h-32 bg-brand rounded-full blur-3xl -ml-16 -mt-16" />
             <div className="absolute bottom-0 right-0 w-32 h-32 bg-brand rounded-full blur-3xl -mr-16 -mb-16" />
          </div>

          <div className="relative z-10 mb-8">
            <div className="w-40 h-40 rounded-full border-8 border-surface p-1 shadow-2xl relative">
              <img 
                src={user.picture.large} 
                alt={user.name.first} 
                className="w-full h-full rounded-full object-cover"
              />
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-brand rounded-full flex items-center justify-center text-white border-8 border-surface text-sm font-black uppercase">
                {user.nat}
              </div>
            </div>
          </div>

          <div className="relative z-10 space-y-2">
            <h2 className="text-4xl font-black text-text-primary tracking-tight">
              {user.name.first} <span className="text-brand">{user.name.last}</span>
            </h2>
            <p className="text-text-secondary font-medium tracking-wide">@{user.login.username}</p>
          </div>

          <div className="mt-10 flex flex-col gap-3 w-full">
            <div className="px-6 py-3 bg-surface border border-border rounded-2xl flex items-center justify-between">
              <span className="text-[10px] text-text-secondary uppercase font-black tracking-widest">Gender</span>
              <span className="text-sm font-bold text-text-primary capitalize">{user.gender}</span>
            </div>
            <div className="px-6 py-3 bg-surface border border-border rounded-2xl flex items-center justify-between">
              <span className="text-[10px] text-text-secondary uppercase font-black tracking-widest">Nationality</span>
              <span className="text-sm font-bold text-text-primary">{user.nat} (International)</span>
            </div>
          </div>
        </div>

        {/* Right Side: Detailed Info */}
        <div className="md:w-7/12 overflow-y-auto p-8 md:p-12 bg-surface">
          <div className="space-y-12">
            {/* Contact Info */}
            <section>
              <div className="flex items-center gap-3 text-brand mb-8">
                <ShieldCheck size={24} />
                <h3 className="text-xl font-black uppercase tracking-tight">Personal Verification</h3>
              </div>
              <div className="grid grid-cols-1 gap-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-brand/10 rounded-xl text-brand">
                    <Mail size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] text-text-secondary uppercase font-black tracking-widest block mb-1">Email Address</span>
                    <p className="text-lg font-bold text-text-primary">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-brand/10 rounded-xl text-brand">
                    <Smartphone size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] text-text-secondary uppercase font-black tracking-widest block mb-1">Contact Number</span>
                    <p className="text-lg font-bold text-text-primary">{user.cell} / {user.phone}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Location */}
            <section>
              <div className="flex items-center gap-3 text-brand mb-8">
                <MapPin size={24} />
                <h3 className="text-xl font-black uppercase tracking-tight">Location Details</h3>
              </div>
              <div className="p-8 bg-surface-hover border border-border rounded-[2rem] space-y-6">
                <div>
                   <span className="text-[10px] text-text-secondary uppercase font-black tracking-widest block mb-2">Primary Residence</span>
                   <p className="text-xl font-bold text-text-primary">
                    {user.location.street.number} {user.location.street.name}, {user.location.city}
                   </p>
                </div>
                <div className="flex gap-10">
                   <div>
                      <span className="text-[10px] text-text-secondary uppercase font-black tracking-widest block mb-1">State</span>
                      <p className="font-bold text-text-primary">{user.location.state}</p>
                   </div>
                   <div>
                      <span className="text-[10px] text-text-secondary uppercase font-black tracking-widest block mb-1">Country</span>
                      <p className="font-bold text-text-primary">{user.location.country}</p>
                   </div>
                   <div>
                      <span className="text-[10px] text-text-secondary uppercase font-black tracking-widest block mb-1">Postcode</span>
                      <p className="font-bold text-text-primary">{user.location.postcode}</p>
                   </div>
                </div>
              </div>
            </section>

            {/* Birth & Registration */}
            <section className="grid grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-2 text-brand mb-4">
                  <Calendar size={18} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Date of Birth</span>
                </div>
                <p className="text-lg font-bold text-text-primary">
                  {new Date(user.dob.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <p className="text-sm text-text-secondary">{user.dob.age} Years Old</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-brand mb-4">
                  <ShieldCheck size={18} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Registered Since</span>
                </div>
                <p className="text-lg font-bold text-text-primary">
                  {new Date(user.registered.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <p className="text-sm text-text-secondary">{user.registered.age} Years Ago</p>
              </div>
            </section>

            <div className="pt-6 border-t border-border flex justify-between items-center">
              <div className="flex items-center gap-2 text-[10px] text-text-secondary uppercase font-black tracking-widest">
                <Globe size={14} />
                UUID: {user.login.uuid.substring(0, 8)}...
              </div>
              <button 
                onClick={onClose}
                className="px-8 py-3 bg-brand text-white rounded-xl font-bold hover:scale-105 transition-transform"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
