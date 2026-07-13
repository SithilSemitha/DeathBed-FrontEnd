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

function DashboardRoute() {
  const [decisions, setDecisions] = useState<DecisionHistoryItem[]>([])
  const [isLoadingDecisions, setIsLoadingDecisions] = useState<boolean>(true)
  const [decisionLoadError, setDecisionLoadError] = useState<string>('')

  const [analyses, setAnalyses] = useState<AnalysisHistoryItem[]>([])
  const [isLoadingAnalyses, setIsLoadingAnalyses] = useState<boolean>(true)
  const [analysisLoadError, setAnalysisLoadError] = useState<string>('')

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

    loadDecisionHistory()
    loadAnalysisHistory()

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

        <div className="dashboard-grid">
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

          <section className="dashboard-card">
            <h2 className="dashboard-card-title">Linked Journals</h2>
            <p className="dashboard-card-copy">
              Your reflection history and journal connections will appear here.
            </p>

            <div className="dashboard-list">
              <div className="dashboard-list-item">
                <strong>Pre-mortem journal draft</strong>
                <span>In progress</span>
              </div>
              <div className="dashboard-list-item">
                <strong>Completed reflection export</strong>
                <span>PDF ready</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  )
}

export default DashboardRoute