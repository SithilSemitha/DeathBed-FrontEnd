import type { FinancialChoice } from '../../lib/matches'

interface FinancialComparisonSectionProps {
  choiceA: FinancialChoice
  choiceB: FinancialChoice
  quickSummary: string
}

function FinancialComparisonSection({
  choiceA,
  choiceB,
  quickSummary,
}: FinancialComparisonSectionProps) {
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

      <div className="comparison-grid">
        <article className="comparison-card comparison-card-a">
          <p className="comparison-card-label">{choiceA.title}</p>
          <h3 className="comparison-card-title">{choiceA.label}</h3>
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
          <p className="comparison-card-copy">{choiceA.summary}</p>
        </article>

        <article className="comparison-card comparison-card-b">
          <p className="comparison-card-label">{choiceB.title}</p>
          <h3 className="comparison-card-title">{choiceB.label}</h3>
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
          <p className="comparison-card-copy">{choiceB.summary}</p>
        </article>
      </div>

      <div className="comparison-summary-panel">
        <h3 className="comparison-summary-title">Quick summary</h3>
        <p className="comparison-summary-copy">{quickSummary}</p>
      </div>
    </section>
  )
}

export default FinancialComparisonSection