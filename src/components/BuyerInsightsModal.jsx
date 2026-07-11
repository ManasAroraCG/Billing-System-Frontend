export default function BuyerInsightsModal({
  open,
  buyer,
  onClose,
}) {
  if (!open || !buyer) return null;

  const recentOrders = [
    {
      invoice: "INV-1012",
      amount: "₹12,500",
      date: "18 Jun 2026",
    },
    {
      invoice: "INV-1008",
      amount: "₹7,200",
      date: "05 Jun 2026",
    },
    {
      invoice: "INV-1001",
      amount: "₹18,400",
      date: "22 May 2026",
    },
    {
      invoice: "INV-998",
      amount: "₹9,800",
      date: "15 May 2026",
    },
    {
      invoice: "INV-992",
      amount: "₹14,200",
      date: "01 May 2026",
    },
  ];

  return (
    <div className="modal-overlay">

      <div className="modal-card insights-modal">

        <div className="modal-header">

          <h3>
            Buyer Insights - {buyer.name}
          </h3>

          <button
            className="modal-close"
            onClick={onClose}
          >
            ×
          </button>

        </div>

        <div className="insights-grid">

          <div className="insight-summary-card">

            <span>Total Revenue</span>

            <h2>{buyer.revenue}</h2>

          </div>

          <div className="insight-summary-card">

            <span>Outstanding</span>

            <h2
              className={
                buyer.pending === "₹0"
                  ? "success-value"
                  : "danger-value"
              }
            >
              {buyer.pending}
            </h2>

          </div>

          <div className="insight-summary-card">

            <span>Orders This Year</span>

            <h2>42</h2>

          </div>

        </div>

        <div className="recent-orders-section">

          <h4>Recent Transactions</h4>

          <table className="insights-table">

            <thead>
              <tr>
                <th>Invoice</th>
                <th>Date</th>
                <th>Amount</th>
              </tr>
            </thead>

            <tbody>

              {recentOrders.map((order) => (
                <tr key={order.invoice}>
                  <td>{order.invoice}</td>
                  <td>{order.date}</td>
                  <td>{order.amount}</td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>

        <div className="modal-actions">

          <button
            className="btn btn-secondary"
            onClick={onClose}
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}