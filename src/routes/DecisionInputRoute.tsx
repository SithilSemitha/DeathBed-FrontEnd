import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

type DecisionInputValues = {
  decisionText: string
  choiceA: string
  choiceB: string
}

const initialValues: DecisionInputValues = {
  decisionText: '',
  choiceA: '',
  choiceB: '',
}

function DecisionInputRoute() {
  const [values, setValues] = useState<DecisionInputValues>(initialValues)

  const decisionLength = values.decisionText.trim().length

  const canAnalyse = useMemo(() => {
    return decisionLength >= 20
  }, [decisionLength])

  const handleTextChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const { name, value } = event.target

    setValues((current) => ({
      ...current,
      [name]: value,
    }))
  }

  return (
    <section className="screen-shell">
      <div className="screen-backdrop" />

      <div className="screen-content dashboard-content">
        <div className="dashboard-header">
          <div>
            <p className="step-label">Decision Input</p>
            <h1 className="screen-title">What decision are you weighing?</h1>
            <p className="screen-subtitle">
              Describe your decision in natural language so the system can
              understand your situation without forcing you into rigid
              categories.
            </p>
          </div>

          <Link className="button button-secondary button-link" to="/dashboard">
            Back to dashboard
          </Link>
        </div>

        <div className="decision-layout">
          <section className="auth-card onboarding-card decision-input-card">
            <form
              className="decision-input-form"
              onSubmit={(event) => event.preventDefault()}
              noValidate
            >
              <label className="field-group">
                <span className="field-label">Decision description</span>
                <textarea
                  className="field-input decision-textarea"
                  name="decisionText"
                  value={values.decisionText}
                  onChange={handleTextChange}
                  placeholder="Example: I’m deciding whether to stay in my current job or move into a lower-paying role that feels more meaningful."
                />
                <span className="field-helper decision-helper">
                  Minimum 20 characters. The more detail you provide, the better
                  the next stages of analysis can become.
                </span>
              </label>

              <div className="decision-optional-block">
                <div className="decision-optional-header">
                  <div>
                    <h2 className="decision-optional-title">
                      Optional choice labels
                    </h2>
                    <p className="decision-optional-copy">
                      Add short labels now if you want clearer comparison
                      wording later.
                    </p>
                  </div>
                </div>

                <div className="decision-choice-grid">
                  <label className="field-group">
                    <span className="field-label">Choice A</span>
                    <input
                      className="field-input"
                      type="text"
                      name="choiceA"
                      value={values.choiceA}
                      onChange={handleTextChange}
                      placeholder="e.g. Stay in current role"
                    />
                  </label>

                  <label className="field-group">
                    <span className="field-label">Choice B</span>
                    <input
                      className="field-input"
                      type="text"
                      name="choiceB"
                      value={values.choiceB}
                      onChange={handleTextChange}
                      placeholder="e.g. Move to a new role"
                    />
                  </label>
                </div>
              </div>

              <div className="decision-footer">
                <span className="decision-counter">
                  {decisionLength} / minimum 20
                </span>

                <button
                  type="button"
                  className="button button-primary"
                  disabled={!canAnalyse}
                >
                  Analyse Decision
                </button>
              </div>
            </form>
          </section>

          <aside className="decision-side-card">
            <p className="step-label decision-side-step">What happens next</p>
            <h2 className="decision-side-title">
              This input powers the next stages
            </h2>
            <ul className="decision-side-list">
              <li>Category classification</li>
              <li>Matched profile filtering</li>
              <li>Choice comparison</li>
              <li>Bias and reflection tools</li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  )
}

export default DecisionInputRoute