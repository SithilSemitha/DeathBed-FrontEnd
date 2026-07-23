import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import FinancialComparisonSection from '../components/matching/FinancialComparisonSection'
import {
  buildActiveFilterSummary,
  countryOptions,
  filterProfiles,
  incomeOptions,
  initialMatchFilters,
  mockFinancialComparisonApi,
  mockProfiles,
  prepareFinancialComparisonData,
  type MatchFilters,
} from '../lib/matches'

type ComparisonDimension =
  | 'financial'
  | 'emotional'
  | 'relational'
  | 'professional'
  | 'health'

const DIMENSION_STORAGE_KEY = 'deathbed.selectedComparisonDimensions'

function MatchedProfilesRoute() {
  const [filters, setFilters] = useState<MatchFilters>(initialMatchFilters)
  const [appliedFilters, setAppliedFilters] =
    useState<MatchFilters>(initialMatchFilters)
  const [selectedDimensions, setSelectedDimensions] = useState<
    ComparisonDimension[]
  >(['financial', 'emotional', 'relational'])
  const [dimensionError, setDimensionError] = useState<string>('')

  useEffect(() => {
    const stored = localStorage.getItem(DIMENSION_STORAGE_KEY)

    if (!stored) {
      return
    }

    try {
      const parsed = JSON.parse(stored) as ComparisonDimension[]

      if (Array.isArray(parsed) && parsed.length > 0) {
        setSelectedDimensions(parsed)
      }
    } catch {
      // ignore invalid local storage
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(
      DIMENSION_STORAGE_KEY,
      JSON.stringify(selectedDimensions),
    )
  }, [selectedDimensions])

  const ageRangeError = useMemo(() => {
    if (!filters.minAge || !filters.maxAge) {
      return ''
    }

    const minAge = Number(filters.minAge)
    const maxAge = Number(filters.maxAge)

    if (!Number.isFinite(minAge) || !Number.isFinite(maxAge)) {
      return ''
    }

    if (minAge > maxAge) {
      return 'Minimum age cannot exceed maximum age.'
    }

    return ''
  }, [filters.minAge, filters.maxAge])

  const activeFilterSummary = useMemo(() => {
    return buildActiveFilterSummary(appliedFilters)
  }, [appliedFilters])

  const filteredProfiles = useMemo(() => {
    return filterProfiles(mockProfiles, appliedFilters)
  }, [appliedFilters])

  const financialComparison = useMemo(() => {
    return prepareFinancialComparisonData(mockFinancialComparisonApi)
  }, [])

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target

    setFilters((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleApplyFilters = () => {
    if (ageRangeError) {
      return
    }

    setAppliedFilters(filters)
  }

  const handleReset = () => {
    setFilters(initialMatchFilters)
    setAppliedFilters(initialMatchFilters)
  }

  const handleToggleDimension = (dimension: ComparisonDimension) => {
    setSelectedDimensions((current) => {
      const isSelected = current.includes(dimension)

      if (isSelected) {
        if (current.length === 1) {
          setDimensionError('At least one dimension must remain selected.')
          return current
        }

        const next = current.filter((item) => item !== dimension)
        setDimensionError('')
        return next
      }

      const next = [...current, dimension]
      setDimensionError('')
      return next
    })
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

          <Link
            className="button button-secondary button-link"
            to="/decisions/new"
          >
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
                  className={`field-input ${ageRangeError ? 'field-input-error' : ''}`}
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
                  className={`field-input ${ageRangeError ? 'field-input-error' : ''}`}
                  type="number"
                  name="maxAge"
                  min="13"
                  max="120"
                  placeholder="e.g. 35"
                  value={filters.maxAge}
                  onChange={handleChange}
                />
                {ageRangeError ? (
                  <span className="field-error">{ageRangeError}</span>
                ) : (
                  <span className="field-helper">
                    Enter an age range between 13 and 120.
                  </span>
                )}
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
                  {countryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
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
                  {incomeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
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
                <button
                  type="button"
                  className="button button-primary"
                  disabled={Boolean(ageRangeError)}
                  onClick={handleApplyFilters}
                >
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
              <span className="match-count-pill">
                {filteredProfiles.length} results
              </span>
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

            {filteredProfiles.length > 0 ? (
              <div className="match-results-grid">
                {filteredProfiles.map((profile) => (
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
            ) : (
              <p className="dashboard-card-copy">
                No profiles match your current filters. Try broadening your
                search.
              </p>
            )}
          </section>
        </div>

                <FinancialComparisonSection
          dimension={financialComparison.dimension}
          scoreLabel={financialComparison.scoreLabel}
          rangeLabel={financialComparison.rangeLabel}
          insightLabel={financialComparison.insightLabel}
          confidenceScore={financialComparison.confidenceScore}
          confidenceLevel={financialComparison.confidenceLevel}
          confidenceExplanation={financialComparison.confidenceExplanation}
          choiceA={financialComparison.choiceA}
          choiceB={financialComparison.choiceB}
          quickSummary={financialComparison.quickSummary}
          selectedDimensions={selectedDimensions}
          onToggleDimension={handleToggleDimension}
          dimensionError={dimensionError}
        />
      </div>
    </section>
  )
}

export default MatchedProfilesRoute