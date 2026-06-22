import { useMemo, useState } from 'react'
import ConsentScreen from './ConsentScreen'
import ProfileSetupForm from './ProfileSetupForm'
import { getSupabaseClient } from '../../lib/supabase'

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
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [saveError, setSaveError] = useState<string>('')
  const [saveSuccess, setSaveSuccess] = useState<string>('')

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

  const handleProfileSubmit = async (profileValues: ProfileValues) => {
    setSaveError('')
    setSaveSuccess('')

    const supabase = getSupabaseClient()

    if (!supabase) {
      setSaveError(
        'Supabase environment values are missing. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local.',
      )
      return
    }

    setIsSaving(true)

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError || !user) {
        setSaveError('You must be logged in to save your profile.')
        return
      }

      const onboardingPayload = {
        consent: {
          acceptTos: consentValues.acceptTos,
          acceptPrivacyPolicy: consentValues.acceptPrivacyPolicy,
          contributeAnonymously: consentValues.contributeAnonymously === 'yes',
        },
        profile: profileValues,
      }

      const { error } = await supabase.from('profiles').upsert(
        {
          user_id: user.id,
          first_name: profileValues.firstName,
          age_years: profileValues.ageYears,
          country: profileValues.country,
          income_bracket: profileValues.incomeBracket,
          relationship_status: profileValues.relationshipStatus,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id' },
      )

      if (error) {
        setSaveError(error.message)
        return
      }

      console.log('Full onboarding payload captured:', onboardingPayload)
      setSaveSuccess('Profile saved successfully.')
    } catch {
      setSaveError('Could not save profile right now. Please try again.')
    } finally {
      setIsSaving(false)
    }
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
            isSaving={isSaving}
            saveError={saveError}
            saveSuccess={saveSuccess}
          />
        )}
      </div>
    </section>
  )
}

export default OnboardingWizard