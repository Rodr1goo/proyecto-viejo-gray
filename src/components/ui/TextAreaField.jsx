import React from 'react';

export default function TextAreaField({ label, placeholder, ...props }) {
  return (
    <div className="w-full text-left">
      {label && <label className="block text-sm font-semibold text-slate-700 mb-1">{label}</label>}
      <textarea 
        placeholder={placeholder} 
        className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal transition-all resize-y min-h-[80px]"
        {...props}
      />
    </div>
  );
}
