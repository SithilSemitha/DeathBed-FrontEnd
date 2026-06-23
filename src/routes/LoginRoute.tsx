import { Link } from 'react-router-dom'

function LoginRoute() {
  return (
    <section className="screen-shell">
      <div className="screen-backdrop" />

      <div className="screen-content">
        <div className="auth-card onboarding-card auth-page-card">
          <p className="step-label">Account Access</p>

          <h1 className="screen-title">Log in</h1>

          <p className="screen-subtitle">
            Access your saved decisions, analysis history, and account features.
          </p>

          <form className="auth-form-stack">
            <label className="field-group">
              <span className="field-label">Email</span>
              <input
                className="field-input"
                type="email"
                placeholder="Enter your email"
              />
            </label>

            <label className="field-group">
              <span className="field-label">Password</span>
              <input
                className="field-input"
                type="password"
                placeholder="Enter your password"
              />
            </label>

            <div className="auth-inline-actions">
              <Link className="inline-link" to="/forgot-password">
                Forgot Password?
              </Link>
            </div>

            <button type="button" className="button button-primary">
              Log In
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default LoginRoute