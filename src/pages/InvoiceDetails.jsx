import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import StatusBadge from "../components/StatusBadge";
import { fetchInvoiceById, markInvoiceAsPaid } from "../api/invoiceApi";

const money = (num) => `INR ${num.toLocaleString("en-IN")}`;
const GST_RATE = 5;

function InvoiceDetailsPage() {
  const { invoiceId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState(null);
  const [isExporting, setIsExporting] = useState(false);
  const invoicePreviewRef = useRef(null);
  const hasHandledActionRef = useRef(false);

  useEffect(() => {
    const load = async () => {
      const result = await fetchInvoiceById(invoiceId);
      setInvoice(result);
    };
    load();
  }, [invoiceId]);

  useEffect(() => {
    hasHandledActionRef.current = false;
  }, [location.search]);

  const captureInvoicePreview = async () => {
    const previewNode = invoicePreviewRef.current;

    if (!previewNode) {
      return null;
    }

    if (document.fonts?.ready) {
      await document.fonts.ready;
    }

    return html2canvas(previewNode, {
      backgroundColor: "#ffffff",
      scale: Math.max(window.devicePixelRatio, 2),
      useCORS: true,
      scrollY: -window.scrollY,
      windowWidth: previewNode.scrollWidth,
    });
  };

  const onDownloadPdf = async () => {
    setIsExporting(true);

    try {
      const canvas = await captureInvoicePreview();

      if (!canvas) {
        return;
      }

      const pdf = new jsPDF("p", "pt", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imageWidth = pageWidth;
      const imageHeight = (canvas.height * imageWidth) / canvas.width;
      const imageData = canvas.toDataURL("image/png");

      let remainingHeight = imageHeight;
      let offsetY = 0;

      pdf.addImage(imageData, "PNG", 0, offsetY, imageWidth, imageHeight, undefined, "FAST");
      remainingHeight -= pageHeight;

      while (remainingHeight > 0) {
        offsetY = remainingHeight - imageHeight;
        pdf.addPage();
        pdf.addImage(imageData, "PNG", 0, offsetY, imageWidth, imageHeight, undefined, "FAST");
        remainingHeight -= pageHeight;
      }

      pdf.save(`${invoice.invoiceNumber}-details.pdf`);
    } finally {
      setIsExporting(false);
    }
  };

  const onPrint = async () => {
    if (isExporting) {
      return;
    }

    window.print();
  };

  useEffect(() => {
    if (!invoice || isExporting || hasHandledActionRef.current) {
      return;
    }

    const params = new URLSearchParams(location.search);
    const action = params.get("action");

    if (!action) {
      return;
    }

    hasHandledActionRef.current = true;

    const runAction = async () => {
      if (action === "download") {
        await onDownloadPdf();
      }

      if (action === "print") {
        await onPrint();
      }

      navigate(`/invoices/${invoice.id}`, { replace: true });
    };

    runAction();
  }, [invoice, isExporting, location.search, navigate]);

  if (!invoice) {
    return <div className="details-card">Loading invoice details...</div>;
  }

  const onMarkAsPaid = async () => {
    const updated = await markInvoiceAsPaid(invoice.id);
    if (updated) {
      setInvoice({ ...updated });
    }
  };

  return (
    <article className="details-card invoice-preview-card" ref={invoicePreviewRef}>
      <div className="details-header">
        <div>
          <button
            className="back-link btn btn-text"
            type="button"
            onClick={() => navigate("/invoices")}
          >
            Back to invoices
          </button>
          <h3>{invoice.invoiceNumber}</h3>
          <StatusBadge status={invoice.status} />
        </div>

        <div className="details-actions">
          <button
            className="btn btn-secondary"
            type="button"
            onClick={onDownloadPdf}
            disabled={isExporting}
          >
            {isExporting ? "Preparing PDF..." : "Download PDF"}
          </button>
          <button className="btn btn-secondary" type="button" onClick={onPrint} disabled={isExporting}>
            Print
          </button>
          <button className="btn btn-primary" type="button" onClick={onMarkAsPaid}>
            Mark As Paid
          </button>
        </div>
      </div>

      <section className="details-grid">
        <div className="info-block">
          <h4>Invoice Information</h4>
          <div className="kv-list">
            <div className="kv-row">
              <span>Invoice Number</span>
              <strong>{invoice.invoiceNumber}</strong>
            </div>
            <div className="kv-row">
              <span>Date</span>
              <strong>{invoice.date}</strong>
            </div>
            <div className="kv-row">
              <span>Due Date</span>
              <strong>{invoice.dueDate}</strong>
            </div>
            <div className="kv-row">
              <span>GSTIN</span>
              <strong>{invoice.gstin}</strong>
            </div>
          </div>
        </div>

        <div className="info-block">
          <h4>Buyer Information</h4>
          <p>{invoice.buyerName}</p>
          <p>{invoice.billAddress}</p>
          <p>Ship To: {invoice.shipAddress}</p>
          <p>Email: {invoice.buyerEmail}</p>
        </div>
      </section>

      <section className="info-block">
        <h4>Products</h4>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>HSN</th>
              <th>Qty</th>
              <th>Rate</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {invoice.products.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.hsn}</td>
                <td>{item.qty}</td>
                <td>{money(item.rate)}</td>
                <td>{money(item.qty * item.rate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="details-grid">
        <div className="info-block">
          <h4>Payment Summary</h4>
          <p>Subtotal: {money(invoice.paymentSummary.subtotal)}</p>
          <p>GST ({GST_RATE}%): {money(invoice.paymentSummary.gst)}</p>
          <p>
            <strong>Grand Total: {money(invoice.paymentSummary.grandTotal)}</strong>
          </p>
        </div>

        <div className="info-block">
          <h4>GST Summary</h4>
          <p>GST (5%): {money(invoice.paymentSummary.gst)}</p>
        </div>
      </section>

      <section className="info-block signature-box">
        <h4>Digital Signature</h4>
        <p>Authorized by: {invoice.signature}</p>
      </section>
    </article>
  );
}

export default InvoiceDetailsPage;
