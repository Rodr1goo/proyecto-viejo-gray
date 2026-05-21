import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import Layout from './components/Layout';

// =====================================================================
// ESTRUCTURA DE CARPETAS (Páginas / Módulos)
// =====================================================================
// Siguiendo el estándar, agrupamos cada "pantalla" completa en la carpeta
// /src/pages/. Cada subcarpeta representa un módulo de la aplicación.
import Dashboard from './pages/dashboard/Dashboard';
import Orders from './pages/orders/Orders';
import Inventory from './pages/inventory/Inventory';
import Prices from './pages/prices/Prices';

// =====================================================================
// COMPONENTE DE FORMULARIO (Ejemplo de Crear vs Editar)
// =====================================================================
// Este componente demuestra cómo manejar la creación y edición usando 
// la misma vista, apoyándonos en los parámetros de la URL.
const InventoryForm = () => {
  // useParams() es un hook de React Router que nos permite leer los 
  // parámetros dinámicos que definimos en la URL (los que llevan dos puntos ':').
  // En nuestro caso, la ruta es '/edit/:id', por lo que aquí extraemos ese 'id'.
  const { id } = useParams();
  
  // Convertimos 'id' a un valor booleano. 
  // - Si 'id' existe (ej. estamos en /edit/123), isEditing será true.
  // - Si 'id' es undefined (ej. estamos en /new), isEditing será false.
  const isEditing = !!id; 

  // NOTA PARA LA INTEGRACIÓN (Próximos pasos): 
  // Aquí luego agregaríamos un useEffect que, si isEditing es true, 
  // vaya a Supabase a buscar los datos del insumo con ese 'id' 
  // para rellenar los inputs del formulario.

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mt-4">
      <h2 className="text-xl font-bold text-slate-800 mb-4">
        {/* Título dinámico dependiendo de la acción detectada por la URL */}
        {isEditing ? `Editando Insumo ID: ${id}` : 'Crear Nuevo Insumo'}
      </h2>
      <p className="text-slate-500">
        Aquí irá el formulario de carga. Fíjate cómo la URL determina si es una creación o edición.
      </p>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Dashboard */}
          <Route index element={<Dashboard />} />
          
          {/* Pedidos */}
          <Route path="orders" element={<Orders />} />
          
          {/* =====================================================================
              RUTAS ANIDADAS Y PARÁMETROS URL (Ejemplo Inventario)
              =====================================================================
              Agrupamos todas las rutas relacionadas al inventario bajo el path "inventory".
          */}
          <Route path="inventory">
            {/* Ruta base (/inventory): Muestra la tabla principal de stock */}
            <Route index element={<Inventory />} />
            
            {/* Ruta Crear (/inventory/new): Renderiza el formulario vacío */}
            <Route path="new" element={<InventoryForm />} /> 
            
            {/* Ruta Editar (/inventory/edit/123): El ':id' le dice a React Router 
                que esa parte de la URL es una variable dinámica que luego 
                atraparemos adentro del componente con useParams() */}
            <Route path="edit/:id" element={<InventoryForm />} /> 
          </Route>
          
          {/* Precios */}
          <Route path="prices" element={<Prices />} />
        </Route>
      </Routes>
    </Router>
  );
}
