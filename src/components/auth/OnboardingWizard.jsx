import { useMemo, useState } from 'react'
import ConsentScreen from './ConsentScreen.jsx'
import ProfileSetupForm from './ProfileSetupForm.jsx'

function OnboardingWizard() {
  const [step, setStep] = useState(1)
  const [consentValues, setConsentValues] = useState({
    acceptTos: false,
    acceptPrivacyPolicy: false,
    contributeAnonymously: '',
  })

  const canContinueFromConsent = useMemo(() => {
    return (
      consentValues.acceptTos &&
      consentValues.acceptPrivacyPolicy &&
      consentValues.contributeAnonymously !== ''
    )
  }, [consentValues])

  const handleConsentChange = (field, value) => {
    setConsentValues((current) => ({
      ...current,
      [field]: value,
    }))
  }

  return (
    <section className="screen-shell">
      <div className="screen-backdrop" />

      <div className="screen-content">
        <div className="progress-block" aria-label="Onboarding progress">
          <div className="progress-meta">
            <span className="progress-step">Step {step} of 2</span>
            <span className="progress-name">
              {step === 1 ? 'Consent' : 'Profile'}
            </span>
          </div>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: step === 1 ? '50%' : '100%' }}
            />
          </div>
        </div>

        {step === 1 ? (
          <ConsentScreen
            values={consentValues}
            onChange={handleConsentChange}
            onContinue={() => setStep(2)}
            canContinue={canContinueFromConsent}
          />
        ) : (
          <ProfileSetupForm onBack={() => setStep(1)} />
        )}
      </div>
    </section>
  )
}

export default OnboardingWizard