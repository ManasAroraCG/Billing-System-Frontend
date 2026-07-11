import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import "../styles/modifyPrices.css";

import {
  FiArrowLeft,
  FiSave,
  FiSearch,
} from "react-icons/fi";

export default function ModifyPrices() {
  const navigate = useNavigate();
  const location = useLocation();

  const buyer = location.state?.buyer || {
    id: 1,
    name: "Unknown Buyer",
  };

  const [search, setSearch] = useState("");

  const [products, setProducts] = useState([
    {
      id: 1,
      sku: "AQ-1001",
      name: "Premium Basin Mixer",
      category: "Bathroom",
      defaultPrice: 4500,
      buyerPrice: 4200,
    },
    {
      id: 2,
      sku: "AQ-1002",
      name: "Luxury Kitchen Faucet",
      category: "Kitchen",
      defaultPrice: 6200,
      buyerPrice: 5800,
    },
    {
      id: 3,
      sku: "AQ-1003",
      name: "Rain Shower Set",
      category: "Shower",
      defaultPrice: 12500,
      buyerPrice: 11800,
    },
    {
      id: 4,
      sku: "AQ-1004",
      name: "Premium Wash Basin",
      category: "Sanitaryware",
      defaultPrice: 8500,
      buyerPrice: 8200,
    },
    {
      id: 5,
      sku: "AQ-1005",
      name: "Designer Mirror",
      category: "Accessories",
      defaultPrice: 3200,
      buyerPrice: 3000,
    },
  ]);

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

  const filteredProducts = products.filter(
    (product) =>
      product.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      product.sku
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const handleSave = () => {
    console.log("Saving prices:", products);

    alert(
      `Pricing updated successfully for ${buyer.name}`
    );
  };

  return (
    <div className="modify-prices-page">
      <Navbar />

      <div className="modify-prices-container">

        {/* Header */}

        <div className="pricing-header">

          <div>

            <button
              className="back-btn"
              onClick={() => navigate("/buyers")}
            >
              <FiArrowLeft />
              Back to Buyers
            </button>

            <h1>Modify Buyer Pricing</h1>

            <p>
              Configure custom pricing for
              <strong> {buyer.name}</strong>
            </p>

          </div>

          <button
            className="save-btn"
            onClick={handleSave}
          >
            <FiSave />
            Save Changes
          </button>

        </div>

        {/* Buyer Summary */}

        <div className="buyer-summary-card">

          <div className="summary-item">
            <span>Buyer Name</span>
            <strong>{buyer.name}</strong>
          </div>

          <div className="summary-item">
            <span>Products</span>
            <strong>
              {filteredProducts.length}
            </strong>
          </div>

          <div className="summary-item">
            <span>Pricing Type</span>
            <strong>Custom Pricing</strong>
          </div>

        </div>

        {/* Search */}

        <div className="search-box">

          <FiSearch />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        {/* Table */}

        <div className="catalog-card">

          <table className="catalog-pricing-table">

            <thead>
              <tr>
                <th>SKU</th>
                <th>PRODUCT</th>
                <th>CATEGORY</th>
                <th>DEFAULT PRICE</th>
                <th>BUYER PRICE</th>
                <th>DISCOUNT</th>
              </tr>
            </thead>

            <tbody>

              {filteredProducts.map((product) => {

                const discount =
                  product.defaultPrice -
                  product.buyerPrice;

                return (
                  <tr key={product.id}>

                    <td>{product.sku}</td>

                    <td>{product.name}</td>

                    <td>{product.category}</td>

                    <td>
                      ₹
                      {product.defaultPrice.toLocaleString()}
                    </td>

                    <td>

                      <input
                        className="price-input"
                        type="number"
                        value={product.buyerPrice}
                        onChange={(e) =>
                          updatePrice(
                            product.id,
                            Number(e.target.value)
                          )
                        }
                      />

                    </td>

                    <td
                      className={
                        discount > 0
                          ? "discount-value"
                          : ""
                      }
                    >
                      ₹
                      {discount.toLocaleString()}
                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>

        </div>

      </div>
    </div>
  );
}