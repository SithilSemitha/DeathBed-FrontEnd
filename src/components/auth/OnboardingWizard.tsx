import { useMemo, useState } from 'react'
import ConsentScreen from './ConsentScreen'
import ProfileSetupForm from './ProfileSetupForm'

type ConsentValues = {
  acceptTos: boolean
  acceptPrivacyPolicy: boolean
  contributeAnonymously: '' | 'yes' | 'no'
}

type ProfileValues = {
  firstName: string
  ageYears: number
  country: string
  incomeBracket: string
  relationshipStatus: string
}

function OnboardingWizard() {
  const [step, setStep] = useState<number>(1)
  const [consentValues, setConsentValues] = useState<ConsentValues>({
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

  const handleConsentChange = (
    field: keyof ConsentValues,
    value: ConsentValues[keyof ConsentValues],
  ) => {
    setConsentValues((current) => ({
      ...current,
      [field]: value,
    }))
  }

  const handleProfileSubmit = (profileValues: ProfileValues) => {
    const onboardingPayload = {
      consent: {
        acceptTos: consentValues.acceptTos,
        acceptPrivacyPolicy: consentValues.acceptPrivacyPolicy,
        contributeAnonymously: consentValues.contributeAnonymously === 'yes',
      },
      profile: profileValues,
    }

    console.log('Full onboarding payload captured:', onboardingPayload)
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
          <ProfileSetupForm
            onBack={() => setStep(1)}
            onSubmitProfile={handleProfileSubmit}
          />
        )}
      </div>
    </section>
  )
}

export default OnboardingWizard