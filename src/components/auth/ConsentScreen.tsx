type ConsentValues = {
  acceptTos: boolean
  acceptPrivacyPolicy: boolean
  contributeAnonymously: '' | 'yes' | 'no'
}

type ConsentField = keyof ConsentValues

interface ConsentScreenProps {
  values: ConsentValues
  onChange: (field: ConsentField, value: boolean | '' | 'yes' | 'no') => void
  onContinue: () => void
  canContinue: boolean
}

function ConsentScreen({
  values,
  onChange,
  onContinue,
  canContinue,
}: ConsentScreenProps) {
  return (
    <section className="auth-card onboarding-card">
      <p className="step-label">Step 1 of 2</p>

      <h1 className="screen-title">Before we begin</h1>

      <p className="screen-subtitle">
        DeathBed handles sensitive life-decision information, so you must make
        an explicit consent choice before continuing.
      </p>

      <div className="info-panel">
        <p className="info-copy">
          We collect the information you give us during onboarding and later
          decision analysis so we can personalise your experience and power
          future features like profile matching.
        </p>

        <ul className="info-list">
          <li>
            <strong>What we collect:</strong> profile details, decision inputs,
            and your saved analysis data.
          </li>
          <li>
            <strong>How we use it:</strong> to personalise the product and match
            you with statistically similar people.
          </li>
          <li>
            <strong>Your rights:</strong> you can choose whether to contribute
            anonymised data and request deletion later.
          </li>
        </ul>
      </div>

      <div className="consent-section">
        <div className="option-row">
          <input
            id="acceptTos"
            className="option-input"
            type="checkbox"
            checked={values.acceptTos}
            onChange={(event) => onChange('acceptTos', event.target.checked)}
          />
          <label className="option-label" htmlFor="acceptTos">
            I accept the{' '}
            <a href="/tos" target="_blank" rel="noreferrer">
              Terms of Service
            </a>
          </label>
        </div>

        <div className="option-row">
          <input
            id="acceptPrivacyPolicy"
            className="option-input"
            type="checkbox"
            checked={values.acceptPrivacyPolicy}
            onChange={(event) =>
              onChange('acceptPrivacyPolicy', event.target.checked)
            }
          />
          <label className="option-label" htmlFor="acceptPrivacyPolicy">
            I accept the{' '}
            <a href="/privacy" target="_blank" rel="noreferrer">
              Privacy Policy
            </a>
          </label>
        </div>

        <fieldset className="radio-panel">
          <legend className="radio-legend">
            Contribute anonymised data to the shared regret database
          </legend>

          <label className="radio-option">
            <input
              type="radio"
              name="contributeAnonymously"
              value="yes"
              checked={values.contributeAnonymously === 'yes'}
              onChange={() => onChange('contributeAnonymously', 'yes')}
            />
            <span>Contribute my anonymised data to help others</span>
          </label>

          <label className="radio-option">
            <input
              type="radio"
              name="contributeAnonymously"
              value="no"
              checked={values.contributeAnonymously === 'no'}
              onChange={() => onChange('contributeAnonymously', 'no')}
            />
            <span>Don&apos;t contribute my data</span>
          </label>
        </fieldset>
      </div>

      {!canContinue ? (
        <p className="helper-text">
          Please make an explicit choice for each item.
        </p>
      ) : null}

      <div className="form-actions single-action">
        <button
          type="button"
          className="button button-primary"
          onClick={onContinue}
          disabled={!canContinue}
        >
          Continue
        </button>
      </div>
    </section>
  )
}

export default ConsentScreen