import { Link } from 'react-router-dom'

type SavedOnboardingPayload = {
  consent: {
    acceptTos: boolean
    acceptPrivacyPolicy: boolean
    contributeAnonymously: boolean
  }
  profile: {
    firstName: string
    ageYears: number
    country: string
    incomeBracket: string
    relationshipStatus: string
  }
}

function DecisionInputRoute() {
  let savedPayload: SavedOnboardingPayload | null = null

  try {
    const rawPayload = localStorage.getItem('deathbed.onboarding.payload')

    if (rawPayload) {
      savedPayload = JSON.parse(rawPayload) as SavedOnboardingPayload
    }
  } catch {
    savedPayload = null
  }

  return (
    <section className="screen-shell">
      <div className="screen-backdrop" />

      <div className="screen-content">
        <div className="auth-card onboarding-card">
          <p className="step-label">Onboarding Complete</p>

          <h1 className="screen-title">What decision are you weighing?</h1>

          <p className="screen-subtitle">
            Your profile flow is complete. This page confirms the app now moves
            correctly from onboarding into the next product stage.
          </p>

          {savedPayload ? (
            <div className="info-panel">
              <p className="info-copy">
                Saved onboarding snapshot for this session:
              </p>

              <ul className="info-list">
                <li>
                  <strong>First name:</strong> {savedPayload.profile.firstName}
                </li>
                <li>
                  <strong>Age:</strong> {savedPayload.profile.ageYears}
                </li>
                <li>
                  <strong>Country:</strong> {savedPayload.profile.country}
                </li>
                <li>
                  <strong>Income bracket:</strong>{' '}
                  {savedPayload.profile.incomeBracket}
                </li>
                <li>
                  <strong>Relationship status:</strong>{' '}
                  {savedPayload.profile.relationshipStatus}
                </li>
              </ul>
            </div>
          ) : null}

          <div className="form-actions dual-actions">
            <Link className="button button-secondary button-link" to="/onboarding">
              Back to onboarding
            </Link>

            <Link className="button button-primary button-link" to="/matches">
              View Matched Profiles
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DecisionInputRoute