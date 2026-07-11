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
  <h3>Buyer Details</h3>
<button
  className="modal-close"
  onClick={onClose}
>
  ×
</button>
</div>

      <div className="buyer-profile">
        <div className="buyer-profile-avatar">{buyer.initials}</div>

        <div>
          <div className="buyer-profile-name">{buyer.name}</div>

          <div className="buyer-profile-location">{buyer.location}</div>
        </div>
      </div>

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
        <label>Total Revenue</label>
        <span className="revenue-highlight">{buyer.revenue}</span>
      </div>

      <div className="detail-group">
        <label>Outstanding Amount</label>

        <span
          className={buyer.pending === "₹0" ? "success-value" : "danger-value"}
        >
          {buyer.pending}
        </span>
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

      <div className="panel-divider"></div>

      <div className="side-actions">
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
