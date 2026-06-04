import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import HeaderComponent from './HeaderComponent';
import SidebarComponent from './SidebarComponent';

// Este Layout es exclusivo para la zona de administración (/admin).
// Permite mantener fijos el Sidebar (menú lateral) y el Header (barra superior)
// mientras la vista interna (Outlet) cambia dinámicamente según la URL.
export default function AdminLayout() {
  // Estado para controlar la visibilidad del menú lateral en dispositivos móviles
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    // Contenedor principal que ocupa el 100% de la pantalla, sin scroll global (overflow-hidden)
    <div className="flex h-screen font-sans text-slate-800 overflow-hidden bg-slate-50">
      
      {/* SIDEBAR: Menú de navegación lateral */}
      <SidebarComponent isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* SECCIÓN DERECHA: Ocupa todo el espacio restante (flex-1) */}
      <div className="flex-1 flex flex-col md:ml-64 overflow-hidden relative">
        
        {/* HEADER: Barra superior fija con el Avatar y el botón hamburguesa */}
        <HeaderComponent toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        {/* CONTENEDOR DINÁMICO: Aquí es donde se "inyectan" las páginas (Dashboard, Inventario, etc.) */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto h-full">
            {/* <Outlet /> es el "agujero" de React Router donde se renderizan las rutas anidadas en App.jsx */}
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
