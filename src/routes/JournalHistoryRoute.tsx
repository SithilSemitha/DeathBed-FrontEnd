import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

type JournalHistoryItem = {
  id: string
  title: string
  status: 'Completed' | 'In Progress'
  date: string
  summary: string
}

const mockJournalHistory: JournalHistoryItem[] = [
  {
    id: 'journal-1',
    title: 'Career change reflection journal',
    status: 'Completed',
    date: '22 Jun 2026',
    summary:
      'A completed pre-mortem journal exploring whether changing to a lower-paying but more meaningful path would create future regret.',
  },
  {
    id: 'journal-2',
    title: 'Study abroad decision journal',
    status: 'In Progress',
    date: '20 Jun 2026',
    summary:
      'A partially completed reflection about moving abroad for postgraduate study and the trade-offs involved.',
  },
  {
    id: 'journal-3',
    title: 'Relationship future-risk journal',
    status: 'Completed',
    date: '14 Jun 2026',
    summary:
      'A completed journal focused on identifying possible future regrets around staying in or leaving a relationship.',
  },
]

function fetchMockJournalHistory(): Promise<JournalHistoryItem[]> {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve(mockJournalHistory)
    }, 900)
  })
}

function JournalHistoryRoute() {
  const [journals, setJournals] = useState<JournalHistoryItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [loadError, setLoadError] = useState<string>('')

  useEffect(() => {
    let isMounted = true

    async function loadJournalHistory() {
      setIsLoading(true)
      setLoadError('')

      try {
        const data = await fetchMockJournalHistory()

        if (!isMounted) {
          return
        }

        setJournals(data)
      } catch {
        if (!isMounted) {
          return
        }

        setLoadError('Could not load journal history right now. Please try again.')
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadJournalHistory()

    return () => {
      isMounted = false
    }
  }, [])

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

            {loadError ? (
              <div className="status-banner status-banner-error">{loadError}</div>
            ) : null}

            {isLoading ? (
              <div className="journal-history-header-card">
                <h2 className="journal-history-title">Loading journals...</h2>
                <p className="journal-history-copy">
                  Fetching your saved journal history.
                </p>
              </div>
            ) : null}

            {!isLoading && !loadError && journals.length === 0 ? (
              <div className="journal-history-header-card">
                <h2 className="journal-history-title">No journals yet</h2>
                <p className="journal-history-copy">
                  Your saved Pre-Mortem journals will appear here once they are
                  created.
                </p>
              </div>
            ) : null}

            {!isLoading && !loadError && journals.length > 0 ? (
              <div className="journal-history-list">
                {journals.map((journal) => (
                  <article key={journal.id} className="journal-history-card">
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
                    <h3 className="journal-history-card-title">{journal.title}</h3>
                    <p className="journal-history-card-copy">{journal.summary}</p>
                  </article>
                ))}
              </div>
            ) : null}
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