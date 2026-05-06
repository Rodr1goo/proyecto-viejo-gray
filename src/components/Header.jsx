import React from 'react';
import { Menu, Bell, User } from 'lucide-react';

export default function Header({ toggleSidebar }) {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 z-10 sticky top-0 shadow-sm shadow-slate-100/50">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="md:hidden p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-semibold text-brand-text hidden sm:block tracking-tight">Panel de Control</h2>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand-teal/50">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="h-8 w-px bg-slate-200 mx-1"></div>
        
        <button className="flex items-center gap-2.5 hover:bg-slate-50 p-1.5 pr-3 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-brand-teal/50">
          <div className="w-8 h-8 rounded-full bg-brand-teal/10 text-brand-teal flex items-center justify-center border border-brand-teal/20">
            <User className="w-4 h-4" />
          </div>
          <div className="hidden md:flex flex-col items-start">
            <p className="text-sm font-semibold text-brand-text leading-none">Admin User</p>
            <p className="text-xs text-brand-muted mt-1 font-medium">Administrador</p>
          </div>
        </button>
      </div>
    </header>
  );
}
