import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";

function InvoiceTable({ invoices, onPrint, onDownloadPdf }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Invoice Number</th>
            <th>Buyer Name</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.length === 0 ? (
            <tr>
              <td colSpan={6} className="empty-row">
                No invoices found for selected filters.
              </td>
            </tr>
          ) : (
            invoices.map((invoice) => (
              <tr key={invoice.id} className="row-hover">
                <td>
                  <Link to={`/invoices/${invoice.id}`} className="invoice-link">
                    {invoice.invoiceNumber}
                  </Link>
                </td>
                <td>
                  <Link to={`/invoices/${invoice.id}`} className="buyer-link">
                    {invoice.buyerName}
                  </Link>
                </td>
                <td>{invoice.date}</td>
                <td>{invoice.amount.toLocaleString("en-IN")}</td>
                <td>
                  <StatusBadge status={invoice.status} />
                </td>
                <td>
                  <div className="action-group">
                    <Link to={`/invoices/${invoice.id}`} className="action-btn btn btn-secondary view">
                      View
                    </Link>
                    <button
                      type="button"
                      className="action-btn btn btn-secondary"
                      onClick={() => onPrint(invoice)}
                    >
                      Print
                    </button>
                    <button
                      type="button"
                      className="action-btn btn btn-secondary"
                      onClick={() => onDownloadPdf(invoice)}
                    >
                      Download PDF
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default InvoiceTable;
