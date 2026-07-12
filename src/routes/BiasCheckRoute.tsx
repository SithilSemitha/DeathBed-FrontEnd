import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

function BiasCheckRoute() {
  const [reasoningText, setReasoningText] = useState<string>('')

  const reasoningLength = reasoningText.trim().length

  const canCheckBiases = useMemo(() => {
    return reasoningLength >= 50
  }, [reasoningLength])

  return (
    <section className="screen-shell">
      <div className="screen-backdrop" />

      <div className="screen-content dashboard-content">
        <div className="dashboard-header">
          <div>
            <p className="step-label">Bias Check</p>
            <h1 className="screen-title">Explain your reasoning</h1>
            <p className="screen-subtitle">
              Write out why you are leaning toward one option. This helps the
              system identify patterns that may be influencing your judgment.
            </p>
          </div>

          <Link className="button button-secondary button-link" to="/decisions/new">
            Back to decision input
          </Link>
        </div>

        <div className="bias-layout">
          <section className="auth-card onboarding-card bias-form-card">
            <form
              className="bias-form"
              onSubmit={(event) => event.preventDefault()}
              noValidate
            >
              <label className="field-group">
                <span className="field-label">Your reasoning</span>
                <textarea
                  className="field-input bias-textarea"
                  value={reasoningText}
                  onChange={(event) => setReasoningText(event.target.value)}
                  placeholder="Example: I feel like staying in my current path is safer because I already know the work, but part of me worries that I might only be avoiding change because it feels uncomfortable."
                />
                <span className="field-helper bias-helper">
                  Minimum 50 characters. Be honest and specific — this works
                  best when you explain your actual thought process.
                </span>
              </label>

              <div className="bias-footer">
                <span className="decision-counter">
                  {reasoningLength} / minimum 50
                </span>

                <button
                  type="button"
                  className="button button-primary"
                  disabled={!canCheckBiases}
                >
                  Check for Biases
                </button>
              </div>
            </form>
          </section>

          <aside className="bias-side-card">
            <p className="step-label decision-side-step">Why this matters</p>
            <h2 className="decision-side-title">
              Better decisions need clearer reasoning
            </h2>
            <ul className="decision-side-list">
              <li>Reveal emotional assumptions</li>
              <li>Expose hidden decision patterns</li>
              <li>Prepare for later bias explanations</li>
              <li>Support deeper reflection before action</li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  )
}

export default BiasCheckRoute