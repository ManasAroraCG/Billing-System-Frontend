import { useState, useEffect } from "react";
import { API_BASE_URL } from "../services/api";
import getAuthToken from "../utils/auth";

export default function BuyerInsightsModal({
  open,
  buyer,
  onClose,
}) {
  const [loading, setLoading] = useState(false);

  const [customerStats, setCustomerStats] =
    useState(null);

  const [recentInvoices, setRecentInvoices] =
    useState([]);

  useEffect(() => {
    if (open && buyer) {
      fetchInsights();
    }
  }, [open, buyer]);

  const fetchInsights = async () => {
    try {
      setLoading(true);

      const token = getAuthToken();

      const [salesResponse, invoiceResponse] =
        await Promise.all([
          fetch(
            `${API_BASE_URL}/Reports/customer-sales`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type":
                  "application/json",
              },
            }
          ),

          fetch(
            `${API_BASE_URL}/Invoices?CustomerId=${buyer.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type":
                  "application/json",
              },
            }
          ),
        ]);

      const salesResult =
        await salesResponse.json();

      const invoiceResult =
        await invoiceResponse.json();

      if (salesResult.success) {
        const stats = salesResult.data.find(
          (item) =>
            item.customerId === buyer.id
        );

        setCustomerStats(stats || null);
      }

      if (
        invoiceResult.success &&
        invoiceResult.data?.data
      ) {
        const customerInvoices =
          invoiceResult.data.data
            .filter(
              (invoice) =>
                invoice.partyName ===
                buyer.name
            )
            .slice(0, 5);

        setRecentInvoices(customerInvoices);
      }
    } catch (error) {
      console.error(
        "Failed to load buyer insights",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  if (!open || !buyer) return null;

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

        {loading ? (
          <div
            style={{
              padding: "40px",
              textAlign: "center",
            }}
          >
            Loading insights...
          </div>
        ) : (
          <>
            <div className="insights-grid">
              <div className="insight-summary-card">
                <span>Total Revenue</span>

                <h2>
                  ₹
                  {(
                    customerStats?.totalSales ||
                    0
                  ).toLocaleString()}
                </h2>
              </div>

              <div className="insight-summary-card">
                <span>
                  GST Collected
                </span>

                <h2>
                  ₹
                  {(
                    customerStats?.totalGst ||
                    0
                  ).toLocaleString()}
                </h2>
              </div>

              <div className="insight-summary-card">
                <span>Invoices</span>

                <h2>
                  {customerStats?.invoiceCount ||
                    0}
                </h2>
              </div>
            </div>

            <div
              className="insight-summary-card"
              style={{
                marginBottom: "20px",
              }}
            >
              <span>GST Number</span>

              <h3>
                {customerStats?.gstin ||
                  buyer.gst ||
                  "N/A"}
              </h3>
            </div>

            <div className="recent-orders-section">
              <h4>
                Recent Transactions
              </h4>

              <table className="insights-table">
                <thead>
                  <tr>
                    <th>Invoice</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {recentInvoices.length >
                  0 ? (
                    recentInvoices.map(
                      (invoice) => (
                        <tr
                          key={
                            invoice.id
                          }
                        >
                          <td>
                            {
                              invoice.invoiceNumber
                            }
                          </td>

                          <td>
                            {new Date(
                              invoice.invoiceDate
                            ).toLocaleDateString()}
                          </td>

                          <td>
                            ₹
                            {invoice.grandTotal.toLocaleString()}
                          </td>

                          <td
                            style={{
                              textTransform:
                                "capitalize",
                            }}
                          >
                            {
                              invoice.status
                            }
                          </td>
                        </tr>
                      )
                    )
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        style={{
                          textAlign:
                            "center",
                        }}
                      >
                        No invoices found
                      </td>
                    </tr>
                  )}
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
          </>
        )}
      </div>
    </div>
  );
}