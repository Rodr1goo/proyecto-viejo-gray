import React from 'react';

export default function InputField({ label, type = "text", placeholder, icon: Icon, ...props }) {
  return (
    <div className="w-full text-left">
      {label && <label className="block text-sm font-semibold text-slate-700 mb-1">{label}</label>}
      <div className="relative w-full">
        {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />}
        <input 
          type={type} 
          placeholder={placeholder} 
          className={`w-full ${Icon ? 'pl-9' : 'pl-4'} pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal transition-all`}
          {...props}
        />
      </div>
    </div>
  );
}
