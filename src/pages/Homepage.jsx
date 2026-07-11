import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

function Homepage() {
  const navigate = useNavigate();

  // Authentication check on component mount
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  const images = [
    {
      url: "https://media.istockphoto.com/id/1454303048/photo/modern-dark-luxury-minimalist-bathroom.jpg?b=1&s=612x612&w=0&k=20&c=38sT29Kkl7Er0wfslVyqPxLECRc3WjyF0_q_ZVdQGUU=",
      offset: '-24px',
      label: 'Premium Taps'
    },
    {
      url: "https://images.pexels.com/photos/9695823/pexels-photo-9695823.jpeg",
      offset: '24px',
      label: 'Luxury Showers'
    },
    {
      url: "https://images.pexels.com/photos/36718391/pexels-photo-36718391.jpeg",
      offset: '-24px',
      label: 'Elegant Basins'
    },
    {
      url: "https://images.pexels.com/photos/30457600/pexels-photo-30457600.jpeg",
      offset: '24px',
      label: 'Modern Drains'
    }
  ];

  // Chart configurations
  const chartOptions = {
    cutout: '75%',
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
      }
    },
    animation: {
      animateRotate: true,
      duration: 2000
    },
    maintainAspectRatio: true,
    responsive: true
  };

  const totalSalesChart = {
    datasets: [{
      data: [78, 22],
      backgroundColor: [
        '#8B6914',
        '#f0e6d8'
      ],
      borderWidth: 0,
      hoverBackgroundColor: ['#A0522D', '#f0e6d8'],
      borderRadius: 8,
      spacing: 2
    }]
  };

  const totalProfitsChart = {
    datasets: [{
      data: [65, 35],
      backgroundColor: [
        '#A0522D',
        '#f0e6d8'
      ],
      borderWidth: 0,
      hoverBackgroundColor: ['#8B4513', '#f0e6d8'],
      borderRadius: 8,
      spacing: 2
    }]
  };

  const newUsersChart = {
    datasets: [{
      data: [92, 8],
      backgroundColor: [
        '#DAA520',
        '#f0e6d8'
      ],
      borderWidth: 0,
      hoverBackgroundColor: ['#B8860B', '#f0e6d8'],
      borderRadius: 8,
      spacing: 2
    }]
  };

  // Parallax effect
  const [parallaxOffset, setParallaxOffset] = useState(0);

  useEffect(() => {
    let rafId = 0;

    const handleScroll = () => {
      if (rafId) {
        return;
      }

      rafId = window.requestAnimationFrame(() => {
        const y = window.scrollY || window.pageYOffset;
        const offset = Math.max(-60, Math.min(60, y * 0.12));
        setParallaxOffset(offset);
        rafId = 0;
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <div style={{ width: '100%', minHeight: '100%', overflowX: 'clip' }}>
      {/* Hero Section */}
      <div data-section="hero" style={{
        width: '100%',
        minHeight: '100svh',
        position: 'relative',
        overflow: 'hidden',
        background: `url("https://images.pexels.com/photos/35209394/pexels-photo-35209394.jpeg")`,
        backgroundSize: 'cover',
        backgroundPosition: `center calc(50% - ${parallaxOffset * 0.45}px)`,
        backgroundAttachment: 'scroll'
      }}>
        {/* Overlay with glassmorphism */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          zIndex: 0
        }} />

        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100svh',
          padding: '70px 24px 28px',
          transform: 'translateY(-28px)'
        }}>
          {/* Hero Text */}
          <div style={{
            marginBottom: '36px',
            textAlign: 'center'
          }}>
            <h1 style={{
              fontFamily: "'Playfair Display', 'Great Vibes', cursive",
              fontSize: 'clamp(60px, 10vw, 120px)',
              color: 'white',
              margin: 0,
              fontWeight: 400,
              lineHeight: 1,
              textShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
              letterSpacing: '4px'
            }}>
              Sanitary
            </h1>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(14px, 2.5vw, 18px)',
              color: 'rgba(255, 255, 255, 0.85)',
              margin: '12px 0 0 0',
              letterSpacing: '6px',
              textTransform: 'uppercase',
              fontWeight: 300,
              textShadow: '0 2px 20px rgba(0, 0, 0, 0.2)'
            }}>
              Solutions
            </p>
          </div>

          {/* Image Gallery */}
          <div className="hero-cards-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
            gap: '16px',
            justifyContent: 'center',
            alignItems: 'center',
            width: 'min(1200px, 100%)'
          }}>
            {images.map((image, index) => (
              <div
                key={index}
                style={{
                  width: '100%',
                  maxWidth: '250px',
                  justifySelf: 'center',
                  height: 'clamp(220px, 30vw, 360px)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  position: 'relative',
                  cursor: 'pointer',
                  transform: `translateY(${image.offset})`,
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = `translateY(${parseInt(image.offset) - 15}px) scale(1.03)`;
                  e.currentTarget.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.5)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = `translateY(${image.offset}) scale(1)`;
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                <img
                  src={image.url}
                  alt={image.label}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                  }}
                />

                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '20px',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease'
                }}
                className="card-overlay"
                onMouseEnter={(e) => {
                  e.target.style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  e.target.style.opacity = '0';
                }}
                >
                  <span style={{
                    color: 'white',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    fontWeight: 500,
                    letterSpacing: '1px'
                  }}>
                    {image.label}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll indicator */}
          <div style={{
            position: 'absolute',
            bottom: '30px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            opacity: 0.6
          }}>
            <span style={{
              color: 'white',
              fontFamily: "'Inter', sans-serif",
              fontSize: '12px',
              letterSpacing: '2px'
            }}>
              SCROLL
            </span>
            <div style={{
              width: '1px',
              height: '30px',
              background: 'linear-gradient(to bottom, white, transparent)'
            }} />
          </div>
        </div>
      </div>

      {/* Analytics Section with Parallax */}
      <div
        data-section="analytics"
        style={{
          width: '100%',
          minHeight: '100vh',
          background: '#ffffff',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 20px'
        }}
      >
        {/* Decorative background elements */}
        <div style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, #f5e6d3 0%, transparent 70%)',
          opacity: 0.5,
          transform: `translate3d(0, ${-parallaxOffset * 0.4}px, 0)`,
          willChange: 'transform'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-80px',
          left: '-80px',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, #e8d5b7 0%, transparent 70%)',
          opacity: 0.3,
          transform: `translate3d(0, ${parallaxOffset * 0.3}px, 0)`,
          willChange: 'transform'
        }} />

        {/* Section Title */}
        <div style={{
          textAlign: 'center',
          marginBottom: '60px',
          position: 'relative',
          zIndex: 1
        }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(32px, 5vw, 48px)',
            color: '#2C1810',
            margin: '0 0 16px 0',
            fontWeight: 600,
            letterSpacing: '1px'
          }}>
            Analytics Overview
          </h2>
          <div style={{
            width: '60px',
            height: '3px',
            background: 'linear-gradient(90deg, #8B6914, #DAA520)',
            margin: '0 auto',
            borderRadius: '2px'
          }} />
        </div>

        {/* Donut Charts Container */}
        <div style={{
          display: 'flex',
          gap: 'clamp(30px, 5vw, 60px)',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          marginBottom: '50px',
          position: 'relative',
          zIndex: 1
        }}>
          {/* Total Sales Chart */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            padding: '35px 25px',
            borderRadius: '24px',
            background: 'linear-gradient(145deg, #ffffff 0%, #faf5ef 100%)',
            boxShadow: '0 15px 50px rgba(139, 105, 20, 0.12)',
            border: '1px solid rgba(139, 105, 20, 0.08)',
            transition: 'all 0.4s ease',
            cursor: 'default',
            width: 'clamp(280px, 30vw, 340px)',
            position: 'relative'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-10px)';
            e.currentTarget.style.boxShadow = '0 25px 70px rgba(139, 105, 20, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 15px 50px rgba(139, 105, 20, 0.12)';
          }}
          >
            <span style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(16px, 2vw, 18px)',
              color: '#5C4033',
              fontWeight: 600,
              letterSpacing: '1.5px',
              textTransform: 'uppercase'
            }}>
              Total Sales
            </span>
            
            <div style={{
              width: '160px',
              height: '160px',
              position: 'relative'
            }}>
              <Doughnut data={totalSalesChart} options={chartOptions} />
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center'
              }}>
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '22px',
                  color: '#8B6914',
                  fontWeight: 700
                }}>
                  ₹245.9K
                </span>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 20px',
              borderRadius: '12px',
              background: 'rgba(139, 105, 20, 0.06)'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#8B6914'
              }} />
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '13px',
                color: '#5C4033',
                fontWeight: 500
              }}>
                78% of target achieved
              </span>
            </div>
          </div>

          {/* Total Profits Chart */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            padding: '35px 25px',
            borderRadius: '24px',
            background: 'linear-gradient(145deg, #ffffff 0%, #faf5ef 100%)',
            boxShadow: '0 15px 50px rgba(160, 82, 45, 0.12)',
            border: '1px solid rgba(160, 82, 45, 0.08)',
            transition: 'all 0.4s ease',
            cursor: 'default',
            width: 'clamp(280px, 30vw, 340px)',
            position: 'relative'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-10px)';
            e.currentTarget.style.boxShadow = '0 25px 70px rgba(160, 82, 45, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 15px 50px rgba(160, 82, 45, 0.12)';
          }}
          >
            <span style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(16px, 2vw, 18px)',
              color: '#5C4033',
              fontWeight: 600,
              letterSpacing: '1.5px',
              textTransform: 'uppercase'
            }}>
              Total Profits
            </span>
            
            <div style={{
              width: '160px',
              height: '160px',
              position: 'relative'
            }}>
              <Doughnut data={totalProfitsChart} options={chartOptions} />
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center'
              }}>
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '22px',
                  color: '#A0522D',
                  fontWeight: 700
                }}>
                  ₹85.3K
                </span>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 20px',
              borderRadius: '12px',
              background: 'rgba(160, 82, 45, 0.06)'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#A0522D'
              }} />
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '13px',
                color: '#5C4033',
                fontWeight: 500
              }}>
                65% profit margin
              </span>
            </div>
          </div>

          {/* New Users Chart */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            padding: '35px 25px',
            borderRadius: '24px',
            background: 'linear-gradient(145deg, #ffffff 0%, #faf5ef 100%)',
            boxShadow: '0 15px 50px rgba(218, 165, 32, 0.12)',
            border: '1px solid rgba(218, 165, 32, 0.08)',
            transition: 'all 0.4s ease',
            cursor: 'default',
            width: 'clamp(280px, 30vw, 340px)',
            position: 'relative'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-10px)';
            e.currentTarget.style.boxShadow = '0 25px 70px rgba(218, 165, 32, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 15px 50px rgba(218, 165, 32, 0.12)';
          }}
          >
            <span style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(16px, 2vw, 18px)',
              color: '#5C4033',
              fontWeight: 600,
              letterSpacing: '1.5px',
              textTransform: 'uppercase'
            }}>
              New Users
            </span>
            
            <div style={{
              width: '160px',
              height: '160px',
              position: 'relative'
            }}>
              <Doughnut data={newUsersChart} options={chartOptions} />
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center'
              }}>
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '22px',
                  color: '#DAA520',
                  fontWeight: 700
                }}>
                  +1.2K
                </span>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 20px',
              borderRadius: '12px',
              background: 'rgba(218, 165, 32, 0.06)'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#DAA520'
              }} />
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '13px',
                color: '#5C4033',
                fontWeight: 500
              }}>
                92% growth rate
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          marginTop: '20px',
          position: 'relative',
          zIndex: 1
        }}>
          <button
            style={{
              padding: '16px 40px',
              borderRadius: '12px',
              border: 'none',
              background: 'linear-gradient(135deg, #8B6914 0%, #A0522D 100%)',
              color: 'white',
              fontFamily: "'Inter', sans-serif",
              fontSize: '16px',
              fontWeight: 600,
              cursor: 'pointer',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              boxShadow: '0 8px 25px rgba(139, 105, 20, 0.3)',
              transition: 'all 0.3s ease'
            }}
            onClick={() =>
              navigate('/buyers', {
                state: { openAddBuyer: true }
              })
            }
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = '0 12px 35px rgba(139, 105, 20, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 8px 25px rgba(139, 105, 20, 0.3)';
            }}
          >
            Add Buyer
          </button>

          <button
            style={{
              padding: '16px 40px',
              borderRadius: '12px',
              border: '2px solid #8B6914',
              background: 'transparent',
              color: '#8B6914',
              fontFamily: "'Inter', sans-serif",
              fontSize: '16px',
              fontWeight: 600,
              cursor: 'pointer',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              transition: 'all 0.3s ease'
            }}
            // Update the Create Order button onClick:
            onClick={() => {
              sessionStorage.setItem('orderCart', JSON.stringify({}));
              window.location.href = '/create-order';
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'linear-gradient(135deg, #8B6914 0%, #A0522D 100%)';
              e.target.style.color = 'white';
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = '0 12px 35px rgba(139, 105, 20, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = '#8B6914';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            Create Order
          </button>
        </div>

        {/* Responsive adjustments */}
        <style>{`
          @media (max-width: 1000px) {
            .hero-cards-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            }
          }

          @media (max-width: 768px) {
            .hero-cards-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            }

            .card-overlay {
              opacity: 1 !important;
              background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 80%) !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
}

export default Homepage;