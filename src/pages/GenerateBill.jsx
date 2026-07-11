import { useState, useRef } from 'react';
import Navbar from '../components/Navbar';

function GenerateBill() {
  const [cart] = useState(() => {
    const saved = sessionStorage.getItem('orderCart');
    return saved ? JSON.parse(saved) : {};
  });
  const [billNo] = useState('INV-' + Date.now().toString().slice(-6));
  const [billDate] = useState(new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }));
  const [dueDate] = useState(new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }));
  const billRef = useRef(null);

  const cartItems = Object.values(cart);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.quantity * parseFloat(item.price)), 0);
  const gst = subtotal * 0.05;
  const grandTotal = subtotal + gst;

  const companyInfo = {
    name: 'AQUA SANITARY SOLUTIONS',
    address: '123, Industrial Area, Sector 12',
    city: 'New Delhi - 110001, India',
    phone: '+91 98765 43210',
    email: 'info@aquasanitary.com',
    gstin: '07AABCU9603R1Z8',
    pan: 'AABCU9603R'
  };

  const buyerInfo = {
    name: 'Ramesh Constructions',
    address: '456, Business Park, Andheri East',
    city: 'Mumbai - 400093, India',
    gstin: '27AABCU9603R1Z7'
  };

  const numberToWords = (num) => {
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    
    if (num === 0) return 'Zero';
    
    const convert = (n) => {
      if (n < 20) return ones[n];
      if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? ' ' + ones[n % 10] : '');
      if (n < 1000) return ones[Math.floor(n / 100)] + ' Hundred' + (n % 100 ? ' ' + convert(n % 100) : '');
      if (n < 100000) return convert(Math.floor(n / 1000)) + ' Thousand' + (n % 1000 ? ' ' + convert(n % 1000) : '');
      if (n < 10000000) return convert(Math.floor(n / 100000)) + ' Lakh' + (n % 100000 ? ' ' + convert(n % 100000) : '');
      return convert(Math.floor(n / 10000000)) + ' Crore' + (n % 10000000 ? ' ' + convert(n % 10000000) : '');
    };
    
    const rupees = Math.floor(num);
    const paise = Math.round((num - rupees) * 100);
    
    let result = 'Rupees ' + convert(rupees);
    if (paise > 0) {
      result += ' and ' + convert(paise) + ' Paise';
    }
    return result + ' Only';
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  const handleDownloadDoc = () => {
    const content = billRef.current.innerHTML;
    const html = `
      <html>
        <head>
          <style>
            body { font-family: 'Times New Roman', serif; padding: 40px; color: #333; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #000; padding: 8px 12px; text-align: left; }
            th { background: #f5f5f5; font-weight: bold; }
          </style>
        </head>
        <body>
          ${content}
        </body>
      </html>
    `;
    
    const blob = new Blob([html], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Bill_${billNo}.doc`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Bill ${billNo} - AQUA Sanitary Solutions`,
          text: `Invoice ${billNo} - Total: ₹${grandTotal.toFixed(2)}`,
          url: window.location.href
        });
      } catch (err) {
        alert('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
        <Navbar />
        <div style={{
          padding: '120px 40px 40px',
          textAlign: 'center'
        }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#2C1810' }}>
            No Items to Generate Bill
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", color: '#64748b', margin: '16px 0' }}>
            Please add items to cart first
          </p>
          <a
            href="/create-order"
            style={{
              padding: '12px 32px',
              borderRadius: '10px',
              background: '#8B6914',
              color: 'white',
              textDecoration: 'none',
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px',
              fontWeight: 600,
              display: 'inline-block'
            }}
          >
            Go to Orders
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f0f0f0' }}>
      <Navbar />
      
      {/* Action Buttons */}
      <div style={{
        position: 'fixed',
        top: '80px',
        right: '30px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        zIndex: 100
      }}
      className="no-print"
      >
        <button
          onClick={handleDownloadPDF}
          style={{
            padding: '12px 24px',
            borderRadius: '10px',
            border: 'none',
            background: '#2563eb',
            color: 'white',
            fontFamily: "'Inter', sans-serif",
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 15px rgba(37,99,235,0.3)'
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10 9 9 9 8 9"/>
          </svg>
          Download PDF
        </button>
        
        <button
          onClick={handleDownloadDoc}
          style={{
            padding: '12px 24px',
            borderRadius: '10px',
            border: 'none',
            background: '#059669',
            color: 'white',
            fontFamily: "'Inter', sans-serif",
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 15px rgba(5,150,105,0.3)'
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
          </svg>
          Download DOC
        </button>
        
        <button
          onClick={handleShare}
          style={{
            padding: '12px 24px',
            borderRadius: '10px',
            border: 'none',
            background: '#8B6914',
            color: 'white',
            fontFamily: "'Inter', sans-serif",
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 15px rgba(139,105,20,0.3)'
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
            <circle cx="18" cy="5" r="3"/>
            <circle cx="6" cy="12" r="3"/>
            <circle cx="18" cy="19" r="3"/>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
          </svg>
          Share
        </button>
      </div>

      {/* Bill Container */}
      <div style={{
        padding: '100px 40px 40px',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <div
          ref={billRef}
          style={{
            background: 'white',
            padding: '24px 40px 30px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
            fontFamily: "'Times New Roman', Times, serif",
            color: '#333',
            fontSize: '12px',
            lineHeight: '1.5'
          }}
          className="bill-content"
        >
          {/* Header */}
          <div style={{
            textAlign: 'center',
            borderBottom: '2px solid #000',
            paddingBottom: '10px',
            marginBottom: '10px'
          }}>
            <h1 style={{
              fontSize: '22px',
              fontWeight: 'bold',
              letterSpacing: '2px',
              margin: '0 0 3px 0',
              color: '#000'
            }}>
              {companyInfo.name}
            </h1>
            <p style={{ margin: '2px 0', fontSize: '12px', color: '#555' }}>
              {companyInfo.address}
            </p>
            <p style={{ margin: '2px 0', fontSize: '12px', color: '#555' }}>
              {companyInfo.city}
            </p>
            <p style={{ margin: '2px 0', fontSize: '12px', color: '#555' }}>
              Phone: {companyInfo.phone} | Email: {companyInfo.email}
            </p>
            <p style={{ margin: '2px 0', fontSize: '12px', color: '#555' }}>
              GSTIN: {companyInfo.gstin} | PAN: {companyInfo.pan}
            </p>
          </div>

          {/* Tax Invoice Title */}
          <div style={{
            textAlign: 'center',
            marginBottom: '10px'
          }}>
            <h2 style={{
              fontSize: '18px',
              fontWeight: 'bold',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              margin: 0,
              color: '#000'
            }}>
              Tax Invoice
            </h2>
          </div>

          {/* Bill To and Invoice Details - On same line using table */}
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginBottom: '20px',
            borderBottom: '1px dashed #000',
            paddingBottom: '8px'
          }}>
            <tbody>
              <tr>
                {/* Bill To - Left side */}
                <td style={{
                  border: 'none',
                  padding: '0 0 8px 0',
                  verticalAlign: 'top',
                  width: '50%'
                }}>
                  <h3 style={{
                    fontSize: '12px',
                    fontWeight: 'bold',
                    marginBottom: '4px',
                    textDecoration: 'underline',
                    margin: '0 0 4px 0'
                  }}>
                    Bill To:
                  </h3>
                  <p style={{ margin: '1px 0', fontSize: '12px', fontWeight: 'bold' }}>
                    {buyerInfo.name}
                  </p>
                  <p style={{ margin: '1px 0', fontSize: '11px', color: '#555' }}>
                    {buyerInfo.address}
                  </p>
                  <p style={{ margin: '1px 0', fontSize: '11px', color: '#555' }}>
                    {buyerInfo.city}
                  </p>
                  <p style={{ margin: '1px 0', fontSize: '11px', color: '#555' }}>
                    GSTIN: {buyerInfo.gstin}
                  </p>
                </td>

                {/* Invoice Details - Right side, same line */}
                <td style={{
                  border: 'none',
                  padding: '0 0 8px 0',
                  verticalAlign: 'top',
                  textAlign: 'right'
                }}>
                  <table style={{ border: 'none', width: 'auto', marginLeft: 'auto' }}>
                    <tbody>
                      <tr>
                        <td style={{ border: 'none', padding: '1px 10px 1px 0', fontWeight: 'bold', fontSize: '11px', textAlign: 'right' }}>Invoice No:</td>
                        <td style={{ border: 'none', padding: '1px 0', fontSize: '11px' }}>{billNo}</td>
                      </tr>
                      <tr>
                        <td style={{ border: 'none', padding: '1px 10px 1px 0', fontWeight: 'bold', fontSize: '11px', textAlign: 'right' }}>Date:</td>
                        <td style={{ border: 'none', padding: '1px 0', fontSize: '11px' }}>{billDate}</td>
                      </tr>
                      <tr>
                        <td style={{ border: 'none', padding: '1px 10px 1px 0', fontWeight: 'bold', fontSize: '11px', textAlign: 'right' }}>Due Date:</td>
                        <td style={{ border: 'none', padding: '1px 0', fontSize: '11px' }}>{dueDate}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Items Table - All borders consistently black */}
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginBottom: '24px'
          }}>
            <thead>
              <tr>
                <th style={{
                  border: '1px solid #000',
                  padding: '5px 8px',
                  background: '#f5f5f5',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  width: '32px'
                }}>
                  S.No
                </th>
                <th style={{
                  border: '1px solid #000',
                  padding: '5px 8px',
                  background: '#f5f5f5',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  textAlign: 'left'
                }}>
                  Description
                </th>
                <th style={{
                  border: '1px solid #000',
                  padding: '5px 8px',
                  background: '#f5f5f5',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  width: '50px'
                }}>
                  HSN/SAC
                </th>
                <th style={{
                  border: '1px solid #000',
                  padding: '5px 8px',
                  background: '#f5f5f5',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  width: '40px'
                }}>
                  Qty
                </th>
                <th style={{
                  border: '1px solid #000',
                  padding: '5px 8px',
                  background: '#f5f5f5',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  textAlign: 'right',
                  width: '80px'
                }}>
                  Rate (&#8377;)
                </th>
                <th style={{
                  border: '1px solid #000',
                  padding: '5px 8px',
                  background: '#f5f5f5',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  textAlign: 'right',
                  width: '80px'
                }}>
                  Amount (&#8377;)
                </th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={item.id}>
                  <td style={{
                    border: '1px solid #000',
                    padding: '8px 8px',
                    textAlign: 'center',
                    fontSize: '11px'
                  }}>
                    {index + 1}
                  </td>
                  <td style={{
                    border: '1px solid #000',
                    padding: '8px 8px',
                    fontSize: '11px'
                  }}>
                    {item.name}
                    <br />
                    <span style={{ fontSize: '9px', color: '#888' }}>Model: #{item.model}</span>
                  </td>
                  <td style={{
                    border: '1px solid #000',
                    padding: '8px 8px',
                    textAlign: 'center',
                    fontSize: '10px'
                  }}>
                    7324
                  </td>
                  <td style={{
                    border: '1px solid #000',
                    padding: '8px 8px',
                    textAlign: 'center',
                    fontSize: '11px'
                  }}>
                    {item.quantity}
                  </td>
                  <td style={{
                    border: '1px solid #000',
                    padding: '8px 8px',
                    textAlign: 'right',
                    fontSize: '11px'
                  }}>
                    {parseFloat(item.price).toFixed(2)}
                  </td>
                  <td style={{
                    border: '1px solid #000',
                    padding: '8px 8px',
                    textAlign: 'right',
                    fontSize: '11px'
                  }}>
                    {(item.quantity * parseFloat(item.price)).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Summary Section */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '20px'
          }}>
            {/* Amount in Words */}
            <div style={{
              flex: 1,
              paddingRight: '20px'
            }}>
              <p style={{
                fontSize: '11px',
                fontWeight: 'bold',
                marginBottom: '3px'
              }}>
                Amount Chargeable (in words):
              </p>
              <p style={{
                fontSize: '11px',
                fontStyle: 'italic',
                color: '#555',
                borderTop: '1px solid #000',
                paddingTop: '3px'
              }}>
                {numberToWords(grandTotal)}
              </p>
              <p style={{
                fontSize: '9px',
                color: '#888',
                marginTop: '5px'
              }}>
                * This is a computer generated invoice
              </p>
            </div>

            {/* Totals */}
            <div style={{
              width: '240px'
            }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse'
              }}>
                <tbody>
                  <tr>
                    <td style={{
                      border: '1px solid #000',
                      padding: '6px 10px',
                      fontSize: '11px',
                      fontWeight: 'bold'
                    }}>
                      Subtotal
                    </td>
                    <td style={{
                      border: '1px solid #000',
                      padding: '6px 10px',
                      textAlign: 'right',
                      fontSize: '11px'
                    }}>
                      &#8377; {subtotal.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td style={{
                      border: '1px solid #000',
                      padding: '6px 10px',
                      fontSize: '11px'
                    }}>
                      IGST @ 5%
                    </td>
                    <td style={{
                      border: '1px solid #000',
                      padding: '6px 10px',
                      textAlign: 'right',
                      fontSize: '11px'
                    }}>
                      &#8377; {gst.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td style={{
                      border: '2px solid #000',
                      padding: '8px 10px',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      Grand Total
                    </td>
                    <td style={{
                      border: '2px solid #000',
                      padding: '8px 10px',
                      textAlign: 'right',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      &#8377; {grandTotal.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div style={{
            borderTop: '1px dashed #000',
            paddingTop: '12px',
            marginTop: '10px'
          }}>
            <h3 style={{
              fontSize: '11px',
              fontWeight: 'bold',
              marginBottom: '6px',
              margin: '0 0 6px 0'
            }}>
              Terms & Conditions:
            </h3>
            <ol style={{
              fontSize: '10px',
              color: '#555',
              paddingLeft: '16px',
              margin: 0
            }}>
              <li style={{ marginBottom: '4px' }}>Goods once sold will not be taken back or exchanged.</li>
              <li style={{ marginBottom: '4px' }}>Payment is due within 15 days from the date of invoice.</li>
              <li style={{ marginBottom: '4px' }}>Interest @ 18% p.a. will be charged on delayed payments.</li>
              <li>Subject to Delhi jurisdiction only.</li>
            </ol>
          </div>

          {/* Footer */}
          <div style={{
            marginTop: '30px',
            display: 'flex',
            justifyContent: 'space-between',
            borderTop: '2px solid #000',
            paddingTop: '15px'
          }}>
            <div>
              <p style={{
                fontSize: '10px',
                fontWeight: 'bold',
                marginBottom: '2px'
              }}>
                Customer Signature
              </p>
              <div style={{
                width: '170px',
                height: '1px',
                background: '#000',
                marginTop: '25px'
              }} />
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{
                fontSize: '10px',
                fontWeight: 'bold',
                marginBottom: '2px'
              }}>
                For {companyInfo.name}
              </p>
              <div style={{
                width: '170px',
                height: '1px',
                background: '#000',
                marginTop: '25px'
              }} />
              <p style={{
                fontSize: '10px',
                marginTop: '4px',
                color: '#555'
              }}>
                Authorised Signatory
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          .no-print {
            display: none !important;
          }
          nav {
            display: none !important;
          }
          .bill-content {
            box-shadow: none !important;
            padding: 20px !important;
            margin: 0 !important;
          }
          body {
            background: white !important;
          }
        }
        .bill-content table {
          page-break-inside: auto;
        }
        .bill-content tr {
          page-break-inside: avoid;
        }
      `}</style>
    </div>
  );
}

export default GenerateBill;