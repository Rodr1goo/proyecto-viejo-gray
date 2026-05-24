import React from 'react';

export default function ActionButton({ children, onClick, variant = "primary" }) {
  const baseClasses = "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-teal";
  const variants = {
    primary: "bg-brand-teal hover:bg-brand-tealHover text-white",
    secondary: "bg-slate-100 hover:bg-slate-200 text-slate-700",
    icon: "p-2 text-slate-400 hover:text-brand-teal hover:bg-slate-50"
  };

  return (
    <button onClick={onClick} className={`${baseClasses} ${variants[variant]}`}>
      {children}
    </button>
  );
}
