import { useState, useEffect } from "react";

export default function NewBuyerModal({ open, onClose, onCreate }) {
const [formData, setFormData] = useState({
  name: "",
  contactPerson: "",
  gst: "",
  panNumber: "",
  phone: "",
  email: "",
  billingAddress: "",
  shippingAddress: "",
});

  useEffect(() => {
    if (open) {
      setFormData({
        name: "",
        contactPerson: "",
        gst: "",
        panNumber: "",
        phone: "",
        email: "",
        billingAddress: "",
        shippingAddress: "",
      });
    }
  }, [open]);

  if (!open) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      alert("Buyer name is required");
      return;
    }

    if (!formData.phone.trim()) {
      alert("Phone number is required");
      return;
    }

    onCreate(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card compact-modal-card">
        <div className="modal-header">
          <h3>Create Buyer</h3>

          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label>Buyer Name *</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Apex Architecture Hub"
            />
          </div>
          <div className="form-group">
                <label>Contact Person</label>
                <input
              type="text"
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleChange}
              placeholder="John Doe"
            />
          </div>
          {/* Pan number */}
          <div className="form-group">
            <label>PAN Number</label>

            <input
              type="text"
              name="panNumber"
              value={formData.panNumber}
              onChange={handleChange}
              placeholder="AAAAA0000A"
            />
          </div>

          <div className="form-group">
            <label>GST Number</label>

            <input
              type="text"
              name="gst"
              value={formData.gst}
              onChange={handleChange}
              placeholder="19AAAAA0000A1Z5"
            />
          </div>

          <div className="form-group">
            <label>Phone Number *</label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="buyer@email.com"
            />
          </div>

          <div className="form-group">
            <label>Billing Address</label>

            <textarea
              rows="3"
              name="billingAddress"
              value={formData.billingAddress}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Shipping Address</label>

            <textarea
              rows="3"
              name="shippingAddress"
              value={formData.shippingAddress}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>

          <button className="btn btn-primary" onClick={handleSubmit}>
            Create Buyer
          </button>
        </div>
      </div>
    </div>
  );
}
