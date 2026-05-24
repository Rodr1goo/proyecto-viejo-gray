import React from 'react';

// Componente visual puro para mostrar el estado de un pedido o nivel de insumo.
// Su única responsabilidad es recibir el texto del estado y decidir de qué color pintarse.
export default function StatusBadge({ status }) {
  let colorClass = "bg-slate-100 text-slate-600"; // Color por defecto (Gris neutral)

  // Evaluamos la propiedad 'status' para asignar colores semánticos de Tailwind
  switch (status?.toUpperCase()) {
    case 'PENDIENTE':
      colorClass = "bg-amber-500 text-white"; // Naranja para denotar espera
      break;
    case 'EN PROCESO':
      colorClass = "bg-brand-teal text-white"; // Color de la marca (Teal) para trabajos en curso
      break;
    case 'ENTREGADO':
    case 'OK':
      colorClass = "bg-emerald-100 text-emerald-700 border border-emerald-200"; // Verde claro para finalizar
      break;
    case 'BAJO STOCK':
      colorClass = "bg-rose-600 text-white"; // Rojo fuerte para alertas de stock
      break;
    case 'LISTO PARA RETIRAR':
      colorClass = "bg-green-600 text-white"; 
      break;
  }

  return (
    // Las clases 'inline-block' y 'whitespace-nowrap' son críticas aquí.
    // Previenen el "efecto escalera" o que el texto se rompa en dos renglones cortando el color del fondo
    // en pantallas reducidas o celdas estrechas.
    <span className={`inline-block whitespace-nowrap px-2.5 py-1 rounded text-[11px] font-semibold ${colorClass}`}>
      {status}
    </span>
  );
}
