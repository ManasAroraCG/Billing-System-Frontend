import { Routes, Route } from 'react-router-dom';
import Homepage from './components/pages/Homepage';
import Catalog from './components/pages/Catalog';
import Invoices from './components/pages/Invoices';
import Buyers from './components/pages/Buyers';

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