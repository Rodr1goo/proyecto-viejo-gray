import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Loader2, ArrowLeft } from 'lucide-react';
import InputField from '../components/ui/InputField';
import ActionButton from '../components/ui/ActionButton';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulamos un retraso de red para que se vea real
    setTimeout(() => {
      // Login hardcoded súper sencillo como se pidió
      if (email === 'admin@elviejogray.com' && password === 'admin123') {
        localStorage.setItem('isAdmin', 'true'); // Guardamos la sesión
        navigate('/admin'); // Entramos al sistema
      } else {
        setError('Credenciales incorrectas. Acceso denegado.');
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center p-4">
      
      <button 
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors font-medium"
      >
        <ArrowLeft className="w-4 h-4" /> Volver a la Landing
      </button>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-slate-900 p-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-brand-teal flex items-center justify-center text-white font-black text-2xl shadow-lg mx-auto mb-4">
            VG
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">Acceso Restringido</h2>
          <p className="text-slate-400 text-sm">Panel de Administración de El Viejo Gray</p>
        </div>
        
        <form onSubmit={handleLogin} className="p-8 space-y-6">
          
          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-600 px-4 py-3 rounded-lg text-sm font-medium text-center">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Correo Electrónico</label>
            <InputField 
              type="email"
              placeholder="ejemplo@elviejogray.com"
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Contraseña</label>
            <InputField 
              type="password"
              placeholder="••••••••"
              icon={Lock}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <ActionButton type="submit" className="w-full justify-center h-12" disabled={isLoading}>
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Iniciar Sesión"}
          </ActionButton>
          
        </form>
      </div>
    </div>
  );
}
