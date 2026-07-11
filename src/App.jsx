import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Catalog from './pages/Catalog';
import Invoices from './pages/Invoices';
import Buyers from './pages/Buyers';
import CreateOrder from './pages/CreateOrder';
import Cart from './pages/Cart';
import GenerateBill from './pages/GenerateBill';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/invoices" element={<Invoices />} />
      <Route path="/buyers" element={<Buyers />} />
      <Route path="/create-order" element={<CreateOrder />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/generate-bill" element={<GenerateBill />} />
    </Routes>
  );
}

export default App;