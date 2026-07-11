import { Link, NavLink, Outlet } from "react-router-dom";

const menuItems = [
  { label: "Dashboard", to: "/invoices" },
  { label: "Catalog", to: "/catalog" },
  { label: "Buyers", to: "/buyers" },
  { label: "Order", to: "/create-order" },
  { label: "Invoices", to: "/invoices", active: true },
];

function Layout() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-box">
          <div className="logo-cube" />
          <div>
            <h1>Sanitary ERP</h1>
            <p>Manufacturing Pro</p>
          </div>
        </div>

        <nav className="side-nav">
          {menuItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `nav-item ${item.active || isActive ? "active" : ""}`
              }
            >
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <button className="account-card" type="button">
          <div className="avatar">A</div>
          <div>
            <strong>Admin Account</strong>
            <p>Preview Access</p>
          </div>
        </button>
      </aside>

      <section className="main-shell">
        <header className="topbar">
          <h2>Invoice Preview</h2>
          <div className="topbar-actions">
            <div className="search-pill">
              <input className="input-field" type="text" placeholder="Search invoice..." />
            </div>
            <Link className="print-btn btn btn-primary" to="/invoices">
              PRINT
            </Link>
          </div>
        </header>
        <main className="page-content">
          <Outlet />
        </main>
      </section>
    </div>
  );
}

export default Layout;
