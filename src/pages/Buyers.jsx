import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/buyers.css";

import BuyerTable from "../components/BuyerTable";
import BuyerSidePanel from "../components/BuyerSidePanel";

import NewBuyerModal from "../components/NewBuyerModal";
import EditBuyerModal from "../components/EditBuyerModal";
import BuyerPricingModal from "../components/BuyerPricingModal";
import BuyerInsightsModal from "../components/BuyerInsightsModal";

import { FiDownload, FiPlus } from "react-icons/fi";
import Navbar from "../components/Navbar";

export default function Buyers() {
  const navigate = useNavigate();

  const [buyers, setBuyers] = useState([
    {
      id: 1,
      initials: "AA",
      name: "Apex Architecture Hub",
      location: "Kolkata, WB",
      gst: "19AAAAA0000A1Z5",
      phone: "+91 98765 43210",
      email: "contact@apexarch.com",
      revenue: "₹4,520,000",
      pending: "₹0",
      status: "SETTLED",
    },
    {
      id: 2,
      initials: "BC",
      name: "Blue Chip Sanitaryware",
      location: "Ahmedabad, GJ",
      gst: "24BBBB1111B2Z6",
      phone: "+91 70001 00001",
      email: "ops@bluechip.in",
      revenue: "₹12,800,000",
      pending: "₹1,420,000",
      status: "15 DAYS OVERDUE",
    },
    {
      id: 3,
      initials: "DW",
      name: "Dream World Projects",
      location: "Mumbai, MH",
      gst: "27CCCCC2222C3Z7",
      phone: "+91 99999 88888",
      email: "billing@dreamworld.com",
      revenue: "₹3,210,000",
      pending: "₹450,000",
      status: "PENDING APPROVAL",
    },
  ]);

  const [selectedBuyer, setSelectedBuyer] = useState(null);

  const [editingBuyer, setEditingBuyer] = useState(null);

  const [insightsBuyer, setInsightsBuyer] = useState(null);

  const [pricingBuyer, setPricingBuyer] = useState(null);

  const [showNewBuyerModal, setShowNewBuyerModal] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);

  const [showPricingModal, setShowPricingModal] = useState(false);

  const [showInsightsModal, setShowInsightsModal] = useState(false);

  const handleCreateBuyer = (buyerData) => {
    const newBuyer = {
      ...buyerData,
      id: Date.now(),
      initials: buyerData.name
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase(),
      revenue: "₹0",
      pending: "₹0",
      status: "NEW",
    };

    setBuyers((prev) => [...prev, newBuyer]);
    setShowNewBuyerModal(false);
  };

  return (
    <div className="buyers-page">
      {/* HEADER */}
      <Navbar />

      <div className="buyers-top">
        <div>
          <h1>Buyer Directory</h1>

          <p>Manage your industrial client database and pricing agreements.</p>
        </div>

        <div className="buyers-actions">
          <button className="btn btn-secondary">
            <FiDownload style={{ paddingTop: "6px", paddingRight: "4px" }} />
            Export CSV
          </button>

          <button
            className="btn btn-primary"
            onClick={() => setShowNewBuyerModal(true)}
          >
            + New Buyer
          </button>
        </div>
      </div>

      {/* KPI CARDS */}

      <div className="buyers-kpis">
        <div className="kpi-card">
          <div className="kpi-label">Total Buyers</div>

          <h2>{buyers.length}</h2>

          <p>Active Customer Base</p>
        </div>

        <div className="kpi-card">
          <div className="kpi-label">Avg. Order Value</div>

          <h2>₹42.5K</h2>

          <p>Last 90 Days</p>
        </div>

        <div className="kpi-card">
          <div className="kpi-label">Pending Receivables</div>

          <h2 className="danger">₹14.8M</h2>

          <p className="danger">4 Overdue Invoices</p>
        </div>

        <div className="kpi-card">
          <div className="kpi-label">Retention Rate</div>

          <h2>94.2%</h2>

          <div className="progress">
            <div className="progress-fill"></div>
          </div>
        </div>
      </div>

      <div className="buyers-layout">
        <div className="buyers-table-section">
          <BuyerTable
            buyers={buyers}
            onView={setSelectedBuyer}
            onEdit={(buyer) => {
              setSelectedBuyer(null);
              setEditingBuyer(buyer);
              setShowEditModal(true);
            }}
            onInsights={(buyer) => {
              setSelectedBuyer(null);
              setInsightsBuyer(buyer);
              setShowInsightsModal(true);
            }}
          />
        </div>
        {selectedBuyer && (
          <div className="drawer-overlay">
            <BuyerSidePanel
              buyer={selectedBuyer}
              onModifyPrices={() => {
                setPricingBuyer(selectedBuyer);
                setSelectedBuyer(null);
                setShowPricingModal(true);
              }}
              onCreateOrder={() =>
                navigate(`/orders/create?buyerId=${selectedBuyer.id}`)
              }
              onClose={() => setSelectedBuyer(null)}
            />
          </div>
        )}
      </div>

      {/* MODALS */}

      <NewBuyerModal
        open={showNewBuyerModal}
        onClose={() => setShowNewBuyerModal(false)}
        onCreate={handleCreateBuyer}
      />

      <EditBuyerModal
        open={showEditModal}
        buyer={editingBuyer}
        onClose={() => {
          setEditingBuyer(null);
          setShowEditModal(false);
        }}
      />

      <BuyerPricingModal
        open={showPricingModal}
        buyer={pricingBuyer}
        onClose={() => {
          setPricingBuyer(null);
          setShowPricingModal(false);
        }}
      />

      <BuyerInsightsModal
        open={showInsightsModal}
        buyer={insightsBuyer}
        onClose={() => {
          setInsightsBuyer(null);
          setShowInsightsModal(false);
        }}
      />

      {!selectedBuyer && (
        <button className="fab" onClick={() => setShowNewBuyerModal(true)}>
          <FiPlus />
        </button>
      )}
    </div>
  );
}
