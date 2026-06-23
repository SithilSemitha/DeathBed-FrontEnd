import { Link } from 'react-router-dom'

function DashboardRoute() {
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

            <div className="dashboard-list">
              <div className="dashboard-list-item">
                <strong>Career change to startup</strong>
                <span>Saved 2 days ago</span>
              </div>
              <div className="dashboard-list-item">
                <strong>Move abroad for postgraduate study</strong>
                <span>Saved 1 week ago</span>
              </div>
              <div className="dashboard-list-item">
                <strong>Whether to stay in current relationship</strong>
                <span>Saved 3 weeks ago</span>
              </div>
            </div>
          </section>

          <section className="dashboard-card">
            <h2 className="dashboard-card-title">Saved Analyses</h2>
            <p className="dashboard-card-copy">
              Quick access to your previous analysis outputs and summaries.
            </p>

            <div className="dashboard-list">
              <div className="dashboard-list-item">
                <strong>Future trajectory summary</strong>
                <span>Last opened yesterday</span>
              </div>
              <div className="dashboard-list-item">
                <strong>Bias review snapshot</strong>
                <span>Last opened 4 days ago</span>
              </div>
              <div className="dashboard-list-item">
                <strong>Future self conversation</strong>
                <span>Last opened 1 week ago</span>
              </div>
            </div>
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