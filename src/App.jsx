import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Catalog from "./pages/Catalog";
import Buyers from "./pages/Buyers";
import CreateOrder from "./pages/CreateOrder";
import Cart from "./pages/Cart";
import GenerateBill from "./pages/GenerateBill";
import ModifyPrices from "./pages/ModifyPrices";
import Invoices from "./pages/InvoicesPage";
import InvoiceDetail from "./pages/InvoiceDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/home" element={<Homepage />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/buyers" element={<Buyers />} />
      <Route path="/create-order" element={<CreateOrder />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/generate-bill" element={<GenerateBill />} />
      <Route path="/modify-prices/:buyerId" element={<ModifyPrices />} />
      <Route path="/invoices" element={<Invoices />} />
      <Route path="/invoice/:invoiceId" element={<InvoiceDetail />} />
    </Routes>
  );
}

export default App;