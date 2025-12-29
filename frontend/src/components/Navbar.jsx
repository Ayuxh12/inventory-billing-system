import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  // Hide navbar on login page
  if (!user) return null;

  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/dashboard">
        Inventory System
      </Link>

      <div>
        {/* Admin only */}
        {user.role === "admin" && (
          <>
            <Link className="btn btn-sm btn-light me-2" to="/categories">
              Categories
            </Link>
            <Link className="btn btn-sm btn-light me-2" to="/products">
              Products
            </Link>
          </>
        )}

        {/* Admin + Cashier */}
        <Link className="btn btn-sm btn-light me-2" to="/invoice">
          Invoice
        </Link>
        <Link className="btn btn-sm btn-light me-2" to="/reports">
          Reports
        </Link>

        <button className="btn btn-sm btn-danger" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
