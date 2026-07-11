import { useState } from "react";

export default function BuyerPricingModal({
  open,
  buyer,
  onClose,
}) {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Premium Chrome Tap",
      defaultPrice: 500,
      buyerPrice: 450,
    },
    {
      id: 2,
      name: "Luxury Basin Mixer",
      defaultPrice: 1200,
      buyerPrice: 1150,
    },
    {
      id: 3,
      name: "Square Shower Set",
      defaultPrice: 2200,
      buyerPrice: 2050,
    },
    {
      id: 4,
      name: "Drain Cover",
      defaultPrice: 200,
      buyerPrice: 200,
    },
  ]);

  if (!open || !buyer) return null;

  const updatePrice = (id, value) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? {
              ...product,
              buyerPrice: value,
            }
          : product
      )
    );
  };

  const handleSave = () => {
    console.log(
      "Buyer Pricing Updated",
      products
    );

    // Future:
    // API Save Call

    onClose();
  };

  return (
    <div className="modal-overlay">

      <div className="modal-card large">

        <div className="modal-header">

          <h3>
            Buyer Pricing - {buyer.name}
          </h3>

          <button
            className="modal-close"
            onClick={onClose}
          >
            ×
          </button>

        </div>

        <div className="pricing-description">
          Override standard catalog pricing for
          this buyer.
        </div>

        <table className="pricing-table">

          <thead>
            <tr>
              <th>Product</th>
              <th>Default Price</th>
              <th>Buyer Price</th>
              <th>Difference</th>
            </tr>
          </thead>

          <tbody>

            {products.map((product) => (
              <tr key={product.id}>

                <td>
                  {product.name}
                </td>

                <td>
                  ₹{product.defaultPrice}
                </td>

                <td>

                  <input
                    type="number"
                    value={product.buyerPrice}
                    onChange={(e) =>
                      updatePrice(
                        product.id,
                        e.target.value
                      )
                    }
                  />

                </td>

                <td>

                  ₹
                  {product.defaultPrice -
                    product.buyerPrice}

                </td>

              </tr>
            ))}

          </tbody>

        </table>

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
            Save Pricing
          </button>

        </div>

      </div>

    </div>
  );
}
