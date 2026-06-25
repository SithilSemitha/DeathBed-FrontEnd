import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

type MatchProfile = {
  id: string
  label: string
  age: number
  countryCode: string
  countryLabel: string
  incomeBracket: string
  incomeLabel: string
}

type FilterValues = {
  minAge: string
  maxAge: string
  country: string
  incomeBracket: string
}

const initialFilters: FilterValues = {
  minAge: '',
  maxAge: '',
  country: '',
  incomeBracket: '',
}

const mockProfiles: MatchProfile[] = [
  {
    id: 'a',
    label: 'Person A',
    age: 27,
    countryCode: 'LK',
    countryLabel: 'Sri Lanka',
    incomeBracket: '25k_50k',
    incomeLabel: '$25k - $50k',
  },
  {
    id: 'b',
    label: 'Person B',
    age: 31,
    countryCode: 'GB',
    countryLabel: 'United Kingdom',
    incomeBracket: '50k_100k',
    incomeLabel: '$50k - $100k',
  },
  {
    id: 'c',
    label: 'Person C',
    age: 24,
    countryCode: 'CA',
    countryLabel: 'Canada',
    incomeBracket: 'under_25k',
    incomeLabel: 'Under $25k',
  },
  {
    id: 'd',
    label: 'Person D',
    age: 29,
    countryCode: 'SE',
    countryLabel: 'Sweden',
    incomeBracket: '100k_200k',
    incomeLabel: '$100k - $200k',
  },
]

function MatchedProfilesRoute() {
  const [filters, setFilters] = useState<FilterValues>(initialFilters)

  const activeFilterSummary = useMemo(() => {
    const summary: string[] = []

    if (filters.minAge) summary.push(`Min age: ${filters.minAge}`)
    if (filters.maxAge) summary.push(`Max age: ${filters.maxAge}`)

    if (filters.country) {
      const countryMap: Record<string, string> = {
        LK: 'Sri Lanka',
        SE: 'Sweden',
        GB: 'United Kingdom',
        CA: 'Canada',
        US: 'United States',
      }

      summary.push(`Country: ${countryMap[filters.country]}`)
    }

    if (filters.incomeBracket) {
      const incomeMap: Record<string, string> = {
        under_25k: 'Under $25k',
        '25k_50k': '$25k - $50k',
        '50k_100k': '$50k - $100k',
        '100k_200k': '$100k - $200k',
        '200k_plus': '$200k+',
        prefer_not_say: 'Prefer not to say',
      }

      summary.push(`Income: ${incomeMap[filters.incomeBracket]}`)
    }

    return summary
  }, [filters])

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target

    setFilters((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleReset = () => {
    setFilters(initialFilters)
  }

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
                  name="minAge"
                  min="13"
                  max="120"
                  placeholder="e.g. 20"
                  value={filters.minAge}
                  onChange={handleChange}
                />
              </label>

              <label className="field-group">
                <span className="field-label">Maximum age</span>
                <input
                  className="field-input"
                  type="number"
                  name="maxAge"
                  min="13"
                  max="120"
                  placeholder="e.g. 35"
                  value={filters.maxAge}
                  onChange={handleChange}
                />
              </label>

              <label className="field-group">
                <span className="field-label">Country</span>
                <select
                  className="field-input"
                  name="country"
                  value={filters.country}
                  onChange={handleChange}
                >
                  <option value="">All countries</option>
                  <option value="LK">Sri Lanka</option>
                  <option value="SE">Sweden</option>
                  <option value="GB">United Kingdom</option>
                  <option value="CA">Canada</option>
                  <option value="US">United States</option>
                </select>
              </label>

              <label className="field-group">
                <span className="field-label">Income bracket</span>
                <select
                  className="field-input"
                  name="incomeBracket"
                  value={filters.incomeBracket}
                  onChange={handleChange}
                >
                  <option value="">All income brackets</option>
                  <option value="under_25k">Under $25k</option>
                  <option value="25k_50k">$25k - $50k</option>
                  <option value="50k_100k">$50k - $100k</option>
                  <option value="100k_200k">$100k - $200k</option>
                  <option value="200k_plus">$200k+</option>
                  <option value="prefer_not_say">Prefer not to say</option>
                </select>
              </label>

              <div className="filter-actions">
                <button
                  type="button"
                  className="button button-secondary"
                  onClick={handleReset}
                >
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
                  Current selected filters are reflected below.
                </p>
              </div>
              <span className="match-count-pill">{mockProfiles.length} results</span>
            </div>

            {activeFilterSummary.length > 0 ? (
              <div className="active-filters-panel">
                {activeFilterSummary.map((item) => (
                  <span key={item} className="active-filter-pill">
                    {item}
                  </span>
                ))}
              </div>
            ) : (
              <p className="dashboard-card-copy">No filters selected yet.</p>
            )}

            <div className="match-results-grid">
              {mockProfiles.map((profile) => (
                <article key={profile.id} className="profile-match-card">
                  <p className="profile-match-label">{profile.label}</p>
                  <h3 className="profile-match-title">
                    Age {profile.age} • {profile.countryLabel}
                  </h3>
                  <p className="profile-match-copy">
                    Income bracket: {profile.incomeLabel}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  )
}

export default MatchedProfilesRoute