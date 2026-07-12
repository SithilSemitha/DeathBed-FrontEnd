import { useState } from 'react'
import { Link } from 'react-router-dom'

function RegretRatingRoute() {
  const [selectedScore, setSelectedScore] = useState<number | null>(null)

  return (
    <section className="screen-shell">
      <div className="screen-backdrop" />

      <div className="screen-content dashboard-content">
        <div className="dashboard-header">
          <div>
            <p className="step-label">Regret Rating</p>
            <h1 className="screen-title">How much regret do you anticipate?</h1>
            <p className="screen-subtitle">
              Before moving forward, rate your potential future regret on a
              scale from 1 to 10. This is a reflection checkpoint, not a final
              decision.
            </p>
          </div>

          <Link className="button button-secondary button-link" to="/bias-check">
            Back to bias check
          </Link>
        </div>

        <div className="regret-layout">
          <section className="auth-card onboarding-card regret-card">
            <div className="regret-intro-block">
              <h2 className="regret-intro-title">Regret scale</h2>
              <p className="regret-intro-copy">
                1 means very little anticipated regret. 10 means extremely high
                anticipated regret if this decision goes badly.
              </p>
            </div>

            <div className="regret-scale">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                <button
                  key={value}
                  type="button"
                  className={`regret-score-button ${
                    selectedScore === value ? 'regret-score-button-active' : ''
                  }`}
                  onClick={() => setSelectedScore(value)}
                >
                  {value}
                </button>
              ))}
            </div>

            <div className="regret-guidance-panel">
              <h3 className="regret-guidance-title">What this helps with</h3>
              <p className="regret-guidance-copy">
                This score helps the user pause and reflect before moving
                forward. Later subtasks will use this input to trigger warnings
                and guide the next step.
              </p>
            </div>

            <div className="regret-footer">
              <span className="decision-counter">
                {selectedScore
                  ? `Selected score: ${selectedScore} / 10`
                  : 'No score selected yet'}
              </span>

              <button
                type="button"
                className="button button-primary"
                disabled={selectedScore === null}
              >
                Continue
              </button>
            </div>
          </section>

          <aside className="regret-side-card">
            <p className="step-label decision-side-step">Reflection checkpoint</p>
            <h2 className="decision-side-title">
              A strong decision needs emotional honesty
            </h2>
            <ul className="decision-side-list">
              <li>Encourages pause before commitment</li>
              <li>Surfaces emotional risk early</li>
              <li>Prepares later warning and guidance states</li>
              <li>Supports more deliberate decision-making</li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  )
}

export default RegretRatingRoute