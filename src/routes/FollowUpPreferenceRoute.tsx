import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

type NotificationPreference = 'email' | 'in-app' | 'disabled' | ''

function FollowUpPreferenceRoute() {
  const [preference, setPreference] = useState<NotificationPreference>('')
  const [hasSavedPreference, setHasSavedPreference] = useState<boolean>(false)

  const canSavePreference = useMemo(() => {
    return preference !== ''
  }, [preference])

  const handlePreferenceChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPreference(event.target.value as NotificationPreference)
    setHasSavedPreference(false)
  }

  const handleSavePreference = () => {
    if (!canSavePreference) {
      return
    }

    localStorage.setItem('deathbed.followUpPreference', preference)
    setHasSavedPreference(true)
  }

  return (
    <section className="screen-shell">
      <div className="screen-backdrop" />

      <div className="screen-content dashboard-content">
        <div className="dashboard-header">
          <div>
            <p className="step-label">Follow-Up Notifications</p>
            <h1 className="screen-title">How should we remind you later?</h1>
            <p className="screen-subtitle">
              Choose how you want DeathBed to prompt you to revisit a saved
              decision and reflect on how it turned out.
            </p>
          </div>

          <Link className="button button-secondary button-link" to="/dashboard">
            Back to dashboard
          </Link>
        </div>

        <div className="followup-layout">
          <section className="auth-card onboarding-card followup-main-card">
            <div className="followup-block">
              <h2 className="followup-title">Notification preference</h2>
              <p className="followup-copy">
                This preference will later control how follow-up reminders are
                delivered after saving a decision.
              </p>

              <div className="followup-options">
                <label className="followup-option-card">
                  <input
                    className="option-input"
                    type="radio"
                    name="followUpPreference"
                    value="email"
                    checked={preference === 'email'}
                    onChange={handlePreferenceChange}
                  />
                  <div>
                    <span className="followup-option-title">Email reminder</span>
                    <p className="followup-option-copy">
                      Send a follow-up reminder by email later.
                    </p>
                  </div>
                </label>

                <label className="followup-option-card">
                  <input
                    className="option-input"
                    type="radio"
                    name="followUpPreference"
                    value="in-app"
                    checked={preference === 'in-app'}
                    onChange={handlePreferenceChange}
                  />
                  <div>
                    <span className="followup-option-title">In-app reminder</span>
                    <p className="followup-option-copy">
                      Show a reminder inside the app only.
                    </p>
                  </div>
                </label>

                <label className="followup-option-card">
                  <input
                    className="option-input"
                    type="radio"
                    name="followUpPreference"
                    value="disabled"
                    checked={preference === 'disabled'}
                    onChange={handlePreferenceChange}
                  />
                  <div>
                    <span className="followup-option-title">No reminder</span>
                    <p className="followup-option-copy">
                      Do not send a follow-up reminder.
                    </p>
                  </div>
                </label>
              </div>

              <div className="followup-footer">
                <span className="decision-counter">
                  {preference
                    ? `Selected: ${preference}`
                    : 'No preference selected yet'}
                </span>

                <button
                  type="button"
                  className="button button-primary"
                  disabled={!canSavePreference}
                  onClick={handleSavePreference}
                >
                  Save Preference
                </button>
              </div>
            </div>

            {hasSavedPreference ? (
              <div className="followup-reminder-panel">
                <p className="step-label followup-reminder-step-label">
                  Follow-Up Preview
                </p>
                <h2 className="understanding-title">How the reminder may appear</h2>
                <p className="understanding-copy">
                  This is a frontend preview of the reminder experience that can
                  appear after a saved decision.
                </p>

                <div className="followup-reminder-card">
                  <h3 className="followup-reminder-title">
                    Decision follow-up reminder
                  </h3>
                  <p className="followup-reminder-copy">
                    It&apos;s time to revisit one of your saved decisions and
                    reflect on how it turned out.
                  </p>
                  <p className="followup-reminder-meta">
                    Current reminder mode: <strong>{preference}</strong>
                  </p>

                  <div className="followup-reminder-actions">
                    <button type="button" className="button button-primary">
                      Update Outcome
                    </button>
                    <button type="button" className="button button-secondary">
                      Remind Me Later
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
          </section>

          <aside className="followup-side-card">
            <p className="step-label decision-side-step">Why this matters</p>
            <h2 className="decision-side-title">
              Reflection after time passes improves the product
            </h2>
            <ul className="decision-side-list">
              <li>Encourages users to revisit real outcomes later</li>
              <li>Helps the platform learn from follow-up reflections</li>
              <li>Supports better long-term decision intelligence</li>
              <li>Gives users control over reminder style</li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  )
}

export default FollowUpPreferenceRoute