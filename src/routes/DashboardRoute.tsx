import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  getOrSeedSavedDashboardData,
  saveDashboardData,
  type AnalysisHistoryItem,
  type DecisionHistoryItem,
  type JournalLinkItem,
} from '../lib/accountData'
import { clearStoredSession, getStoredUser, type StoredUser } from '../lib/auth'

type DashboardView = 'all' | 'decisions' | 'analyses' | 'journals'

function DashboardRoute() {
  const navigate = useNavigate()

  const [storedUser, setStoredUser] = useState<StoredUser | null>(null)

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

  const [decisionToDelete, setDecisionToDelete] =
    useState<DecisionHistoryItem | null>(null)
  const [deleteNotice, setDeleteNotice] = useState<string>('')
  const [deleteRequestError, setDeleteRequestError] = useState<string>('')
  const [isDeletingDecision, setIsDeletingDecision] = useState<boolean>(false)

  useEffect(() => {
    const user = getStoredUser()
    setStoredUser(user)
  }, [])

  useEffect(() => {
    let isMounted = true

    async function loadAccountDashboardData() {
      setIsLoadingDecisions(true)
      setDecisionLoadError('')
      setIsLoadingAnalyses(true)
      setAnalysisLoadError('')
      setIsLoadingJournals(true)
      setJournalLoadError('')

      const email =
        typeof getStoredUser()?.email === 'string' ? getStoredUser()?.email : ''

      if (!email) {
        if (!isMounted) {
          return
        }

        setDecisionLoadError('No signed-in user found.')
        setAnalysisLoadError('No signed-in user found.')
        setJournalLoadError('No signed-in user found.')
        setIsLoadingDecisions(false)
        setIsLoadingAnalyses(false)
        setIsLoadingJournals(false)
        return
      }

      try {
        await new Promise((resolve) => window.setTimeout(resolve, 900))
        const savedData = getOrSeedSavedDashboardData(email)

        if (!isMounted) {
          return
        }

        setDecisions(savedData.decisions)
        setAnalyses(savedData.analyses)
        setJournals(savedData.journals)
      } catch {
        if (!isMounted) {
          return
        }

        setDecisionLoadError(
          'Could not load past decisions right now. Please try again.',
        )
        setAnalysisLoadError(
          'Could not load saved analyses right now. Please try again.',
        )
        setJournalLoadError(
          'Could not load linked journals right now. Please try again.',
        )
      } finally {
        if (isMounted) {
          setIsLoadingDecisions(false)
          setIsLoadingAnalyses(false)
          setIsLoadingJournals(false)
        }
      }
    }

    loadAccountDashboardData()

    return () => {
      isMounted = false
    }
  }, [])

  const openDeleteConfirmation = (decision: DecisionHistoryItem) => {
    setDeleteNotice('')
    setDeleteRequestError('')
    setDecisionToDelete(decision)
  }

  const closeDeleteConfirmation = () => {
    if (isDeletingDecision) {
      return
    }

    setDecisionToDelete(null)
    setDeleteRequestError('')
  }

  const confirmDeleteRequest = async () => {
    if (!decisionToDelete) {
      return
    }

    const deletedDecision = decisionToDelete

    setDeleteRequestError('')
    setDeleteNotice('')
    setIsDeletingDecision(true)

    try {
      await new Promise((resolve) => window.setTimeout(resolve, 900))

      const nextDecisions = decisions.filter(
        (decision) => decision.id !== deletedDecision.id,
      )

      setDecisions(nextDecisions)

      const email =
        typeof storedUser?.email === 'string' ? storedUser.email : undefined

      if (email) {
        saveDashboardData(email, {
          decisions: nextDecisions,
          analyses,
          journals,
        })
      }

      setDeleteNotice(`"${deletedDecision.title}" was removed from the dashboard.`)
      setDecisionToDelete(null)
    } catch (error) {
      setDeleteRequestError(
        error instanceof Error
          ? error.message
          : 'Could not delete the decision right now. Please try again.',
      )
    } finally {
      setIsDeletingDecision(false)
    }
  }

  const handleLogout = () => {
    clearStoredSession()
    navigate('/login')
  }

  const displayName =
    typeof storedUser?.email === 'string' && storedUser.email.length > 0
      ? storedUser.email
      : 'your account'

  return (
    <section className="screen-shell">
      <div className="screen-backdrop" />

      <div className="screen-content dashboard-content">
        <div className="dashboard-header">
          <div>
            <p className="step-label">Dashboard</p>
            <h1 className="screen-title">Your decision journey</h1>
            <p className="screen-subtitle">
              Signed in as <strong>{displayName}</strong>. This dashboard is the
              home for your saved decisions, linked analyses, and journals over
              time.
            </p>
          </div>

          <div className="dashboard-header-actions">
            <Link className="button button-primary button-link" to="/decisions/new">
              Start New Decision
            </Link>

            <button
              type="button"
              className="button button-secondary"
              onClick={handleLogout}
            >
              Log out
            </button>
          </div>
        </div>

        {deleteNotice ? (
          <div className="status-banner status-banner-success">
            {deleteNotice}
          </div>
        ) : null}

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
                  {decisions.length > 0 ? (
                    decisions.map((decision) => (
                      <article
                        key={decision.id}
                        className="dashboard-list-item dashboard-decision-item"
                      >
                        <div className="dashboard-decision-copy">
                          <strong>{decision.title}</strong>
                          <span>
                            {decision.savedAt} • {decision.category}
                          </span>
                        </div>

                        <button
                          type="button"
                          className="button button-danger button-danger-compact"
                          onClick={() => openDeleteConfirmation(decision)}
                        >
                          Delete
                        </button>
                      </article>
                    ))
                  ) : (
                    <div className="dashboard-list-item">
                      <strong>No saved decisions</strong>
                      <span>Your deleted decisions no longer appear here.</span>
                    </div>
                  )}
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

        {decisionToDelete ? (
          <div className="modal-backdrop">
            <div className="modal-card">
              <p className="step-label">Delete Decision</p>
              <h2 className="modal-title">Confirm deletion</h2>
              <p className="modal-copy">
                Are you sure you want to delete{' '}
                <strong>{decisionToDelete.title}</strong>? This request will be
                submitted now and the decision will be removed from your dashboard.
              </p>

              {deleteRequestError ? (
                <div className="status-banner status-banner-error">
                  {deleteRequestError}
                </div>
              ) : null}

              <div className="modal-actions">
                <button
                  type="button"
                  className="button button-secondary"
                  onClick={closeDeleteConfirmation}
                  disabled={isDeletingDecision}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="button button-danger"
                  onClick={confirmDeleteRequest}
                  disabled={isDeletingDecision}
                >
                  {isDeletingDecision ? 'Deleting...' : 'Confirm Delete'}
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default DashboardRoute