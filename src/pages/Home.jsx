import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <div className="landing-page">
      <Navbar />

      <section className="hero">
        <div className="hero-content">
          <div className="eyebrow">
            <span>✦</span>
            Student-powered book exchange
          </div>

          <h1>
            Give books a second life.
            <span> Share knowledge.</span>
          </h1>

          <p>
            BookShare helps students buy, sell, exchange and discover
            academic books within their community — simply and securely.
          </p>

          <div className="hero-actions">
            <Link to="/books" className="btn btn-primary btn-large">
              Explore Books →
            </Link>

            <Link to="/register" className="btn btn-secondary btn-large">
              Start Sharing
            </Link>
          </div>

          <div className="hero-trust">
            <div>
              <strong>1,200+</strong>
              <span>Books shared</span>
            </div>

            <div>
              <strong>850+</strong>
              <span>Students</span>
            </div>

            <div>
              <strong>4.8/5</strong>
              <span>Community rating</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="floating-card floating-card-one">
            <span>✓</span>
            <div>
              <strong>Request approved</strong>
              <small>Database Management Systems</small>
            </div>
          </div>

          <div className="hero-book-stack">
            <div className="hero-book book-one">
              <span>DBMS</span>
            </div>
            <div className="hero-book book-two">
              <span>JAVA</span>
            </div>
            <div className="hero-book book-three">
              <span>NETWORKS</span>
            </div>
          </div>

          <div className="floating-card floating-card-two">
            <span>★</span>
            <div>
              <strong>4.9 rating</strong>
              <small>Trusted student community</small>
            </div>
          </div>
        </div>
      </section>

      <section className="feature-section">
        <div className="section-heading centered">
          <span className="eyebrow">Everything in one place</span>
          <h2>A smarter way to share textbooks</h2>
          <p>
            From discovering books to completing transactions, BookShare
            brings the complete process into one simple platform.
          </p>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <span className="feature-icon">⌕</span>
            <h3>Discover</h3>
            <p>Search and filter textbooks based on your academic needs.</p>
          </div>

          <div className="feature-card">
            <span className="feature-icon">↗</span>
            <h3>Share</h3>
            <p>List your used books and make them available to other students.</p>
          </div>

          <div className="feature-card">
            <span className="feature-icon">↔</span>
            <h3>Connect</h3>
            <p>Request books and manage exchanges through one workflow.</p>
          </div>

          <div className="feature-card">
            <span className="feature-icon">★</span>
            <h3>Trust</h3>
            <p>Build a reliable community through ratings and reviews.</p>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="brand">
          <span className="brand-mark">B</span>
          BookShare
        </div>
        <span>Built for students, powered by community.</span>
      </footer>
    </div>
  );
}

export default Home;