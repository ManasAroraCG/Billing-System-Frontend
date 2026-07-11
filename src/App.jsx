import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Catalog from './pages/Catalog';
import Invoices from './pages/Invoices';
import Buyers from './pages/Buyers';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/invoices" element={<Invoices />} />
      <Route path="/buyers" element={<Buyers />} />
    </Routes>
  );
}

export default App;