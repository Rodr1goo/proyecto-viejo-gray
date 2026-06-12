import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Componente Layout que encapsula toda el área protegida/privada
import AdminLayout from './components/layout/AdminLayout';

// Landing Page Pública
import LandingPage from './pages/LandingPage';

// Páginas de Administración
import Dashboard from './pages/Dashboard';
import GestionPedidosPage from './pages/GestionPedidosPage';
import ControlDeStock from './pages/ControlDeStock';
import ListaPreciosPage from './pages/ListaPreciosPage';
import FormularioAbmPage from './pages/FormularioAbmPage';
import FormularioPedidoPage from './pages/FormularioPedidoPage';

// El profesor tiene razón: esta es la forma moderna de React Router (v6.4+)
// Consiste en definir las rutas como un "Árbol de Objetos"
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/admin",
    element: <AdminLayout />, // Layout envolvente
    children: [
      {
        index: true, // Ruta por defecto para /admin
        element: <Dashboard />,
      },
      // Módulo de Pedidos
      {
        path: "orders",
        element: <GestionPedidosPage />,
      },
      {
        path: "orders/new",
        element: <FormularioPedidoPage />,
      },
      // Módulo de Inventario
      {
        path: "inventory",
        element: <ControlDeStock />,
      },
      {
        path: "inventory/new",
        element: <FormularioAbmPage />,
      },
      {
        path: "inventory/edit/:id",
        element: <FormularioAbmPage />,
      },
      // Módulo de Precios
      {
        path: "prices",
        element: <ListaPreciosPage />,
      },
      {
        path: "prices/new",
        element: <FormularioAbmPage />,
      },
      {
        path: "prices/edit/:id",
        element: <FormularioAbmPage />,
      },
    ],
  },
]);

export default function App() {
  // Ahora el componente App simplemente provee el objeto router
  return <RouterProvider router={router} />;
}
