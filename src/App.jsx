import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Componentes de Layout y Seguridad
import AdminLayout from './components/layout/AdminLayout';
import ProtectedRoute from './components/layout/ProtectedRoute';

// Páginas Públicas
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';

// Páginas de Administración
import Dashboard from './pages/Dashboard';
import GestionPedidosPage from './pages/GestionPedidosPage';
import ControlDeStock from './pages/ControlDeStock';
import ListaPreciosPage from './pages/ListaPreciosPage';
import FormularioAbmPage from './pages/FormularioAbmPage';
import FormularioPedidoPage from './pages/FormularioPedidoPage';

// Árbol de Objetos de React Router v6.4+
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    // Esta ruta está protegida por nuestro "Guardián" (ProtectedRoute)
    path: "/admin",
    element: <ProtectedRoute />, 
    children: [
      {
        // El AdminLayout envuelve todo lo que esté bajo /admin (Sidebar, Navbar)
        element: <AdminLayout />,
        children: [
          {
            index: true, 
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
        ]
      }
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
