import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [onDarkSection, setOnDarkSection] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // List of routes with white background - ADDED /cart and /generate-bill
  const whiteBgRoutes = ['/catalog', '/invoices', '/buyers', '/add-buyer', '/create-order', '/cart', '/generate-bill'];

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 60;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }

      // Check if we're on a white background page
      if (whiteBgRoutes.includes(location.pathname)) {
        setOnDarkSection(false);
        return;
      }

      // Check if we're on the dark hero section or white analytics section
      const heroSection = document.querySelector('[data-section="hero"]');
      const analyticsSection = document.querySelector('[data-section="analytics"]');
      
      if (heroSection && analyticsSection) {
        const heroRect = heroSection.getBoundingClientRect();
        const analyticsRect = analyticsSection.getBoundingClientRect();
        
        // If analytics section is visible (white background), change text to dark
        if (analyticsRect.top <= 80 && analyticsRect.bottom > 0) {
          setOnDarkSection(false);
        } else {
          setOnDarkSection(true);
        }
      }
    };

    // Set initial state based on current route
    if (whiteBgRoutes.includes(location.pathname)) {
      setOnDarkSection(false);
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled, location.pathname]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  const textColor = onDarkSection ? 'white' : '#2C1810';
  const activeBg = onDarkSection ? 'rgba(255, 255, 255, 0.12)' : 'rgba(139, 105, 20, 0.1)';
  const hoverBg = onDarkSection ? 'rgba(255, 255, 255, 0.08)' : 'rgba(139, 105, 20, 0.06)';
  const logoColor = onDarkSection ? 'white' : '#8B6914';
  const navBackground = onDarkSection 
    ? (scrolled ? 'rgba(0, 0, 0, 0.4)' : 'transparent')
    : (scrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.95)');
  const borderColor = onDarkSection 
    ? (scrolled ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid transparent')
    : '1px solid rgba(139, 105, 20, 0.1)';

  const mainNavLinks = [
    { path: '/catalog', label: 'Catalog' },
    { path: '/invoices', label: 'Invoices' },
    { path: '/buyers', label: 'Buyers' }
  ];

  const rightNavLinks = [
    { path: '/add-buyer', label: 'Add Buyer' },
    { path: '/create-order', label: 'Create Order' }
  ];

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: navBackground,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: borderColor,
        padding: '0 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: scrolled ? '50px' : '60px',
        transition: 'all 0.3s ease'
      }}>
        {/* Logo - Extreme Left */}
        <Link to="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          textDecoration: 'none',
          flexShrink: 0
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" 
              stroke={logoColor} 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path d="M9 22V12H15V22" 
              stroke={logoColor} 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
          <span style={{
            color: logoColor,
            fontFamily: "'Playfair Display', serif",
            fontSize: scrolled ? '16px' : '18px',
            fontWeight: 700,
            letterSpacing: '1px',
            marginLeft: '4px',
            transition: 'font-size 0.3s ease, color 0.3s ease',
            whiteSpace: 'nowrap'
          }}>
            AQUA
          </span>
        </Link>

        {/* Desktop Navigation - Centered (Catalog, Invoices, Buyers) */}
        <div className="desktop-nav-center" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '32px',
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)'
        }}>
          {mainNavLinks.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              style={{
                color: textColor,
                textDecoration: 'none',
                fontFamily: "'Inter', sans-serif",
                fontSize: '13px',
                fontWeight: isActive(path) ? 600 : 400,
                padding: '6px 12px',
                borderRadius: '6px',
                background: isActive(path) ? activeBg : 'transparent',
                transition: 'all 0.3s ease',
                letterSpacing: '0.3px',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = hoverBg;
              }}
              onMouseLeave={(e) => {
                if (!isActive(path)) {
                  e.target.style.background = 'transparent';
                }
              }}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Desktop Navigation - Right (Add Buyer, Create Order) */}
        <div className="desktop-nav-right" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          flexShrink: 0
        }}>
          {rightNavLinks.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              style={{
                color: textColor,
                textDecoration: 'none',
                fontFamily: "'Inter', sans-serif",
                fontSize: '13px',
                fontWeight: isActive(path) ? 600 : 400,
                padding: '6px 12px',
                borderRadius: '6px',
                background: isActive(path) ? activeBg : 'transparent',
                transition: 'all 0.3s ease',
                letterSpacing: '0.3px',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = hoverBg;
              }}
              onMouseLeave={(e) => {
                if (!isActive(path)) {
                  e.target.style.background = 'transparent';
                }
              }}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            zIndex: 1001
          }}
          className="hamburger-btn"
          aria-label="Toggle menu"
        >
          <div style={{
            width: '24px',
            height: '2px',
            background: logoColor,
            margin: '5px 0',
            transition: 'all 0.3s ease',
            transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'
          }} />
          <div style={{
            width: '24px',
            height: '2px',
            background: logoColor,
            margin: '5px 0',
            transition: 'all 0.3s ease',
            opacity: mobileMenuOpen ? 0 : 1
          }} />
          <div style={{
            width: '24px',
            height: '2px',
            background: logoColor,
            margin: '5px 0',
            transition: 'all 0.3s ease',
            transform: mobileMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none'
          }} />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: onDarkSection ? 'rgba(0, 0, 0, 0.95)' : 'rgba(255, 255, 255, 0.98)',
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s ease-in-out',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)'
      }}
      className="mobile-menu"
      >
        <div style={{
          color: textColor,
          fontFamily: "'Inter', sans-serif",
          fontSize: '14px',
          fontWeight: 600,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          opacity: 0.6,
          marginBottom: '8px'
        }}>
          Navigation
        </div>

        {mainNavLinks.map(({ path, label }) => (
          <Link
            key={path}
            to={path}
            style={{
              color: textColor,
              textDecoration: 'none',
              fontFamily: "'Inter', sans-serif",
              fontSize: '18px',
              fontWeight: isActive(path) ? 700 : 500,
              padding: '12px 24px',
              borderRadius: '8px',
              background: isActive(path) ? activeBg : 'transparent',
              transition: 'all 0.3s ease',
              letterSpacing: '0.5px',
              width: '220px',
              textAlign: 'center'
            }}
            onClick={() => setMobileMenuOpen(false)}
          >
            {label}
          </Link>
        ))}

        <div style={{
          width: '80px',
          height: '1px',
          background: logoColor,
          opacity: 0.3,
          margin: '8px 0'
        }} />

        <div style={{
          color: textColor,
          fontFamily: "'Inter', sans-serif",
          fontSize: '14px',
          fontWeight: 600,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          opacity: 0.6,
          marginBottom: '8px'
        }}>
          Actions
        </div>

        {rightNavLinks.map(({ path, label }) => (
          <Link
            key={path}
            to={path}
            style={{
              color: textColor,
              textDecoration: 'none',
              fontFamily: "'Inter', sans-serif",
              fontSize: '18px',
              fontWeight: isActive(path) ? 700 : 500,
              padding: '12px 24px',
              borderRadius: '8px',
              background: isActive(path) ? activeBg : 'transparent',
              transition: 'all 0.3s ease',
              letterSpacing: '0.5px',
              width: '220px',
              textAlign: 'center'
            }}
            onClick={() => setMobileMenuOpen(false)}
          >
            {label}
          </Link>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav-center,
          .desktop-nav-right {
            display: none !important;
          }
          .hamburger-btn {
            display: block !important;
          }
          nav {
            padding: 0 12px !important;
          }
        }
        
        @media (min-width: 769px) {
          .hamburger-btn {
            display: none !important;
          }
          .mobile-menu {
            display: none !important;
          }
          .desktop-nav-center {
            display: flex !important;
          }
          .desktop-nav-right {
            display: flex !important;
          }
        }

        @media (max-width: 480px) {
          .mobile-menu a {
            font-size: 16px !important;
            padding: 10px 16px !important;
            width: 200px !important;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .desktop-nav-center {
            gap: 24px !important;
          }
          .desktop-nav-right {
            gap: 8px !important;
          }
          .desktop-nav-center a,
          .desktop-nav-right a {
            font-size: 12px !important;
            padding: 5px 8px !important;
          }
        }
      `}</style>
    </>
  );
}

export default Navbar;