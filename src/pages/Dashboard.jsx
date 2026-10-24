import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
    return (
        <div className="dashboard">

            {/* SIDEBAR */}
            <aside className="sidebar">

                <div className="logo">
                    <div className="logo-icon">📚</div>
                    <div>
                        <h2>BookShare</h2>
                        <span>Student Community</span>
                    </div>
                </div>

                <nav className="sidebar-nav">

                    <Link to="/" className="nav-item active">
                        <span>🏠</span>
                        Dashboard
                    </Link>

                    <Link to="/books" className="nav-item">
                        <span>📚</span>
                        Browse Books
                    </Link>

                    <Link to="/list-book" className="nav-item">
                        <span>➕</span>
                        List a Book
                    </Link>

                    <Link to="/my-listings" className="nav-item">
                        <span>📋</span>
                        My Listings
                    </Link>

                    <Link to="/requests" className="nav-item">
                        <span>📩</span>
                        Requests
                    </Link>

                    <Link to="/transactions" className="nav-item">
                        <span>💳</span>
                        Transactions
                    </Link>

                    <Link to="/reviews" className="nav-item">
                        <span>⭐</span>
                        Reviews
                    </Link>

                    <Link to="/profile" className="nav-item">
                        <span>👤</span>
                        Profile
                    </Link>

                </nav>

                <div className="sidebar-bottom">
                    <div className="help-box">
                        <div>💡</div>
                        <strong>Need help?</strong>
                        <p>Find answers about sharing books.</p>
                        <button>Help Center</button>
                    </div>

                    <div className="logout">
                        <span>↪</span>
                        Logout
                    </div>
                </div>

            </aside>


            {/* MAIN CONTENT */}
            <main className="main-content">

                {/* TOP BAR */}
                <header className="topbar">

                    <div className="search-box">
                        <span>⌕</span>
                        <input
                            type="text"
                            placeholder="Search books, authors or subjects..."
                        />
                    </div>

                    <div className="top-actions">

                        <button className="notification">
                            🔔
                            <span className="notification-dot"></span>
                        </button>

                        <div className="user-profile">
                            <div className="avatar">A</div>

                            <div>
                                <strong>Student</strong>
                                <small>Student Account</small>
                            </div>

                            <span>⌄</span>
                        </div>

                    </div>

                </header>


                {/* PAGE CONTENT */}
                <section className="content">

                    {/* WELCOME */}
                    <div className="welcome-section">

                        <div>
                            <p className="welcome-label">WELCOME BACK 👋</p>

                            <h1>
                                Your Book Sharing
                                <span> Dashboard</span>
                            </h1>

                            <p className="welcome-text">
                                Discover textbooks, share your books and connect
                                with students in your community.
                            </p>
                        </div>

                        <Link to="/list-book" className="primary-button">
                            + List a Book
                        </Link>

                    </div>


                    {/* STATISTICS */}
                    <div className="stats-grid">

                        <div className="stat-card">
                            <div className="stat-icon purple">📚</div>

                            <div>
                                <span>Books Listed</span>
                                <h2>12</h2>
                                <small>↑ 3 this month</small>
                            </div>
                        </div>


                        <div className="stat-card">
                            <div className="stat-icon blue">📩</div>

                            <div>
                                <span>Active Requests</span>
                                <h2>04</h2>
                                <small>2 awaiting response</small>
                            </div>
                        </div>


                        <div className="stat-card">
                            <div className="stat-icon green">💰</div>

                            <div>
                                <span>Total Earnings</span>
                                <h2>₹4,850</h2>
                                <small>↑ 12% this month</small>
                            </div>
                        </div>


                        <div className="stat-card">
                            <div className="stat-icon orange">⭐</div>

                            <div>
                                <span>Your Rating</span>
                                <h2>4.8</h2>
                                <small>Based on 18 reviews</small>
                            </div>
                        </div>

                    </div>


                    {/* TWO COLUMN SECTION */}
                    <div className="dashboard-grid">

                        {/* RECENT LISTINGS */}
                        <section className="dashboard-card">

                            <div className="card-header">
                                <div>
                                    <h2>Recent Listings</h2>
                                    <p>Books recently added by students</p>
                                </div>

                                <Link to="/books">
                                    View all →
                                </Link>
                            </div>


                            <div className="book-list">

                                <div className="book-row">

                                    <div className="book-cover purple-cover">
                                        DSA
                                    </div>

                                    <div className="book-info">
                                        <h3>Data Structures & Algorithms</h3>
                                        <p>Mark Allen Weiss</p>
                                        <span>Engineering • 3rd Edition</span>
                                    </div>

                                    <div className="book-price">
                                        <strong>₹350</strong>
                                        <small>Available</small>
                                    </div>

                                </div>


                                <div className="book-row">

                                    <div className="book-cover blue-cover">
                                        DBMS
                                    </div>

                                    <div className="book-info">
                                        <h3>Database Management Systems</h3>
                                        <p>Raghu Ramakrishnan</p>
                                        <span>Computer Science • 2nd Edition</span>
                                    </div>

                                    <div className="book-price">
                                        <strong>₹420</strong>
                                        <small>Available</small>
                                    </div>

                                </div>


                                <div className="book-row">

                                    <div className="book-cover green-cover">
                                        OS
                                    </div>

                                    <div className="book-info">
                                        <h3>Operating System Concepts</h3>
                                        <p>Silberschatz</p>
                                        <span>Computer Science • 10th Edition</span>
                                    </div>

                                    <div className="book-price">
                                        <strong>₹500</strong>
                                        <small>Available</small>
                                    </div>

                                </div>

                            </div>

                        </section>


                        {/* QUICK ACTIONS */}
                        <section className="dashboard-card">

                            <div className="card-header">
                                <div>
                                    <h2>Quick Actions</h2>
                                    <p>Manage your activity</p>
                                </div>
                            </div>


                            <div className="quick-actions">

                                <Link to="/books" className="quick-action">
                                    <div>🔎</div>
                                    <span>
                                        <strong>Find a Book</strong>
                                        <small>Browse available books</small>
                                    </span>
                                    <b>→</b>
                                </Link>


                                <Link to="/list-book" className="quick-action">
                                    <div>📖</div>
                                    <span>
                                        <strong>Share a Book</strong>
                                        <small>Create a new listing</small>
                                    </span>
                                    <b>→</b>
                                </Link>


                                <Link to="/requests" className="quick-action">
                                    <div>📩</div>
                                    <span>
                                        <strong>Manage Requests</strong>
                                        <small>Review incoming requests</small>
                                    </span>
                                    <b>→</b>
                                </Link>


                                <Link to="/transactions" className="quick-action">
                                    <div>💳</div>
                                    <span>
                                        <strong>Transactions</strong>
                                        <small>View your transactions</small>
                                    </span>
                                    <b>→</b>
                                </Link>

                            </div>

                        </section>

                    </div>


                    {/* ACTIVITY */}
                    <section className="dashboard-card activity-card">

                        <div className="card-header">

                            <div>
                                <h2>Recent Activity</h2>
                                <p>Your latest book sharing activity</p>
                            </div>

                            <Link to="/transactions">
                                View history →
                            </Link>

                        </div>


                        <div className="activity-list">

                            <div className="activity-item">
                                <div className="activity-icon green">
                                    ✓
                                </div>

                                <div>
                                    <strong>Book request completed</strong>
                                    <p>Data Structures & Algorithms</p>
                                </div>

                                <span>2 hours ago</span>
                            </div>


                            <div className="activity-item">
                                <div className="activity-icon blue">
                                    📩
                                </div>

                                <div>
                                    <strong>New request received</strong>
                                    <p>Operating System Concepts</p>
                                </div>

                                <span>Yesterday</span>
                            </div>


                            <div className="activity-item">
                                <div className="activity-icon orange">
                                    ⭐
                                </div>

                                <div>
                                    <strong>You received a review</strong>
                                    <p>"Great condition and smooth transaction."</p>
                                </div>

                                <span>2 days ago</span>
                            </div>

                        </div>

                    </section>

                </section>

            </main>

        </div>
    );
}

export default Dashboard;