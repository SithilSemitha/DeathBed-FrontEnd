import { Link } from 'react-router-dom'

function ForgotPasswordRoute() {
  return (
    <section className="screen-shell">
      <div className="screen-backdrop" />

      <div className="screen-content">
        <div className="auth-card onboarding-card auth-page-card">
          <p className="step-label">Password Reset</p>

          <h1 className="screen-title">Forgot your password?</h1>

          <p className="screen-subtitle">
            This screen is now connected from the login page. We will build the
            reset request form in the next subtask.
          </p>

          <div className="form-actions dual-actions">
            <Link className="button button-secondary button-link" to="/login">
              Back to login
            </Link>

            <button type="button" className="button button-primary" disabled>
              Request Reset Link
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ForgotPasswordRoute