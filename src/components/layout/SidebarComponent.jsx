import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, ClipboardList, DollarSign } from 'lucide-react';
import clsx from 'clsx';

// Definimos la configuración de las rutas de navegación lateral
// Esto permite escalar fácilmente: si queremos agregar una ruta, solo la sumamos a este array.
const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Pedidos', path: '/orders', icon: ClipboardList },
  { name: 'Inventario', path: '/inventory', icon: Package },
  { name: 'Lista de Precios', path: '/prices', icon: DollarSign },
];

export default function SidebarComponent({ isOpen, setIsOpen }) {
  return (
    <>
      {/* OVERLAY PARA MÓVILES: Fondo oscuro que aparece cuando el menú lateral está abierto en pantallas pequeñas.
          Al hacer clic en él, se cierra el menú (setIsOpen(false)). */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-20 md:hidden backdrop-blur-sm transition-opacity" 
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* MENÚ LATERAL PRINCIPAL:
          Usamos clsx (una utilidad recomendada) para agregar clases de Tailwind dinámicamente.
          En escritorio (md:), el menú siempre se muestra (-translate-x-0). */}
      <aside className={clsx(
        "fixed top-0 left-0 h-screen w-64 bg-slate-900 text-slate-300 flex flex-col transition-transform duration-300 z-30 shadow-xl",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        
        {/* CABECERA DEL SIDEBAR (Logo y Nombre del sistema) */}
        <div className="h-16 flex items-center justify-center border-b border-slate-800/50 px-4">
          <div className="flex items-center gap-3 text-white font-bold text-lg tracking-wide w-full">
            <span className="w-8 h-8 rounded bg-brand-teal flex items-center justify-center shadow-sm shadow-brand-teal/20 text-white font-black">VG</span>
            <span className="truncate">El Viejo Gray</span>
          </div>
        </div>

        {/* LISTA DE ENLACES DE NAVEGACIÓN */}
        <nav className="flex-1 py-6 px-3 space-y-1.5 overflow-y-auto">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-3">Navegación</div>
          
          {/* Iteramos el array navItems para generar dinámicamente cada enlace del menú. */}
          {navItems.map((item) => (
            // NavLink (componente de React Router DOM) inyecta la propiedad 'isActive' en su className.
            // Esto permite cambiar visualmente el botón seleccionado para mostrar al usuario dónde está parado.
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)} // Acción: Cierra el menú en móviles al hacer clic en un link
              className={({ isActive }) => clsx(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group font-medium text-sm",
                // Si la ruta actual coincide con este link, pinta el fondo oscuro, sino, lo deja transparente.
                isActive ? "bg-slate-800 text-white" : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-100"
              )}
            >
              <item.icon className="w-5 h-5 transition-colors" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
