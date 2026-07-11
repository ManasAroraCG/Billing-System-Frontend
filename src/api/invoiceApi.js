import { invoices as invoiceSeed } from "../data/invoices";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchInvoices(filters) {
  await wait(180);

  return invoiceSeed.filter((invoice) => {
    const buyerMatch = !filters.buyer || invoice.buyerName === filters.buyer;
    const invoiceDigits = invoice.invoiceNumber.replace(/\D/g, "").slice(-5);
    const invoiceNumberMatch = !filters.invoiceNumber || invoiceDigits.includes(filters.invoiceNumber);
    const dateMatch = !filters.date || invoice.date === filters.date;

    return buyerMatch && invoiceNumberMatch && dateMatch;
  });
}

export async function fetchInvoiceById(invoiceId) {
  await wait(120);
  return invoiceSeed.find((invoice) => invoice.id === invoiceId) || null;
}

export async function markInvoiceAsPaid(invoiceId) {
  await wait(120);
  const invoice = invoiceSeed.find((item) => item.id === invoiceId);
  if (invoice) {
    invoice.status = "Paid";
  }
  return invoice || null;
}
