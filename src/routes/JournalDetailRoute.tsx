import { Link, useParams } from 'react-router-dom'
import { getMockJournalById } from '../lib/journals'

function JournalDetailRoute() {
  const { journalId = '' } = useParams()
  const journal = getMockJournalById(journalId)

  if (!journal) {
    return (
      <section className="screen-shell">
        <div className="screen-backdrop" />

        <div className="screen-content dashboard-content">
          <div className="auth-card onboarding-card">
            <p className="step-label">Journal Detail</p>
            <h1 className="screen-title">Journal not found</h1>
            <p className="screen-subtitle">
              We could not find the journal you were trying to reopen.
            </p>

            <div className="form-actions single-action">
              <Link className="button button-secondary button-link" to="/journals">
                Back to journal history
              </Link>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="screen-shell">
      <div className="screen-backdrop" />

      <div className="screen-content dashboard-content">
        <div className="dashboard-header">
          <div>
            <p className="step-label">Journal Detail</p>
            <h1 className="screen-title">{journal.title}</h1>
            <p className="screen-subtitle">
              Reopened from your journal history so you can revisit or continue
              your reflection.
            </p>
          </div>

          <Link className="button button-secondary button-link" to="/journals">
            Back to journal history
          </Link>
        </div>

        <div className="journal-history-layout">
          <section className="journal-history-main">
            <article className="journal-history-card journal-detail-card">
              <div className="journal-history-card-top">
                <span
                  className={`journal-status-pill ${
                    journal.status === 'Completed'
                      ? 'journal-status-complete'
                      : 'journal-status-draft'
                  }`}
                >
                  {journal.status}
                </span>
                <span className="journal-history-date">{journal.date}</span>
              </div>

              <div className="journal-entry-meta-row">
                <span className="journal-entry-meta-pill">{journal.category}</span>
                <span className="journal-entry-meta-pill">
                  {journal.promptCount} prompts completed
                </span>
                <span className="journal-entry-meta-pill">
                  Updated {journal.lastUpdated}
                </span>
              </div>

              <p className="journal-history-card-copy">{journal.summary}</p>

              <div className="journal-entry-focus-block">
                <span className="journal-entry-focus-label">Reflection focus</span>
                <p className="journal-entry-focus-text">{journal.focus}</p>
              </div>

              <div className="journal-detail-body">
                <h3 className="journal-detail-body-title">Journal content preview</h3>
                <p className="journal-detail-body-copy">
                  This mock reopened view shows where the full journal content
                  will appear later. For now, it proves the frontend reopen/view
                  flow works correctly from the journal history page.
                </p>
              </div>
            </article>
          </section>

          <aside className="journal-history-side-card">
            <p className="step-label decision-side-step">What you can do here</p>
            <h2 className="decision-side-title">
              Revisit or continue earlier reflection
            </h2>
            <ul className="decision-side-list">
              <li>Review what you previously wrote</li>
              <li>Compare old concerns with current thinking</li>
              <li>Continue unfinished journal work</li>
              <li>Prepare future export actions</li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  )
}

export default JournalDetailRoute