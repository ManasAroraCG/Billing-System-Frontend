export default function BuyerSidePanel({
  buyer,
  onModifyPrices,
  onCreateOrder,
  onClose,
}) {
  if (!buyer) return null;

  return (
    <div className="buyer-side-panel">
      <div className="panel-header">
        <div>
          <h3>Buyer Details</h3>
          <p className="panel-subtitle">Account overview and quick actions</p>
        </div>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
      </div>

      <div className="panel-content">
        <div className="buyer-profile-card">
          <div className="buyer-profile-avatar">{buyer.initials}</div>

          <div>
            <div className="buyer-profile-name">{buyer.name}</div>
            <div className="buyer-profile-location">{buyer.location}</div>
          </div>
      </div>

        <div className="buyer-metrics">
          <div className="buyer-metric-card">
            <label>Total Revenue</label>
            <span className="revenue-highlight">{buyer.revenue}</span>
          </div>

          <div className="buyer-metric-card">
            <label>Outstanding</label>
            <span
              className={
                buyer.pending === "₹0" ? "success-value" : "danger-value"
              }
            >
              {buyer.pending}
            </span>
          </div>
      </div>

        <div className="panel-divider"></div>

        <div className="buyer-detail-list">
          <div className="detail-group">
            <label>GST Number</label>
            <span>{buyer.gst}</span>
          </div>

          <div className="detail-group">
            <label>Phone Number</label>
            <span>{buyer.phone}</span>
          </div>

          <div className="detail-group">
            <label>Email Address</label>
            <span>{buyer.email}</span>
          </div>

          <div className="detail-group">
            <label>Status</label>
            <span
              className={
                buyer.pending === "₹0" ? "status-success" : "status-danger"
              }
            >
              {buyer.status}
            </span>
          </div>
        </div>
      </div>

      <div className="side-actions side-actions-sticky">
        <button className="btn btn-primary" onClick={onModifyPrices}>
          Modify Prices
        </button>

        <button className="btn btn-secondary" onClick={onCreateOrder}>
          Create Order
        </button>
      </div>
    </div>
  );
}
