import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

type DetectedBias = {
  name: string
  confidence: string
  summary: string
}

const mockBiasResults: DetectedBias[] = [
  {
    name: 'Status Quo Bias',
    confidence: 'High confidence',
    summary:
      'Your reasoning suggests you may be favoring the familiar option partly because it feels safer than change.',
  },
  {
    name: 'Loss Aversion',
    confidence: 'Moderate confidence',
    summary:
      'You appear to focus more on what you might lose than what you might gain by choosing differently.',
  },
  {
    name: 'Overthinking / Analysis Paralysis',
    confidence: 'Low confidence',
    summary:
      'There are signs that uncertainty itself may be slowing your decision more than the actual decision quality demands.',
  },
]

function BiasCheckRoute() {
  const [reasoningText, setReasoningText] = useState<string>('')
  const [hasCheckedBiases, setHasCheckedBiases] = useState<boolean>(false)

  const reasoningLength = reasoningText.trim().length

  const canCheckBiases = useMemo(() => {
    return reasoningLength >= 50
  }, [reasoningLength])

  const handleCheckBiases = () => {
    if (!canCheckBiases) {
      return
    }

    setHasCheckedBiases(true)
  }

  const handleReasoningChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setReasoningText(event.target.value)

    if (hasCheckedBiases) {
      setHasCheckedBiases(false)
    }
  }

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
                  onChange={handleReasoningChange}
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
                  onClick={handleCheckBiases}
                >
                  Check for Biases
                </button>
              </div>
            </form>

            {hasCheckedBiases ? (
              <div className="bias-results-panel">
                <p className="step-label bias-results-step-label">
                  Bias Results
                </p>
                <h2 className="understanding-title">Possible patterns detected</h2>
                <p className="understanding-copy">
                  These results are a frontend mock preview of how detected
                  reasoning patterns can be presented.
                </p>

                <div className="bias-results-list">
                  {mockBiasResults.map((bias) => (
                    <article key={bias.name} className="bias-result-card">
                      <div className="bias-result-header">
                        <h3 className="bias-result-title">{bias.name}</h3>
                        <span className="bias-result-confidence">
                          {bias.confidence}
                        </span>
                      </div>
                      <p className="bias-result-copy">{bias.summary}</p>
                    </article>
                  ))}
                </div>
              </div>
            ) : null}
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