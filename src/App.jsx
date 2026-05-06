import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './modules/Dashboard';
import Orders from './modules/Orders';
import Inventory from './modules/Inventory';
import Prices from './modules/Prices';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="prices" element={<Prices />} />
        </Route>
      </Routes>
    </Router>
  );
}
