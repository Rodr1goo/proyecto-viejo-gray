import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Printer, CheckCircle, ChevronDown } from 'lucide-react';
import StatCard from '../components/ui/StatCard';
import StatusBadge from '../components/ui/StatusBadge';
import ActionButton from '../components/ui/ActionButton';

export default function LandingPage() {
  return (
    // Contenedor principal de la página pública
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-brand-teal selection:text-white">
      
      {/* NAVEGACIÓN PÚBLICA (Sticky para que siempre esté visible al hacer scroll) */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded bg-brand-teal flex items-center justify-center text-white font-black text-sm shadow-md shadow-brand-teal/20">VG</span>
          <span className="font-bold text-xl tracking-tight text-slate-800">El Viejo Gray</span>
        </div>
        
        {/* Menú de anclajes (Links internos a las secciones de la misma página) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <a href="#servicios" className="hover:text-brand-teal transition-colors">Servicios</a>
          <a href="#faq" className="hover:text-brand-teal transition-colors">FAQ</a>
          <a href="#showcase" className="hover:text-brand-teal transition-colors">Componentes</a>
        </div>
        
        {/* BOTÓN CRÍTICO: Este enlace dirige a los administradores a la ruta privada (/admin).
            En el futuro, interceptaremos esta ruta con una pantalla de Login. */}
        <Link to="/admin" className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all">
          Acceso Admin
        </Link>
      </nav>

      {/* HERO SECTION: La primera impresión visual con el CTA principal (WhatsApp) */}
      <header className="relative py-24 md:py-32 px-6 overflow-hidden bg-white">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
            Tus apuntes de medicina,<br className="hidden md:block"/> impresos y listos para rendir.
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            La imprenta universitaria especializada en ciencias de la salud. Encargá tus apuntes online, elegí la encuadernación y retiralo sin hacer filas.
          </p>
          
          {/* CTA Público: Los estudiantes interactúan a través de WhatsApp, no inician sesión en la app. */}
          <a 
            href="#" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-teal hover:bg-brand-tealHover text-white text-lg font-bold rounded-xl shadow-xl shadow-brand-teal/30 transition-all hover:-translate-y-1"
          >
            Hacer un pedido por WhatsApp
          </a>
        </div>
      </header>

      {/* SERVICIOS: Grilla demostrativa usando iconos de lucide-react */}
      <section id="servicios" className="py-24 px-6 bg-slate-50 border-t border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Nuestros Servicios</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">Calidad garantizada para que tus horas de estudio rindan al máximo, con el cuidado que tus materiales necesitan.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Tarjeta de Servicio 1 */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-brand-teal/30 hover:shadow-xl hover:shadow-brand-teal/5 transition-all">
              <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center mb-6 text-brand-teal border border-slate-100">
                <Printer className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Impresión Láser B/N y Color</h3>
              <p className="text-slate-600 leading-relaxed">Máxima nitidez en imágenes médicas, histología y anatomía con tecnología láser de última generación.</p>
            </div>
            
            {/* Tarjeta de Servicio 2 */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-brand-teal/30 hover:shadow-xl hover:shadow-brand-teal/5 transition-all">
              <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center mb-6 text-brand-teal border border-slate-100">
                <BookOpen className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Encuadernación Profesional</h3>
              <p className="text-slate-600 leading-relaxed">Anillados metálicos, tapas transparentes de alto impacto y lomos cuadrados para manuales extensos.</p>
            </div>
            
            {/* Tarjeta de Servicio 3 */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-brand-teal/30 hover:shadow-xl hover:shadow-brand-teal/5 transition-all">
              <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center mb-6 text-brand-teal border border-slate-100">
                <CheckCircle className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Catálogo de Libros Médicos</h3>
              <p className="text-slate-600 leading-relaxed">Acceso a guías, resúmenes y atlas pre-armados por cátedra, listos para mandar a imprimir.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PREGUNTAS FRECUENTES (FAQ): Renderizado estático de una lista de preguntas */}
      <section id="faq" className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Preguntas Frecuentes</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: '¿Cuánto demora un pedido en estar listo?', a: 'Los pedidos simples (hasta 500 hojas) se entregan en el día si se piden antes de las 13hs.' },
              { q: '¿Aceptan transferencias o MercadoPago?', a: 'Sí, aceptamos transferencias bancarias, MercadoPago y efectivo al retirar en mostrador.' },
              { q: '¿Tienen servicio de envío a domicilio?', a: 'Actualmente solo ofrecemos retiro por nuestro local frente a la Facultad de Ciencias Médicas.' }
            ].map((faq, i) => (
              <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-6 hover:border-slate-300 transition-colors">
                <h4 className="font-bold text-slate-800 flex items-center justify-between text-lg">
                  {faq.q}
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                </h4>
                <p className="text-slate-600 mt-3 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SHOWCASE OBLIGATORIO (CATÁLOGO UI): 
          Cumple con la consigna demostrando que los componentes atómicos del BackOffice
          pueden ser importados y utilizados libremente en cualquier otra vista pública. */}
      <section id="showcase" className="py-24 px-6 bg-slate-900 text-slate-300">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Catálogo de Componentes Estáticos (Showcase)</h2>
            <p className="text-slate-400 text-lg">Requisito Obligatorio: Demostración de reutilización de nuestros componentes UI atómicos fuera del panel administrativo.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Demostración de StatCard */}
            <div>
              <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6">1. Componente: StatCard</h4>
              <div className="max-w-xs">
                {/* Reutilizando directamente el componente de src/components/ui sin reescribir lógica */}
                <StatCard titulo="Estudiantes Satisfechos" valor="+5,200" icono={CheckCircle} />
              </div>
            </div>
            
            {/* Demostración de StatusBadge */}
            <div>
              <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6">2. Componente: StatusBadge</h4>
              <div className="flex flex-wrap gap-4 bg-slate-800/50 p-6 rounded-xl border border-slate-700/50 shadow-inner">
                {/* Reutilización del badge demostrando su capacidad de cambiar de color dinámicamente */}
                <StatusBadge status="PENDIENTE" />
                <StatusBadge status="EN PROCESO" />
                <StatusBadge status="ENTREGADO" />
                <StatusBadge status="BAJO STOCK" />
              </div>
            </div>

            {/* Demostración de ActionButton */}
            <div className="md:col-span-2">
              <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6">3. Componente: ActionButton</h4>
              <div className="flex flex-wrap items-center gap-6 bg-slate-800/50 p-6 rounded-xl border border-slate-700/50 shadow-inner">
                {/* Diferentes variantes semánticas del botón global */}
                <ActionButton variant="primary">Guardar Cambios</ActionButton>
                <ActionButton variant="secondary">Cancelar Operación</ActionButton>
                <div className="bg-white p-2 rounded-xl">
                  <ActionButton variant="icon">
                    <Printer className="w-5 h-5" />
                  </ActionButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER PÚBLICO */}
      <footer className="border-t border-slate-200 bg-white py-12 px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-slate-400 font-black text-[11px] shadow-inner">VG</span>
          <span className="font-bold text-slate-700 text-lg">El Viejo Gray</span>
        </div>
        <p className="text-slate-500 text-sm">© {new Date().getFullYear()} El Viejo Gray. Todos los derechos reservados. Desarrollado para la materia Taller.</p>
      </footer>
    </div>
  );
}
