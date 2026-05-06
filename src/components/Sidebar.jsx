import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, ClipboardList, DollarSign, LogOut } from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { name: 'Resumen', path: '/', icon: LayoutDashboard },
  { name: 'Gestión de Pedidos', path: '/orders', icon: ClipboardList },
  { name: 'Control de Stock', path: '/inventory', icon: Package },
  { name: 'Lista de Precios', path: '/prices', icon: DollarSign },
];

export default function Sidebar({ isOpen, setIsOpen }) {
  return (
    <>
      {/* Overlay para móviles/tablets cuando está abierto */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-20 md:hidden backdrop-blur-sm transition-opacity" 
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <aside className={clsx(
        "fixed top-0 left-0 h-screen w-64 bg-brand-dark text-slate-300 flex flex-col transition-transform duration-300 z-30 shadow-xl",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        {/* Logo Area */}
        <div className="h-16 flex items-center justify-center border-b border-slate-800/50 px-4">
          <div className="flex items-center gap-3 text-white font-bold text-lg tracking-wide w-full">
            <span className="w-8 h-8 rounded bg-brand-teal flex items-center justify-center shadow-sm shadow-brand-teal/20 text-white font-black">
              VG
            </span>
            <span className="truncate">El Viejo Gray</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3 space-y-1.5 overflow-y-auto">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-3">
            Navegación
          </div>
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => clsx(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group font-medium text-sm",
                isActive 
                  ? "bg-slate-800 text-white" 
                  : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-100"
              )}
            >
              <item.icon className={clsx("w-5 h-5", "transition-colors")} />
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* User / Logout */}
        <div className="p-4 border-t border-slate-800/50 flex items-center gap-3 w-full">
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-white text-xs font-bold">
            A
          </div>
          <div className="flex flex-col flex-1">
            <span className="text-sm font-semibold text-white">Admin</span>
            <span className="text-xs text-slate-400">Administrador</span>
          </div>
        </div>
      </aside>
    </>
  );
}
