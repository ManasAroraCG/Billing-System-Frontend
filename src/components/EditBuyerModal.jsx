import { useState, useEffect } from "react";

export default function EditBuyerModal({
  open,
  buyer,
  onClose,
}) {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    gst: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    if (buyer) {
      setFormData({
        name: buyer.name || "",
        location: buyer.location || "",
        gst: buyer.gst || "",
        phone: buyer.phone || "",
        email: buyer.email || "",
      });
    }
  }, [buyer]);

  if (!open || !buyer) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = () => {
    console.log("Updated Buyer:", formData);

    // Later:
    // Call API
    // Refresh buyer list

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">

        <div className="modal-header">

          <h3>Edit Buyer</h3>

          <button
            className="modal-close"
            onClick={onClose}
          >
            ×
          </button>

        </div>

        <div className="modal-body">

          <div className="form-group">

            <label>Buyer Name</label>

            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
            />

          </div>

          <div className="form-group">

            <label>Location</label>

            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
            />

          </div>

          <div className="form-group">

            <label>GST Number</label>

            <input
              name="gst"
              value={formData.gst}
              onChange={handleChange}
            />

          </div>

          <div className="form-group">

            <label>Phone Number</label>

            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />

          </div>

          <div className="form-group">

            <label>Email Address</label>

            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
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
            onClick={handleSave}
          >
            Save Changes
          </button>

        </div>

      </div>
    </div>
  );
}