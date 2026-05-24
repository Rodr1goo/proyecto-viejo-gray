import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importación de Componentes de Layout (Contenedor Maestro)
import HeaderComponent from './components/layout/HeaderComponent';
import SidebarComponent from './components/layout/SidebarComponent';

// Importación de Páginas (Vistas Inteligentes)
import Dashboard from './pages/Dashboard';
import GestionPedidosPage from './pages/GestionPedidosPage';
import ControlDeStock from './pages/ControlDeStock';
import ListaPreciosPage from './pages/ListaPreciosPage';
import FormularioAbmPage from './pages/FormularioAbmPage';

export default function App() {
  // Estado local para controlar si la barra lateral está abierta en dispositivos móviles
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    // <Router> envuelve toda la aplicación para habilitar la navegación SPA (Single Page Application)
    <Router>
      <div className="flex h-screen font-sans text-slate-800 overflow-hidden">
        
        {/* SIDEBAR: Componente de navegación lateral. Se pasa el estado para poder abrirlo/cerrarlo */}
        <SidebarComponent isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
        {/* CONTENEDOR PRINCIPAL: Ocupa el resto del ancho de la pantalla */}
        <div className="flex-1 flex flex-col md:ml-64 overflow-hidden relative">
          
          {/* HEADER: Barra superior fija. Recibe la función para alternar la visibilidad del Sidebar */}
          <HeaderComponent toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
          
          {/* ZONA DE CONTENIDO DINÁMICO: Aquí es donde React Router inyectará las páginas según la URL */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 custom-scrollbar">
            <div className="max-w-7xl mx-auto h-full">
              
              {/* <Routes> define el mapeo entre una URL y el componente que debe renderizarse */}
              <Routes>
                {/* Rutas Estáticas Básicas */}
                <Route path="/" element={<Dashboard />} />
                <Route path="/orders" element={<GestionPedidosPage />} />
                
                {/* Rutas de INVENTARIO (Control de Stock) */}
                <Route path="/inventory" element={<ControlDeStock />} />
                
                {/* Rutas Dinámicas de INVENTARIO (URL Params) para preparar el ABM */}
                {/* 'new' es una ruta estática anidada lógicamente, 'edit/:id' es estrictamente dinámica */}
                <Route path="/inventory/new" element={<FormularioAbmPage />} />
                <Route path="/inventory/edit/:id" element={<FormularioAbmPage />} />
                
                {/* Rutas de PRECIOS */}
                <Route path="/prices" element={<ListaPreciosPage />} />
                
                {/* Rutas Dinámicas de PRECIOS (URL Params) para preparar el ABM */}
                <Route path="/prices/new" element={<FormularioAbmPage />} />
                <Route path="/prices/edit/:id" element={<FormularioAbmPage />} />
              </Routes>
              
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}
