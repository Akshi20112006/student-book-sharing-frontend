import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="brand">
        <span className="brand-mark">B</span>
        <span>BookShare</span>
      </Link>

      <nav className="nav-links">
        <Link to="/books">Browse Books</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/login" className="nav-login">
          Sign in
        </Link>
        <Link to="/register" className="btn btn-primary nav-button">
          Get Started
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;