import React, { useState } from "react";
import { Droplet } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "https://billingproject-main.onrender.com/api/v1/Auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const result = await response.json();

      console.log(result);

      const token =
        result?.token ||
        result?.data?.token ||
        result?.accessToken ||
        result?.data?.accessToken;

      if (!response.ok) {
        throw new Error(result?.message || "Login failed");
      }

      if (token) {
        sessionStorage.setItem("token", token);

        navigate("/");
      } else {
        throw new Error("Token not found in response");
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Left Side */}
        <div className="login-left">
          <div className="logo-row">
            <Droplet size={40} />
            <h1 className="logo-text">AQUA</h1>
          </div>

          <h2 className="welcome-title">Welcome Back</h2>

          <p className="welcome-text">
            Access your Aqua dashboard to manage catalogs,
            invoices, customers, reports and orders from one place.
          </p>

          <div className="info-card">
            <p>
              Premium inventory and business management platform.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="login-right">
          <h2 className="login-title">Sign In</h2>

          <p className="login-subtitle">
            Enter your credentials to continue.
          </p>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">
                Username
              </label>

              <input
                type="text"
                placeholder="Enter username"
                className="form-input"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                className="form-input"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />
            </div>

            <div className="options-row">
              <label className="remember-me">
                <input type="checkbox" />
                Remember me
              </label>

              <a className="forgot-link" href="/forgot-password">
                Forgot Password?
              </a>
            </div>

            {error && (
              <p
                style={{
                  color: "red",
                  marginBottom: "12px",
                }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;