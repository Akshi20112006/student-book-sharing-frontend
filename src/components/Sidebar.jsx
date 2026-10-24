import { NavLink } from "react-router-dom";

function Sidebar() {
  const links = [
    { to: "/dashboard", icon: "⌂", label: "Dashboard" },
    { to: "/books", icon: "▣", label: "Browse Books" },
    { to: "/add-book", icon: "+", label: "List a Book" },
    { to: "/my-listings", icon: "▤", label: "My Listings" },
    { to: "/requests", icon: "↔", label: "Requests" },
    { to: "/transactions", icon: "◷", label: "Transactions" },
    { to: "/reviews", icon: "★", label: "Reviews" },
    { to: "/profile", icon: "◯", label: "Profile" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="brand-mark">B</span>
        <span>BookShare</span>
      </div>

      <div className="sidebar-section">
        <p className="sidebar-label">Workspace</p>

        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <span className="sidebar-icon">{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </div>

      <div className="sidebar-bottom">
        <div className="sidebar-help">
          <strong>Need help?</strong>
          <span>We're here for you.</span>
          <button>Contact support</button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;