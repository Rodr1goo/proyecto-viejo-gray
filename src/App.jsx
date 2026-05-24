import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HeaderComponent from './components/layout/HeaderComponent';
import SidebarComponent from './components/layout/SidebarComponent';

import Dashboard from './pages/Dashboard';
import GestionPedidosPage from './pages/GestionPedidosPage';
import ControlDeStock from './pages/ControlDeStock';
import ListaPreciosPage from './pages/ListaPreciosPage';
import FormularioAbmPage from './pages/FormularioAbmPage';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="flex h-screen font-sans text-slate-800 overflow-hidden">
        {/* Sidebar UI Global Reusable */}
        <SidebarComponent isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
        {/* Layout Container */}
        <div className="flex-1 flex flex-col md:ml-64 overflow-hidden relative">
          <HeaderComponent toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
          
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 custom-scrollbar">
            <div className="max-w-7xl mx-auto h-full">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/orders" element={<GestionPedidosPage />} />
                
                {/* Rutas con Parámetros (Requisito de la consigna) */}
                <Route path="/inventory" element={<ControlDeStock />} />
                <Route path="/inventory/new" element={<FormularioAbmPage />} />
                <Route path="/inventory/edit/:id" element={<FormularioAbmPage />} />
                
                <Route path="/prices" element={<ListaPreciosPage />} />
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
