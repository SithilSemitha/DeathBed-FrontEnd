import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

type DetectedBias = {
  name: string
  confidence: string
  summary: string
  explanation: string
  guidanceQuestion: string
}

const mockBiasResults: DetectedBias[] = [
  {
    name: 'Status Quo Bias',
    confidence: 'High confidence',
    summary:
      'Your reasoning suggests you may be favoring the familiar option partly because it feels safer than change.',
    explanation:
      'Status quo bias happens when the current option feels safer simply because it is already familiar, not necessarily because it is better.',
    guidanceQuestion:
      'If both options were equally unfamiliar, would you still choose the same path?',
  },
  {
    name: 'Loss Aversion',
    confidence: 'Moderate confidence',
    summary:
      'You appear to focus more on what you might lose than what you might gain by choosing differently.',
    explanation:
      'Loss aversion means potential losses feel heavier than equivalent gains, which can make one option feel riskier than it objectively is.',
    guidanceQuestion:
      'Are you protecting something important, or are you over-weighting the fear of losing it?',
  },
  {
    name: 'Overthinking / Analysis Paralysis',
    confidence: 'Low confidence',
    summary:
      'There are signs that uncertainty itself may be slowing your decision more than the actual decision quality demands.',
    explanation:
      'Analysis paralysis can happen when the search for certainty becomes so strong that it delays action even when enough information already exists.',
    guidanceQuestion:
      'What would you decide if you accepted that no option will ever feel 100% certain?',
  },
]

function runMockBiasCheck(text: string): Promise<DetectedBias[]> {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      if (text.toLowerCase().includes('error-demo')) {
        reject(new Error('Bias analysis is temporarily unavailable. Please try again.'))
        return
      }

      resolve(mockBiasResults)
    }, 900)
  })
}

function BiasCheckRoute() {
  const [reasoningText, setReasoningText] = useState<string>('')
  const [biasResults, setBiasResults] = useState<DetectedBias[]>([])
  const [hasCheckedBiases, setHasCheckedBiases] = useState<boolean>(false)
  const [isCheckingBiases, setIsCheckingBiases] = useState<boolean>(false)
  const [requestError, setRequestError] = useState<string>('')

  const reasoningLength = reasoningText.trim().length

  const canCheckBiases = useMemo(() => {
    return reasoningLength >= 50
  }, [reasoningLength])

  const handleCheckBiases = async () => {
    if (!canCheckBiases) {
      return
    }

    setRequestError('')
    setIsCheckingBiases(true)
    setHasCheckedBiases(false)

    try {
      const results = await runMockBiasCheck(reasoningText.trim())
      setBiasResults(results)
      setHasCheckedBiases(true)
    } catch (error) {
      setBiasResults([])
      setHasCheckedBiases(false)
      setRequestError(
        error instanceof Error
          ? error.message
          : 'Could not check for biases right now. Please try again.',
      )
    } finally {
      setIsCheckingBiases(false)
    }
  }

  const handleReasoningChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setReasoningText(event.target.value)
    setRequestError('')

    if (hasCheckedBiases) {
      setHasCheckedBiases(false)
      setBiasResults([])
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
              {requestError ? (
                <div className="status-banner status-banner-error">
                  {requestError}
                </div>
              ) : null}

              <label className="field-group">
                <span className="field-label">Your reasoning</span>
                <textarea
                  className="field-input bias-textarea"
                  value={reasoningText}
                  onChange={handleReasoningChange}
                  placeholder="Example: I feel like staying in my current path is safer because I already know the work, but part of me worries that I might only be avoiding change because it feels uncomfortable."
                  disabled={isCheckingBiases}
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
                  disabled={!canCheckBiases || isCheckingBiases}
                  onClick={handleCheckBiases}
                >
                  {isCheckingBiases ? 'Checking for Biases...' : 'Check for Biases'}
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
                  {biasResults.map((bias) => (
                    <article key={bias.name} className="bias-result-card">
                      <div className="bias-result-header">
                        <h3 className="bias-result-title">{bias.name}</h3>
                        <span className="bias-result-confidence">
                          {bias.confidence}
                        </span>
                      </div>

                      <p className="bias-result-copy">{bias.summary}</p>

                      <div className="bias-detail-block">
                        <h4 className="bias-detail-title">What this means</h4>
                        <p className="bias-detail-copy">{bias.explanation}</p>
                      </div>

                      <div className="bias-guidance-block">
                        <h4 className="bias-detail-title">
                          Reflection question
                        </h4>
                        <p className="bias-guidance-copy">
                          {bias.guidanceQuestion}
                        </p>
                      </div>
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