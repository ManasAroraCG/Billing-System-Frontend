import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);
  const [onDarkSection, setOnDarkSection] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const whiteBgRoutes = [
    "/catalog",
    "/invoices",
    "/buyers",
    "/add-buyer",
    "/create-order",
    "/cart",
    "/generate-bill",
    "/modify-prices",
  ];

  const isWhitePage = whiteBgRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 60;

      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }

      if (isWhitePage) {
        setOnDarkSection(false);
        return;
      }

      const heroSection = document.querySelector(
        '[data-section="hero"]'
      );

      const analyticsSection = document.querySelector(
        '[data-section="analytics"]'
      );

      if (heroSection && analyticsSection) {
        const analyticsRect =
          analyticsSection.getBoundingClientRect();

        if (
          analyticsRect.top <= 80 &&
          analyticsRect.bottom > 0
        ) {
          setOnDarkSection(false);
        } else {
          setOnDarkSection(true);
        }
      }
    };

    if (isWhitePage) {
      setOnDarkSection(false);
    }

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, [scrolled, location.pathname, isWhitePage]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  const textColor = onDarkSection
    ? "white"
    : "#2C1810";

  const activeBg = onDarkSection
    ? "rgba(255,255,255,0.12)"
    : "rgba(139,105,20,0.12)";

  const hoverBg = onDarkSection
    ? "rgba(255,255,255,0.08)"
    : "rgba(139,105,20,0.06)";

  const logoColor = onDarkSection
    ? "white"
    : "#8B6914";

  const navBackground = onDarkSection
    ? scrolled
      ? "rgba(0,0,0,0.40)"
      : "transparent"
    : "rgba(247,245,241,0.96)";

  const borderColor = onDarkSection
    ? scrolled
      ? "1px solid rgba(255,255,255,0.10)"
      : "1px solid transparent"
    : "1px solid rgba(139,105,20,0.08)";

  const mainNavLinks = [
    {
      path: "/catalog",
      label: "Catalog",
    },
    {
      path: "/invoices",
      label: "Invoices",
    },
    {
      path: "/buyers",
      label: "Buyers",
    },
  ];

  const rightNavLinks = [
    {
      path: "/add-buyer",
      label: "Add Buyer",
    },
    {
      path: "/create-order",
      label: "Create Order",
    },
  ];

  const handleAddBuyerClick = () => {
    navigate("/buyers", {
      state: { openAddBuyer: true },
    });
  };

  

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: navBackground,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: borderColor,
          padding: "0 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: scrolled ? "50px" : "60px",
          transition: "all 0.3s ease",
        }}
      >
        {/* Logo */}

        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
              stroke={logoColor}
              strokeWidth="1.5"
            />

            <path
              d="M9 22V12H15V22"
              stroke={logoColor}
              strokeWidth="1.5"
            />
          </svg>

          <span
            style={{
              color: logoColor,
              fontFamily:
                "'Playfair Display', serif",
              fontSize: scrolled
                ? "16px"
                : "18px",
              fontWeight: 700,
              letterSpacing: "1px",
            }}
          >
            AQUA
          </span>
        </Link>

        {/* Center Nav */}

        <div
          className="desktop-nav-center"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "32px",
            position: "absolute",
            left: "50%",
            transform:
              "translateX(-50%)",
          }}
        >
          {mainNavLinks.map(
            ({ path, label }) => (
              <Link
                key={path}
                to={path}
                style={{
                  color: textColor,
                  textDecoration: "none",
                  fontSize: "13px",
                  fontWeight: isActive(path)
                    ? 600
                    : 400,
                  padding: "6px 12px",
                  borderRadius: "6px",
                  background: isActive(path)
                    ? activeBg
                    : "transparent",
                }}
              >
                {label}
              </Link>
            )
          )}
        </div>


        {/* Right Nav */}

{/* Right Nav */}

<div
  className="desktop-nav-right"
  style={{
    display: "flex",
    gap: "12px",
  }}
>
  {rightNavLinks.map(({ path, label }) => {
    if (path === "/add-buyer") {
      return (
        <button
          key={path}
          onClick={handleAddBuyerClick}
          style={{
            color: textColor,
            textDecoration: "none",
            fontSize: "13px",
            fontWeight: 400,
            padding: "6px 12px",
            borderRadius: "6px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          {label}
        </button>
      );
    }

    return (
      <Link
        key={path}
        to={path}
        style={{
          color: textColor,
          textDecoration: "none",
          fontSize: "13px",
          fontWeight: isActive(path)
            ? 600
            : 400,
          padding: "6px 12px",
          borderRadius: "6px",
          background: isActive(path)
            ? activeBg
            : "transparent",
        }}
      >
        {label}
      </Link>
    );
  })}
</div>
      </nav>
    </>
  );
}

export default Navbar;