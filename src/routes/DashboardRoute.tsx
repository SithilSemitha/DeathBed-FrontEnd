import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

type DecisionHistoryItem = {
  id: string
  title: string
  savedAt: string
  category: string
}

type AnalysisHistoryItem = {
  id: string
  title: string
  lastOpened: string
  relatedDecision: string
  type: string
}

type JournalLinkItem = {
  id: string
  title: string
  status: 'Completed' | 'In Progress'
  relatedDecision: string
}

type DashboardView = 'all' | 'decisions' | 'analyses' | 'journals'

const mockDecisionHistory: DecisionHistoryItem[] = [
  {
    id: 'decision-1',
    title: 'Career change to startup',
    savedAt: 'Saved 2 days ago',
    category: 'Career',
  },
  {
    id: 'decision-2',
    title: 'Move abroad for postgraduate study',
    savedAt: 'Saved 1 week ago',
    category: 'Education',
  },
  {
    id: 'decision-3',
    title: 'Whether to stay in current relationship',
    savedAt: 'Saved 3 weeks ago',
    category: 'Relationship',
  },
]

const mockAnalysisHistory: AnalysisHistoryItem[] = [
  {
    id: 'analysis-1',
    title: 'Future trajectory summary',
    lastOpened: 'Last opened yesterday',
    relatedDecision: 'Career change to startup',
    type: 'Trajectory',
  },
  {
    id: 'analysis-2',
    title: 'Bias review snapshot',
    lastOpened: 'Last opened 4 days ago',
    relatedDecision: 'Move abroad for postgraduate study',
    type: 'Bias Check',
  },
  {
    id: 'analysis-3',
    title: 'Future self conversation',
    lastOpened: 'Last opened 1 week ago',
    relatedDecision: 'Whether to stay in current relationship',
    type: 'Chat',
  },
]

const mockJournalLinks: JournalLinkItem[] = [
  {
    id: 'journal-1',
    title: 'Career change reflection journal',
    status: 'Completed',
    relatedDecision: 'Career change to startup',
  },
  {
    id: 'journal-2',
    title: 'Study abroad decision journal',
    status: 'In Progress',
    relatedDecision: 'Move abroad for postgraduate study',
  },
]

function fetchMockDecisionHistory(): Promise<DecisionHistoryItem[]> {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve(mockDecisionHistory)
    }, 900)
  })
}

function fetchMockAnalysisHistory(): Promise<AnalysisHistoryItem[]> {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve(mockAnalysisHistory)
    }, 900)
  })
}

function fetchMockJournalLinks(): Promise<JournalLinkItem[]> {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve(mockJournalLinks)
    }, 900)
  })
}

