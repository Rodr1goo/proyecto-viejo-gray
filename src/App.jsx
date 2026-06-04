import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Componente Layout que encapsula toda el área protegida/privada
import AdminLayout from './components/layout/AdminLayout';

// Landing Page Pública (Fachada para los estudiantes / consigna)
import LandingPage from './pages/LandingPage';

// Páginas de Administración (De uso exclusivo interno)
import Dashboard from './pages/Dashboard';
import GestionPedidosPage from './pages/GestionPedidosPage';
import ControlDeStock from './pages/ControlDeStock';
import ListaPreciosPage from './pages/ListaPreciosPage';
import FormularioAbmPage from './pages/FormularioAbmPage';
import FormularioPedidoPage from './pages/FormularioPedidoPage';

export default function App() {
  return (
    // <Router> habilita el manejo de URLs dinámicas sin recargar la página (SPA)
    <Router>
      <Routes>
        
        {/* =========================================
            ZONA PÚBLICA (Sin protección ni layouts laterales)
            ========================================= */}
        {/* La ruta raíz "/" muestra directamente la Landing Page. Es la vidriera pública. */}
        <Route path="/" element={<LandingPage />} />
        
        {/* =========================================
            ZONA DE ADMINISTRACIÓN (Protegida conceptualmente bajo /admin)
            ========================================= */}
        {/* Al entrar a "/admin", se renderiza el <AdminLayout />. 
            Todas las rutas anidadas adentro se renderizarán en el hueco (Outlet) del Layout. */}
        <Route path="/admin" element={<AdminLayout />}>
          
          {/* "index" significa que esta es la ruta por defecto cuando se entra a /admin */}
          <Route index element={<Dashboard />} />
          
          {/* Rutas de módulos administrativos (ej. /admin/orders) */}
          <Route path="orders" element={<GestionPedidosPage />} />
          <Route path="orders/new" element={<FormularioPedidoPage />} />
          
          {/* Módulo de Inventario (Listado, Alta y Edición) */}
          <Route path="inventory" element={<ControlDeStock />} />
          <Route path="inventory/new" element={<FormularioAbmPage />} />
          <Route path="inventory/edit/:id" element={<FormularioAbmPage />} />
          
          {/* Módulo de Precios (Listado, Alta y Edición) */}
          <Route path="prices" element={<ListaPreciosPage />} />
          <Route path="prices/new" element={<FormularioAbmPage />} />
          <Route path="prices/edit/:id" element={<FormularioAbmPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
