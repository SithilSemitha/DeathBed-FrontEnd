import type { FinancialChoice } from '../../lib/matches'

type ComparisonDimension =
  | 'financial'
  | 'emotional'
  | 'relational'
  | 'professional'
  | 'health'

type DimensionOption = {
  id: ComparisonDimension
  label: string
}

interface FinancialComparisonSectionProps {
  dimension: string
  scoreLabel: string
  rangeLabel: string
  insightLabel: string
  choiceA: FinancialChoice
  choiceB: FinancialChoice
  quickSummary: string
  selectedDimensions: ComparisonDimension[]
  onToggleDimension: (dimension: ComparisonDimension) => void
  dimensionError: string
}

const dimensionOptions: DimensionOption[] = [
  { id: 'financial', label: 'Financial' },
  { id: 'emotional', label: 'Emotional' },
  { id: 'relational', label: 'Relational' },
  { id: 'professional', label: 'Professional' },
  { id: 'health', label: 'Health' },
]

function FinancialComparisonSection({
  dimension,
  scoreLabel,
  rangeLabel,
  insightLabel,
  choiceA,
  choiceB,
  quickSummary,
  selectedDimensions,
  onToggleDimension,
  dimensionError,
}: FinancialComparisonSectionProps) {
  const showFinancial = selectedDimensions.includes('financial')

  return (
    <section className="comparison-section">
      <div className="comparison-section-header">
        <div>
          <p className="step-label comparison-step-label">Choice Comparison</p>
          <h2 className="screen-title comparison-title">
            Financial outcome comparison
          </h2>
          <p className="screen-subtitle comparison-subtitle">
            A simple visual preview of how Choice A and Choice B diverge across
            one key dimension.
          </p>
        </div>
      </div>

      <div className="dimension-selector-panel">
        <h3 className="dimension-selector-title">Visible dimensions</h3>
        <p className="dimension-selector-copy">
          Choose which life dimensions you want to focus on in the comparison
          area.
        </p>

        <div className="dimension-selector-grid">
          {dimensionOptions.map((option) => {
            const isActive = selectedDimensions.includes(option.id)

            return (
              <button
                key={option.id}
                type="button"
                className={`dimension-chip ${
                  isActive ? 'dimension-chip-active' : ''
                }`}
                onClick={() => onToggleDimension(option.id)}
              >
                {option.label}
              </button>
            )
          })}
        </div>

        {dimensionError ? (
          <p className="dimension-selector-error">{dimensionError}</p>
        ) : (
          <p className="dimension-selector-helper">
            At least one dimension must stay selected.
          </p>
        )}
      </div>

      {showFinancial ? (
        <>
          <div className="comparison-meta-panel">
            <p className="comparison-meta-label">{scoreLabel}</p>
            <p className="comparison-meta-copy">{rangeLabel}</p>
          </div>

          <div className="comparison-grid">
            <article className="comparison-card comparison-card-a">
              <p className="comparison-card-label">{choiceA.title}</p>
              <h3 className="comparison-card-title">{choiceA.label}</h3>
              <p className="comparison-direction-label">{choiceA.directionLabel}</p>
              <div className="comparison-score-row">
                <span className="comparison-score-value">{choiceA.value}</span>
                <span className="comparison-score-unit">/ 100</span>
              </div>
              <div className="comparison-bar-track" aria-hidden="true">
                <div
                  className="comparison-bar-fill comparison-bar-fill-a"
                  style={{ width: `${choiceA.value}%` }}
                />
              </div>
              <p className="comparison-insight-label">{insightLabel}</p>
              <p className="comparison-card-copy">{choiceA.summary}</p>
            </article>

            <article className="comparison-card comparison-card-b">
              <p className="comparison-card-label">{choiceB.title}</p>
              <h3 className="comparison-card-title">{choiceB.label}</h3>
              <p className="comparison-direction-label">{choiceB.directionLabel}</p>
              <div className="comparison-score-row">
                <span className="comparison-score-value">{choiceB.value}</span>
                <span className="comparison-score-unit">/ 100</span>
              </div>
              <div className="comparison-bar-track" aria-hidden="true">
                <div
                  className="comparison-bar-fill comparison-bar-fill-b"
                  style={{ width: `${choiceB.value}%` }}
                />
              </div>
              <p className="comparison-insight-label">{insightLabel}</p>
              <p className="comparison-card-copy">{choiceB.summary}</p>
            </article>
          </div>

          <div className="comparison-summary-panel">
            <h3 className="comparison-summary-title">Quick summary</h3>
            <p className="comparison-summary-copy">
              <strong>{dimension}:</strong> {quickSummary}
            </p>
          </div>
        </>
      ) : (
        <div className="comparison-summary-panel">
          <h3 className="comparison-summary-title">Dimension hidden</h3>
          <p className="comparison-summary-copy">
            Financial comparison is currently hidden. Re-enable the
            <strong> Financial </strong>
            dimension to see the Choice A vs Choice B outcome cards again.
          </p>
        </div>
      )}
    </section>
  )
}

export default FinancialComparisonSection