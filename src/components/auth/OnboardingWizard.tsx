import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ConsentScreen from "./ConsentScreen";
import ProfileSetupForm from "./ProfileSetupForm";
import { getMe, createProfile } from "../../lib/api";

type ConsentValues = {
  acceptTos: boolean;
  acceptPrivacyPolicy: boolean;
  contributeAnonymously: "" | "yes" | "no";
};

type ProfileValues = {
  firstName: string;
  ageYears: number;
  country: string;
  incomeBracket: string;
  relationshipStatus: string;
};

type OnboardingPayload = {
  consent: {
    acceptTos: boolean;
    acceptPrivacyPolicy: boolean;
    contributeAnonymously: boolean;
  };
  profile: ProfileValues;
};

function OnboardingWizard() {
  const navigate = useNavigate();

  const [step, setStep] = useState<number>(1);
  const [consentValues, setConsentValues] = useState<ConsentValues>({
    acceptTos: false,
    acceptPrivacyPolicy: false,
    contributeAnonymously: "",
  });
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveError, setSaveError] = useState<string>("");
  const [saveSuccess, setSaveSuccess] = useState<string>("");

  const canContinueFromConsent = useMemo(() => {
    return (
      consentValues.acceptTos &&
      consentValues.acceptPrivacyPolicy &&
      consentValues.contributeAnonymously !== ""
    );
  }, [consentValues]);

  const handleConsentChange = (
    field: keyof ConsentValues,
    value: ConsentValues[keyof ConsentValues],
  ) => {
    setConsentValues((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const persistOnboardingPayload = (payload: OnboardingPayload) => {
    localStorage.setItem(
      "deathbed.onboarding.payload",
      JSON.stringify(payload),
    );
  };

  const handleProfileSubmit = async (profileValues: ProfileValues) => {
    setSaveError("");
    setSaveSuccess("");

    const onboardingPayload: OnboardingPayload = {
      consent: {
        acceptTos: consentValues.acceptTos,
        acceptPrivacyPolicy: consentValues.acceptPrivacyPolicy,
        contributeAnonymously: consentValues.contributeAnonymously === "yes",
      },
      profile: profileValues,
    };

    const apiBase = import.meta.env.VITE_API_BASE;
    const token = localStorage.getItem("deathbed.accessToken");

    if (!apiBase || !token) {
      persistOnboardingPayload(onboardingPayload);
      console.log("Full onboarding payload captured:", onboardingPayload);
      setSaveSuccess("Profile saved locally for development. Redirecting...");

      window.setTimeout(() => {
        navigate("/decisions/new");
      }, 900);

      return;
    }

    setIsSaving(true);

    try {
      const me = await getMe();
      const userId = me?.profile?.id || me?.user?.id;

      if (!userId) {
        setSaveError("You must be logged in to save your profile.");
        return;
      }

      const payload = {
        userId,
        firstName: profileValues.firstName,
        age: profileValues.ageYears,
        country: profileValues.country,
        income: profileValues.incomeBracket,
        relationship: profileValues.relationshipStatus,
        updatedAt: new Date().toISOString(),
      };

      await createProfile(payload);

      persistOnboardingPayload(onboardingPayload);
      console.log("Full onboarding payload captured:", onboardingPayload);
      setSaveSuccess("Profile saved successfully. Redirecting...");

      window.setTimeout(() => {
        navigate("/decisions/new");
      }, 900);
    } catch (err: any) {
      setSaveError(
        err?.response?.data?.error ||
          err?.message ||
          "Could not save profile right now. Please try again.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="screen-shell">
      <div className="screen-backdrop" />

      <div className="screen-content">
        <div className="progress-block" aria-label="Onboarding progress">
          <div className="progress-meta">
            <span className="progress-step">Step {step} of 2</span>
            <span className="progress-name">
              {step === 1 ? "Consent" : "Profile"}
            </span>
          </div>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: step === 1 ? "50%" : "100%" }}
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
  );
}

export default OnboardingWizard;
