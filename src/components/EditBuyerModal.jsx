import { useState, useEffect } from "react";
import { API_BASE_URL } from "../services/api";
import getAuthToken from "../utils/auth";

export default function EditBuyerModal({
  open,
  buyer,
  fetchCustomers,
  onClose,
}) {
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
    if (buyer) {
      setFormData({
        name: buyer.name || "",
        contactPerson: buyer.contactPerson || "",
        gst: buyer.gst || "",
        panNumber: buyer.panNumber || "",
        phone: buyer.phone || "",
        email: buyer.email || "",
        billingAddress: buyer.billingAddress || "",
        shippingAddress: buyer.shippingAddress || "",
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

  const handleSave = async () => {
    try {
      const token = getAuthToken();

      const response = await fetch(
        `${API_BASE_URL}/Customers/${buyer.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            partyName: formData.name,
            contactPerson: formData.contactPerson,
            phone: formData.phone,
            email: formData.email,
            billingAddress: formData.billingAddress,
            shippingAddress: formData.shippingAddress,
            gstin: formData.gst,
            panNumber: formData.panNumber,
            isActive: true,
          }),
        }
      );

      const result = await response.json();

      if (result.success) {
        await fetchCustomers();

        alert("Buyer updated successfully");

        onClose();
      } else {
        alert(
          result.message ||
            "Failed to update buyer"
        );
      }
    } catch (error) {
      console.error(error);

      alert("Error updating buyer");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card compact-modal-card">

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
            <label>Buyer Name *</label>

            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Contact Person</label>

            <input
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>PAN Number</label>

            <input
              name="panNumber"
              value={formData.panNumber}
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
            <label>Phone Number *</label>

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