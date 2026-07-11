import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import InvoiceTable from "../components/InvoiceTable";
import TopFilters from "../components/TopFilters";
import { fetchInvoices } from "../api/invoiceApi";
import { invoices as invoiceSeed } from "../data/invoices";
import "../styles/invoice-management.css";

const initialFilters = {
  buyer: "",
  date: "",
  invoiceNumber: "",
};

function InvoicesPage() {
  const [filters, setFilters] = useState(initialFilters);
  const [invoices, setInvoices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const result = await fetchInvoices(filters);
      setInvoices(result);
    };
    load();
  }, [filters]);

  const buyers = useMemo(() => {
    const unique = new Set(invoiceSeed.map((invoice) => invoice.buyerName));
    return [...unique].sort();
  }, []);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handlePrint = (invoice) => {
    navigate(`/invoices/${invoice.id}?action=print`);
  };

  const handleDownloadPdf = (invoice) => {
    navigate(`/invoices/${invoice.id}?action=download`);
  };

  return (
    <>
      <Navbar />
      <div className="invoice-navbar-layout">
        <div className="invoice-page">
          <TopFilters
            buyers={buyers}
            filters={filters}
            onBuyerChange={(value) => updateFilter("buyer", value)}
            onDateChange={(value) => updateFilter("date", value)}
            onSearchChange={(value) => updateFilter("invoiceNumber", value.replace(/\D/g, "").slice(0, 5))}
          />

          <InvoiceTable
            invoices={invoices}
            onPrint={handlePrint}
            onDownloadPdf={handleDownloadPdf}
          />
        </div>
      </div>
    </>
  );
}

export default InvoicesPage;