function DashboardRoute() {
  const [activeView, setActiveView] = useState<DashboardView>('all')

  const [decisions, setDecisions] = useState<DecisionHistoryItem[]>([])
  const [isLoadingDecisions, setIsLoadingDecisions] = useState<boolean>(true)
  const [decisionLoadError, setDecisionLoadError] = useState<string>('')

  const [analyses, setAnalyses] = useState<AnalysisHistoryItem[]>([])
  const [isLoadingAnalyses, setIsLoadingAnalyses] = useState<boolean>(true)
  const [analysisLoadError, setAnalysisLoadError] = useState<string>('')

  const [journals, setJournals] = useState<JournalLinkItem[]>([])
  const [isLoadingJournals, setIsLoadingJournals] = useState<boolean>(true)
  const [journalLoadError, setJournalLoadError] = useState<string>('')

  useEffect(() => {
    let isMounted = true

    async function loadDecisionHistory() {
      setIsLoadingDecisions(true)
      setDecisionLoadError('')

      try {
        const data = await fetchMockDecisionHistory()

        if (!isMounted) {
          return
        }

        setDecisions(data)
      } catch {
        if (!isMounted) {
          return
        }

        setDecisionLoadError(
          'Could not load past decisions right now. Please try again.',
        )
      } finally {
        if (isMounted) {
          setIsLoadingDecisions(false)
        }
      }
    }

    async function loadAnalysisHistory() {
      setIsLoadingAnalyses(true)
      setAnalysisLoadError('')

      try {
        const data = await fetchMockAnalysisHistory()

        if (!isMounted) {
          return
        }

        setAnalyses(data)
      } catch {
        if (!isMounted) {
          return
        }

        setAnalysisLoadError(
          'Could not load saved analyses right now. Please try again.',
        )
      } finally {
        if (isMounted) {
          setIsLoadingAnalyses(false)
        }
      }
    }

    async function loadJournalLinks() {
      setIsLoadingJournals(true)
      setJournalLoadError('')

      try {
        const data = await fetchMockJournalLinks()

        if (!isMounted) {
          return
        }

        setJournals(data)
      } catch {
        if (!isMounted) {
          return
        }

        setJournalLoadError(
          'Could not load linked journals right now. Please try again.',
        )
      } finally {
        if (isMounted) {
          setIsLoadingJournals(false)
        }
      }
    }

    loadDecisionHistory()
    loadAnalysisHistory()
    loadJournalLinks()

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
            <p className="step-label">Dashboard</p>
            <h1 className="screen-title">Your decision journey</h1>
            <p className="screen-subtitle">
              This dashboard is the home for your saved decisions, linked
              analyses, and journals over time.
            </p>
          </div>

          <Link className="button button-primary button-link" to="/decisions/new">
            Start New Decision
          </Link>
        </div>

        <div className="dashboard-filter-bar">
          <button
            type="button"
            className={`dashboard-filter-pill ${
              activeView === 'all' ? 'dashboard-filter-pill-active' : ''
            }`}
            onClick={() => setActiveView('all')}
          >
            All
          </button>

          <button
            type="button"
            className={`dashboard-filter-pill ${
              activeView === 'decisions' ? 'dashboard-filter-pill-active' : ''
            }`}
            onClick={() => setActiveView('decisions')}
          >
            Past Decisions
          </button>

          <button
            type="button"
            className={`dashboard-filter-pill ${
              activeView === 'analyses' ? 'dashboard-filter-pill-active' : ''
            }`}
            onClick={() => setActiveView('analyses')}
          >
            Saved Analyses
          </button>

          <button
            type="button"
            className={`dashboard-filter-pill ${
              activeView === 'journals' ? 'dashboard-filter-pill-active' : ''
            }`}
            onClick={() => setActiveView('journals')}
          >
            Linked Journals
          </button>
        </div>

        <div className="dashboard-grid">
          {(activeView === 'all' || activeView === 'decisions') && (
            <section className="dashboard-card">
              <h2 className="dashboard-card-title">Past Decisions</h2>
              <p className="dashboard-card-copy">
                A list of the major decisions you have already explored in
                DeathBed.
              </p>

              {decisionLoadError ? (
                <div className="status-banner status-banner-error">
                  {decisionLoadError}
                </div>
              ) : null}

              {isLoadingDecisions ? (
                <div className="dashboard-list">
                  <div className="dashboard-list-item">
                    <strong>Loading past decisions...</strong>
                    <span>Please wait while your decision history is fetched.</span>
                  </div>
                </div>
              ) : null}

              {!isLoadingDecisions && !decisionLoadError ? (
                <div className="dashboard-list">
                  {decisions.map((decision) => (
                    <div key={decision.id} className="dashboard-list-item">
                      <strong>{decision.title}</strong>
                      <span>
                        {decision.savedAt} • {decision.category}
                      </span>
                    </div>
                  ))}
                </div>
              ) : null}
            </section>
          )}

          {(activeView === 'all' || activeView === 'analyses') && (
            <section className="dashboard-card">
              <h2 className="dashboard-card-title">Saved Analyses</h2>
              <p className="dashboard-card-copy">
                Quick access to your previous analysis outputs and summaries.
              </p>

              {analysisLoadError ? (
                <div className="status-banner status-banner-error">
                  {analysisLoadError}
                </div>
              ) : null}

              {isLoadingAnalyses ? (
                <div className="dashboard-list">
                  <div className="dashboard-list-item">
                    <strong>Loading saved analyses...</strong>
                    <span>Please wait while your analysis history is fetched.</span>
                  </div>
                </div>
              ) : null}

              {!isLoadingAnalyses && !analysisLoadError ? (
                <div className="dashboard-list">
                  {analyses.map((analysis) => (
                    <div key={analysis.id} className="dashboard-list-item">
                      <strong>{analysis.title}</strong>
                      <span>
                        {analysis.lastOpened} • {analysis.type} •{' '}
                        {analysis.relatedDecision}
                      </span>
                    </div>
                  ))}
                </div>
              ) : null}
            </section>
          )}

          {(activeView === 'all' || activeView === 'journals') && (
            <section className="dashboard-card">
              <h2 className="dashboard-card-title">Linked Journals</h2>
              <p className="dashboard-card-copy">
                Your reflection history and journal connections will appear here.
              </p>

              {journalLoadError ? (
                <div className="status-banner status-banner-error">
                  {journalLoadError}
                </div>
              ) : null}

              {isLoadingJournals ? (
                <div className="dashboard-list">
                  <div className="dashboard-list-item">
                    <strong>Loading linked journals...</strong>
                    <span>Please wait while your journal links are fetched.</span>
                  </div>
                </div>
              ) : null}

              {!isLoadingJournals && !journalLoadError ? (
                <div className="dashboard-list">
                  {journals.map((journal) => (
                    <Link
                      key={journal.id}
                      className="dashboard-list-item dashboard-list-link"
                      to={`/journals/${journal.id}`}
                    >
                      <strong>{journal.title}</strong>
                      <span>
                        {journal.status} • {journal.relatedDecision}
                      </span>
                    </Link>
                  ))}
                </div>
              ) : null}
            </section>
          )}
        </div>
      </div>
    </section>
  )
}

export default DashboardRoute