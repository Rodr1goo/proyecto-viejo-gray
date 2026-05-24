import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ActionButton from '../components/ui/ActionButton';

export default function FormularioAbmPage() {
  // useParams() cumple exactamente con la consigna del profesor de usar rutas dinámicas
  const { id } = useParams();
  const navigate = useNavigate();
  
  const isEditing = Boolean(id);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-8 text-center max-w-2xl mx-auto mt-10 shadow-sm">
      <h1 className="text-3xl font-bold text-slate-800 mb-4">
        {isEditing ? `Vista de Edición (ID: ${id})` : 'Vista de Creación (Nuevo)'}
      </h1>
      <p className="text-slate-500 mb-8 leading-relaxed">
        El enrutador ha detectado correctamente la acción. Aquí integraremos el formulario y la conexión con Supabase.
      </p>
      
      <div className="flex justify-center">
        <ActionButton onClick={() => navigate(-1)} variant="secondary">
          Volver a la vista anterior
        </ActionButton>
      </div>
    </div>
  );
}
