import React from 'react';

export default function DataRow({ children }) {
  return (
    <tr className="hover:bg-slate-50 transition-colors">
      {children}
    </tr>
  );
}
