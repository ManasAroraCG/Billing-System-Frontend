import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Homepage from "./pages/Homepage";
import Catalog from "./pages/Catalog";
import InvoicesPage from "./pages/InvoicesPage";
import InvoiceDetails from "./pages/InvoiceDetails";
import Buyers from "./pages/Buyers";
import CreateOrder from "./pages/CreateOrder";
import Cart from "./pages/Cart";
import GenerateBill from "./pages/GenerateBill";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<InvoicesPage />} />
        <Route path="/invoices" element={<InvoicesPage />} />
        <Route path="/invoices/:invoiceId" element={<InvoiceDetails />} />
      </Route>
      <Route path="/home" element={<Homepage />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/buyers" element={<Buyers />} />
      <Route path="/create-order" element={<CreateOrder />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/generate-bill" element={<GenerateBill />} />
    </Routes>
  );
}

export default App;