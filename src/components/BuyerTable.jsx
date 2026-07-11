import { useState } from "react";
import {
  FiEye,
  FiEdit2,
  FiBarChart2,
} from "react-icons/fi";

export default function BuyerTable({
  buyers,
  onView,
  onEdit,
  onInsights,
}) {
  const [statusFilter, setStatusFilter] = useState("All Buyers");

  const formatGST = (gst) => {
    if (!gst) return gst;
    const cleaned = gst.replace(/\s+/g, '');
    if (cleaned.length === 15) {
      return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 12)} ${cleaned.slice(12)}`;
    }
    return gst;
  };

  const getFilteredBuyers = () => {
    if (statusFilter === "All Buyers") {
      return buyers;
    }
    if (statusFilter === "Settled") {
      return buyers.filter((b) => b.pending === "₹0");
    }
    if (statusFilter === "Pending" || statusFilter === "Overdue") {
      return buyers.filter((b) => b.pending !== "₹0");
    }
    return buyers;
  };

  const filteredBuyers = getFilteredBuyers();
  return (
    <div className="roster-card">
      <div className="roster-header">
        <div className="roster-left">
          <h3>Client Roster</h3>

          <div className="roster-tags">
            <span className="tag active">
              WHOLESALE
            </span>

            <span className="tag">
              GLOBAL
            </span>
          </div>
        </div>

        <div className="roster-right">
          <span>Filter by Status:</span>

          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option>All Buyers</option>
            <option>Settled</option>
            <option>Pending</option>
            <option>Overdue</option>
          </select>
        </div>
      </div>

      {/* SCROLLABLE TABLE */}
      <div className="buyers-table-wrapper">
        <table className="buyers-table">
          <thead>
            <tr>
              <th>BUYER NAME</th>
              <th>GST NUMBER</th>
              <th>PHONE & EMAIL</th>
              <th>TOTAL REVENUE</th>
              <th>PENDING AMOUNT</th>
              <th>ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {filteredBuyers.map((buyer) => (
              <tr key={buyer.id}>
                <td>
                  <div className="buyer-cell">
                    <div className="avatar">
                      {buyer.initials}
                    </div>

                    <div>
                      <div className="buyer-name">
                        {buyer.name}
                      </div>

                      <div className="buyer-location">
                        {buyer.location}
                      </div>
                    </div>
                  </div>
                </td>

                <td>{formatGST(buyer.gst)}</td>

                <td>
                  <div className="contact-block">
                    <div>
                      {buyer.phone}
                    </div>

                    <a
                      className="email-link"
                      href={`mailto:${buyer.email}`}
                    >
                      {buyer.email}
                    </a>
                  </div>
                </td>

                <td className="revenue">
                  {buyer.revenue}
                </td>

                <td>
                  <div className="pending-cell">
                    <div
                      className={
                        buyer.pending === "₹0"
                          ? "pending-zero"
                          : "pending-red"
                      }
                    >
                      {buyer.pending}
                    </div>

                    <span>
                      {buyer.status}
                    </span>
                  </div>
                </td>

                <td>
                  <div className="action-icons">
                    <button
                      title="View Buyer"
                      onClick={() => onView(buyer)}
                    >
                      <FiEye />
                    </button>

                    <button
                      title="Edit Buyer"
                      onClick={() => onEdit(buyer)}
                    >
                      <FiEdit2 />
                    </button>

                    <button
                      title="Insights"
                      onClick={() =>
                        onInsights(buyer)
                      }
                    >
                      <FiBarChart2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <span>
          Showing 1 to {filteredBuyers.length} of{" "}
          {buyers.length} buyers
        </span>

        <div className="pagination">
          <button>‹</button>

          <button className="active-page">
            1
          </button>

          <button>2</button>

          <button>3</button>

          <button>›</button>
        </div>
      </div>
    </div>
  );
}