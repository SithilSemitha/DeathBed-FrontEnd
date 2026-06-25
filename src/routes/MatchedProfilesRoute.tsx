import { Link } from 'react-router-dom'

function MatchedProfilesRoute() {
  return (
    <section className="screen-shell">
      <div className="screen-backdrop" />

      <div className="screen-content dashboard-content">
        <div className="dashboard-header">
          <div>
            <p className="step-label">Matched Profiles</p>
            <h1 className="screen-title">People with similar backgrounds</h1>
            <p className="screen-subtitle">
              Use demographic filters to narrow the result set to people who are
              closer to your own life context.
            </p>
          </div>

          <Link className="button button-secondary button-link" to="/decisions/new">
            Back to decision input
          </Link>
        </div>

        <div className="match-layout">
          <aside className="filter-panel">
            <h2 className="filter-panel-title">Filter by demographics</h2>
            <p className="filter-panel-copy">
              Adjust these controls to focus on people most like you.
            </p>

            <div className="filter-form">
              <label className="field-group">
                <span className="field-label">Minimum age</span>
                <input
                  className="field-input"
                  type="number"
                  min="13"
                  max="120"
                  placeholder="e.g. 20"
                />
              </label>

              <label className="field-group">
                <span className="field-label">Maximum age</span>
                <input
                  className="field-input"
                  type="number"
                  min="13"
                  max="120"
                  placeholder="e.g. 35"
                />
              </label>

              <label className="field-group">
                <span className="field-label">Country</span>
                <select className="field-input" defaultValue="">
                  <option value="" disabled>
                    Select a country
                  </option>
                  <option value="LK">Sri Lanka</option>
                  <option value="SE">Sweden</option>
                  <option value="GB">United Kingdom</option>
                  <option value="CA">Canada</option>
                  <option value="US">United States</option>
                </select>
              </label>

              <label className="field-group">
                <span className="field-label">Income bracket</span>
                <select className="field-input" defaultValue="">
                  <option value="" disabled>
                    Select an income bracket
                  </option>
                  <option value="under_25k">Under $25k</option>
                  <option value="25k_50k">$25k - $50k</option>
                  <option value="50k_100k">$50k - $100k</option>
                  <option value="100k_200k">$100k - $200k</option>
                  <option value="200k_plus">$200k+</option>
                  <option value="prefer_not_say">Prefer not to say</option>
                </select>
              </label>

              <div className="filter-actions">
                <button type="button" className="button button-secondary">
                  Reset Filters
                </button>
                <button type="button" className="button button-primary">
                  Apply Filters
                </button>
              </div>
            </div>
          </aside>

          <section className="match-results-card">
            <div className="match-results-header">
              <div>
                <h2 className="dashboard-card-title">Matched profiles</h2>
                <p className="dashboard-card-copy">
                  Preview layout for demographic filtering results.
                </p>
              </div>
              <span className="match-count-pill">12 results</span>
            </div>

            <div className="match-results-grid">
              <article className="profile-match-card">
                <p className="profile-match-label">Person A</p>
                <h3 className="profile-match-title">Age 27 • Sri Lanka</h3>
                <p className="profile-match-copy">
                  Income bracket: $25k - $50k
                </p>
              </article>

              <article className="profile-match-card">
                <p className="profile-match-label">Person B</p>
                <h3 className="profile-match-title">Age 31 • United Kingdom</h3>
                <p className="profile-match-copy">
                  Income bracket: $50k - $100k
                </p>
              </article>

              <article className="profile-match-card">
                <p className="profile-match-label">Person C</p>
                <h3 className="profile-match-title">Age 24 • Canada</h3>
                <p className="profile-match-copy">
                  Income bracket: Under $25k
                </p>
              </article>

              <article className="profile-match-card">
                <p className="profile-match-label">Person D</p>
                <h3 className="profile-match-title">Age 29 • Sweden</h3>
                <p className="profile-match-copy">
                  Income bracket: $100k - $200k
                </p>
              </article>
            </div>
          </section>
        </div>
      </div>
    </section>
  )
}

export default MatchedProfilesRoute