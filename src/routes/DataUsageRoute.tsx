import { Link } from 'react-router-dom'

function DataUsageRoute() {
  return (
    <section className="screen-shell">
      <div className="screen-backdrop" />

      <div className="screen-content">
        <div className="auth-card onboarding-card">
          <p className="step-label">Data Usage</p>

          <h1 className="screen-title">How your data is used</h1>

          <p className="screen-subtitle">
            This section explains, in plain English, how DeathBed uses the
            information you provide during onboarding and decision analysis.
          </p>

          <div className="info-panel">
            <p className="info-copy">
              We are creating this section now so users have a clear, dedicated
              place to understand data handling inside the app.
            </p>
          </div>

          <div className="form-actions dual-actions">
            <Link className="button button-secondary button-link" to="/onboarding">
              Back to onboarding
            </Link>

            <Link className="button button-primary button-link" to="/decisions/new">
              Continue
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DataUsageRoute