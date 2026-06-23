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

          <div className="usage-purpose-block">
            <h2 className="usage-purpose-heading">Why we use this information</h2>

            <div className="usage-purpose-list">
              <article className="usage-purpose-card">
                <h3 className="usage-purpose-title">Personalise your experience</h3>
                <p className="usage-purpose-copy">
                  Your profile details help the app tailor future experiences so
                  the product feels relevant to your real life context instead of
                  showing generic results.
                </p>
              </article>

              <article className="usage-purpose-card">
                <h3 className="usage-purpose-title">Match you with similar people</h3>
                <p className="usage-purpose-copy">
                  Information like age, country, income bracket, and
                  relationship status helps the system compare your situation
                  with people whose decision paths are more statistically
                  similar to yours.
                </p>
              </article>

              <article className="usage-purpose-card">
                <h3 className="usage-purpose-title">Save your progress</h3>
                <p className="usage-purpose-copy">
                  Account and saved activity data allow you to come back later
                  and continue your decision journey instead of starting again
                  from the beginning.
                </p>
              </article>

              <article className="usage-purpose-card">
                <h3 className="usage-purpose-title">Support future analysis features</h3>
                <p className="usage-purpose-copy">
                  Decision-related inputs are used to support future features
                  like personalised analysis, reflection tools, and matched
                  outcome experiences inside the app.
                </p>
              </article>
            </div>
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