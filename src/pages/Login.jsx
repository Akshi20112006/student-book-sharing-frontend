import { Link, useNavigate } from "react-router-dom";
import { loginStudent } from "../services/api";

function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value.trim().toLowerCase();
    const password = e.target.password.value;

    try {
      const student = await loginStudent(email, password);

      localStorage.setItem("student", JSON.stringify(student));

      alert("Login successful!");

      navigate("/dashboard");

    } catch (error) {
      console.error("LOGIN ERROR:", error);
      alert(error.message || "Unable to sign in. Please try again.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-panel">

        <div className="auth-brand">
          <span className="brand-mark">B</span>
          <span>BookShare</span>
        </div>

        <div className="auth-content">

          <span className="eyebrow">Welcome back</span>

          <h1>Sign in to your account</h1>

          <p>
            Access your books, requests and transactions.
          </p>

          <form className="form" onSubmit={handleSubmit}>

            <label>
              College Email
              <input
                type="email"
                name="email"
                placeholder="you@college.edu"
                required
              />
            </label>

            <label>
              Password
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                required
              />
            </label>

            <div className="form-row">
              <label className="checkbox-label">
                <input type="checkbox" />
                Remember me
              </label>

              <a href="#forgot">Forgot password?</a>
            </div>

            <button
              className="btn btn-primary btn-full"
              type="submit"
            >
              Sign In
            </button>

          </form>

          <p className="auth-switch">
            Don't have an account?{" "}
            <Link to="/register">Create one</Link>
          </p>

        </div>
      </div>

      <div className="auth-visual">
        <div className="auth-quote">
          <span>“</span>

          <h2>
            The right book at the right time can change everything.
          </h2>

          <p>BookShare community</p>
        </div>
      </div>

    </div>
  );
}

export default Login;