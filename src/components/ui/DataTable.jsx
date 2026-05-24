import React from 'react';

export default function DataTable({ headers, children }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-white text-slate-800 font-semibold border-b border-slate-200">
            <tr>
              {headers.map((header, index) => (
                <th key={index} className="px-6 py-4">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {children}
          </tbody>
        </table>
      </div>
    </div>
  );
}
