import React from 'react';

// Componente atómico y global de UI: Botón estandarizado.
// Recibe 'children' (el texto o icono interno), 'onClick' (la función a ejecutar), 
// y 'variant' (estilo del botón, por defecto "primary").
export default function ActionButton({ children, onClick, variant = "primary", ...props }) {
  
  // Clases base compartidas por todos los botones (flexbox, padding, bordes redondeados y efectos focus)
  const baseClasses = "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-teal";
  
  // Diccionario de variantes para cambiar rápidamente los colores del botón en distintas páginas
  // sin tener que repetir el largo string de Tailwind en cada componente
  const variants = {
    primary: "bg-brand-teal hover:bg-brand-tealHover text-white",
    secondary: "bg-slate-100 hover:bg-slate-200 text-slate-700",
    icon: "p-2 text-slate-400 hover:text-brand-teal hover:bg-slate-50" // Usado típicamente para los lapicitos de editar
  };

  return (
    // Se concatenan dinámicamente las clases base con las clases correspondientes a la variante elegida
    <button 
      onClick={onClick} 
      className={`${baseClasses} ${variants[variant]} disabled:opacity-50 disabled:cursor-not-allowed`}
      {...props}
    >
      {children}
    </button>
  );
}
