import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  // Verificamos si existe la variable "isAdmin" en el almacenamiento local del navegador.
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  // Si no es administrador, lo redirigimos a la fuerza a la pantalla de login.
  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  // Si es administrador, le permitimos ver las rutas "hijas" (el Outlet en este caso).
  return <Outlet />;
}
