import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const DATA_USAGE_ACK_KEY = 'deathbed.dataUsageAcknowledged'

function DataUsageRoute() {
  const [isAcknowledged, setIsAcknowledged] = useState<boolean>(false)
  const [hasHydrated, setHasHydrated] = useState<boolean>(false)

  useEffect(() => {
    const storedValue = localStorage.getItem(DATA_USAGE_ACK_KEY)
    setIsAcknowledged(storedValue === 'true')
    setHasHydrated(true)
  }, [])

  const handleAcknowledgementChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const checked = event.target.checked
    setIsAcknowledged(checked)
    localStorage.setItem(DATA_USAGE_ACK_KEY, String(checked))
  }

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

          <div className="policy-info-block">
            <h2 className="policy-info-heading">Consent and policy information</h2>

            <div className="policy-info-list">
              <article className="policy-info-card">
                <h3 className="policy-info-title">Explicit consent is required</h3>
                <p className="policy-info-copy">
                  During onboarding, users must actively choose their consent
                  options before continuing. The app does not treat silence or
                  skipped fields as consent.
                </p>
              </article>

              <article className="policy-info-card">
                <h3 className="policy-info-title">You choose anonymised contribution</h3>
                <p className="policy-info-copy">
                  Users can choose whether their data may contribute in an
                  anonymised form to future shared insight features. This choice
                  is presented clearly during onboarding.
                </p>
              </article>

              <article className="policy-info-card">
                <h3 className="policy-info-title">Terms and Privacy are part of account access</h3>
                <p className="policy-info-copy">
                  The onboarding flow includes clear acknowledgement of the Terms
                  of Service and Privacy Policy so users know the rules and data
                  expectations before proceeding.
                </p>
              </article>
            </div>

            <div className="policy-links-panel">
              <p className="policy-links-copy">
                Policy entry points currently shown in onboarding:
              </p>

              <div className="policy-links-row">
                <a
                  href="/tos"
                  target="_blank"
                  rel="noreferrer"
                  className="policy-link-pill"
                >
                  Terms of Service
                </a>
                <a
                  href="/privacy"
                  target="_blank"
                  rel="noreferrer"
                  className="policy-link-pill"
                >
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>

          <div className="acknowledgement-block">
            <h2 className="acknowledgement-heading">Acknowledge this information</h2>

            <label className="acknowledgement-card" htmlFor="data-usage-acknowledged">
              <input
                id="data-usage-acknowledged"
                className="option-input"
                type="checkbox"
                checked={isAcknowledged}
                onChange={handleAcknowledgementChange}
              />
              <span className="acknowledgement-copy">
                I understand how my data may be used within DeathBed and I have
                reviewed the information shown on this page.
              </span>
            </label>

            {hasHydrated && isAcknowledged ? (
              <p className="acknowledgement-success">
                Your acknowledgement has been saved locally in this browser.
              </p>
            ) : (
              <p className="acknowledgement-helper">
                You must acknowledge this section before continuing.
              </p>
            )}
          </div>

          <div className="form-actions dual-actions">
            <Link className="button button-secondary button-link" to="/onboarding">
              Back to onboarding
            </Link>

            <Link
              className={`button button-primary button-link ${!isAcknowledged ? 'button-disabled' : ''}`}
              to={isAcknowledged ? '/decisions/new' : '#'}
              aria-disabled={!isAcknowledged}
              onClick={(event) => {
                if (!isAcknowledged) {
                  event.preventDefault()
                }
              }}
            >
              Continue
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DataUsageRoute