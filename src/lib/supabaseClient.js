import { createClient } from '@supabase/supabase-js';

// Usamos import.meta.env porque estamos en Vite (no process.env como en Create React App o Node.js puro)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Verificación de seguridad: Avisa en consola si olvidaste configurar las variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "⚠️ Faltan las credenciales de Supabase. " +
    "Asegúrate de copiar tu URL y ANON KEY en el archivo .env.local"
  );
}

// Inicializa y exporta el cliente de Supabase como un "Singleton"
// Esto significa que toda la app compartirá esta única conexión en lugar de crear una nueva en cada página.
export const supabase = createClient(
  supabaseUrl || 'https://tu-proyecto.supabase.co', 
  supabaseAnonKey || 'tu-anon-key'
);
