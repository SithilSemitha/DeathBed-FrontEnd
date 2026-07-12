import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

function SimilarStoriesRoute() {
  const [decisionContext, setDecisionContext] = useState<string>('')

  const contextLength = decisionContext.trim().length

  const canSearch = useMemo(() => {
    return contextLength >= 20
  }, [contextLength])

  return (
    <section className="screen-shell">
      <div className="screen-backdrop" />

      <div className="screen-content dashboard-content">
        <div className="dashboard-header">
          <div>
            <p className="step-label">Similar Stories</p>
            <h1 className="screen-title">Stories similar to your decision</h1>
            <p className="screen-subtitle">
              This section will later help users explore regret stories that are
              similar in meaning, not just matching keywords.
            </p>
          </div>

          <Link className="button button-secondary button-link" to="/decisions/new">
            Back to decision input
          </Link>
        </div>

        <div className="stories-layout">
          <section className="auth-card onboarding-card stories-main-card">
            <div className="stories-search-header">
              <h2 className="stories-section-title">Semantic story search</h2>
              <p className="stories-section-copy">
                Search results here are a frontend preview of where similar
                regret stories will appear once backend semantic matching is
                connected.
              </p>
            </div>

            <div className="stories-search-box">
              <label className="field-group">
                <span className="field-label">Decision context</span>
                <textarea
                  className="field-input stories-textarea"
                  value={decisionContext}
                  onChange={(event) => setDecisionContext(event.target.value)}
                  placeholder="Example: I am deciding whether to leave a secure career path for a more meaningful but less certain opportunity."
                />
                <span className="field-helper">
                  Later, the system will use this text to search for regret
                  stories with similar meaning.
                </span>
              </label>

              <div className="stories-search-footer">
                <span className="decision-counter">
                  {contextLength} / minimum 20
                </span>
                <button
                  type="button"
                  className="button button-primary"
                  disabled={!canSearch}
                >
                  Find Similar Stories
                </button>
              </div>
            </div>

            <div className="stories-results-list">
              <article className="story-result-card">
                <p className="story-result-label">Story Preview 1</p>
                <h3 className="story-result-title">
                  Leaving a stable role for uncertain work
                </h3>
                <p className="story-result-copy">
                  A story about someone who left a predictable path to pursue
                  more meaningful work, later reflecting on trade-offs between
                  safety and fulfillment.
                </p>
              </article>

              <article className="story-result-card">
                <p className="story-result-label">Story Preview 2</p>
                <h3 className="story-result-title">
                  Choosing risk for long-term growth
                </h3>
                <p className="story-result-copy">
                  A story about accepting short-term instability in exchange for
                  long-term career growth, and the regret signals that appeared
                  along the way.
                </p>
              </article>

              <article className="story-result-card">
                <p className="story-result-label">Story Preview 3</p>
                <h3 className="story-result-title">
                  Staying with the familiar option too long
                </h3>
                <p className="story-result-copy">
                  A story about delaying change because the known path felt
                  safer, followed by reflection on missed opportunities.
                </p>
              </article>
            </div>
          </section>

          <aside className="stories-side-card">
            <p className="step-label decision-side-step">Why this matters</p>
            <h2 className="decision-side-title">
              Meaning matters more than exact words
            </h2>
            <ul className="decision-side-list">
              <li>Find similar stories by real situation, not wording alone</li>
              <li>Support more relevant profile matching later</li>
              <li>Help users compare emotional and practical outcomes</li>
              <li>Prepare for stronger insight before decision commitment</li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  )
}

export default SimilarStoriesRoute