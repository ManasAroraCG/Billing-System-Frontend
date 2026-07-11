import { useState, useEffect } from "react";

export default function NewBuyerModal({
  open,
  onClose,
  onCreate,
}) {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    gst: "",
    phone: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    if (open) {
      setFormData({
        name: "",
        location: "",
        gst: "",
        phone: "",
        email: "",
        address: "",
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

      <div className="modal-card">

        <div className="modal-header">

          <h3>Create Buyer</h3>

          <button
            className="modal-close"
            onClick={onClose}
          >
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
            <label>Location</label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Delhi, NCR"
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
            <label>Address</label>

            <textarea
              rows="4"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Complete Buyer Address"
            />
          </div>

        </div>

        <div className="modal-actions">

          <button
            className="btn btn-secondary"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Create Buyer
          </button>

        </div>

      </div>

    </div>
  );
}