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

          <div className="data-category-grid">
            <article className="data-category-card">
              <h2 className="data-category-title">Profile information</h2>
              <p className="data-category-copy">
                Basic onboarding details such as your age, country, income
                bracket, and relationship status.
              </p>
            </article>

            <article className="data-category-card">
              <h2 className="data-category-title">Account information</h2>
              <p className="data-category-copy">
                Sign-up and login details linked to your account, such as your
                email address and authentication status.
              </p>
            </article>

            <article className="data-category-card">
              <h2 className="data-category-title">Decision inputs</h2>
              <p className="data-category-copy">
                The life decisions, reflections, and related inputs you provide
                while using the product.
              </p>
            </article>

            <article className="data-category-card">
              <h2 className="data-category-title">Saved activity</h2>
              <p className="data-category-copy">
                Information connected to your personal app journey, such as
                saved analyses, journals, and future decision history.
              </p>
            </article>
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