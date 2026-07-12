import { Link } from 'react-router-dom'

function JournalHistoryRoute() {
  return (
    <section className="screen-shell">
      <div className="screen-backdrop" />

      <div className="screen-content dashboard-content">
        <div className="dashboard-header">
          <div>
            <p className="step-label">Pre-Mortem Journals</p>
            <h1 className="screen-title">Your journal history</h1>
            <p className="screen-subtitle">
              Review the reflection entries you created while thinking through
              difficult decisions over time.
            </p>
          </div>

          <Link className="button button-secondary button-link" to="/dashboard">
            Back to dashboard
          </Link>
        </div>

        <div className="journal-history-layout">
          <section className="journal-history-main">
            <div className="journal-history-header-card">
              <h2 className="journal-history-title">Saved journals</h2>
              <p className="journal-history-copy">
                This page will later show all completed and in-progress
                Pre-Mortem journals linked to your account.
              </p>
            </div>

            <div className="journal-history-list">
              <article className="journal-history-card">
                <div className="journal-history-card-top">
                  <span className="journal-status-pill journal-status-complete">
                    Completed
                  </span>
                  <span className="journal-history-date">22 Jun 2026</span>
                </div>
                <h3 className="journal-history-card-title">
                  Career change reflection journal
                </h3>
                <p className="journal-history-card-copy">
                  A completed pre-mortem journal exploring whether changing to a
                  lower-paying but more meaningful path would create future
                  regret.
                </p>
              </article>

              <article className="journal-history-card">
                <div className="journal-history-card-top">
                  <span className="journal-status-pill journal-status-draft">
                    In Progress
                  </span>
                  <span className="journal-history-date">20 Jun 2026</span>
                </div>
                <h3 className="journal-history-card-title">
                  Study abroad decision journal
                </h3>
                <p className="journal-history-card-copy">
                  A partially completed reflection about moving abroad for
                  postgraduate study and the trade-offs involved.
                </p>
              </article>

              <article className="journal-history-card">
                <div className="journal-history-card-top">
                  <span className="journal-status-pill journal-status-complete">
                    Completed
                  </span>
                  <span className="journal-history-date">14 Jun 2026</span>
                </div>
                <h3 className="journal-history-card-title">
                  Relationship future-risk journal
                </h3>
                <p className="journal-history-card-copy">
                  A completed journal focused on identifying possible future
                  regrets around staying in or leaving a relationship.
                </p>
              </article>
            </div>
          </section>

          <aside className="journal-history-side-card">
            <p className="step-label decision-side-step">Why this matters</p>
            <h2 className="decision-side-title">
              Your thinking can be reviewed over time
            </h2>
            <ul className="decision-side-list">
              <li>Track how your reasoning changed</li>
              <li>Revisit earlier fears and assumptions</li>
              <li>Compare completed and incomplete reflections</li>
              <li>Prepare future export and reopening flows</li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  )
}

export default JournalHistoryRoute