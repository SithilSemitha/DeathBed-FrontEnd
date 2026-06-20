import { useState } from 'react'

const initialValues = {
  firstName: '',
  ageYears: '',
  country: '',
  incomeBracket: '',
  relationshipStatus: '',
}

function ProfileSetupForm({ onBack, onSubmitProfile }) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const validate = (formValues) => {
    const nextErrors = {}
    const ageNumber = Number(formValues.ageYears)

    if (formValues.firstName.trim() === '') {
      nextErrors.firstName = 'Please complete this field'
    }

    if (formValues.ageYears === '') {
      nextErrors.ageYears = 'Please complete this field'
    } else if (
      !Number.isFinite(ageNumber) ||
      ageNumber < 13 ||
      ageNumber > 120
    ) {
      nextErrors.ageYears = 'Please enter a valid age between 13 and 120'
    }

    if (formValues.country === '') {
      nextErrors.country = 'Please complete this field'
    }

    if (formValues.incomeBracket === '') {
      nextErrors.incomeBracket = 'Please complete this field'
    }

    if (formValues.relationshipStatus === '') {
      nextErrors.relationshipStatus = 'Please complete this field'
    }

    return nextErrors
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    const nextValues = {
      ...values,
      [name]: value,
    }

    setValues(nextValues)

    if (hasSubmitted) {
      setErrors(validate(nextValues))
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setHasSubmitted(true)

    const nextErrors = validate(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    onSubmitProfile({
      firstName: values.firstName.trim(),
      ageYears: Number(values.ageYears),
      country: values.country,
      incomeBracket: values.incomeBracket,
      relationshipStatus: values.relationshipStatus,
    })
  }

  return (
    <form className="auth-card onboarding-card" onSubmit={handleSubmit} noValidate>
      <p className="step-label">Step 2 of 2</p>

      <h1 className="screen-title">About you</h1>
      <p className="screen-subtitle">
        This helps us match you with statistically similar people.
      </p>

      <div className="form-grid">
        <label className="field-group">
          <span className="field-label">First name</span>
          <input
            className={`field-input ${errors.firstName ? 'field-input-error' : ''}`}
            type="text"
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
            placeholder="Enter your first name"
          />
          {errors.firstName ? (
            <span className="field-error">{errors.firstName}</span>
          ) : null}
        </label>

        <label className="field-group">
          <span className="field-label">Age</span>
          <input
            className={`field-input ${errors.ageYears ? 'field-input-error' : ''}`}
            type="number"
            name="ageYears"
            value={values.ageYears}
            onChange={handleChange}
            min="13"
            max="120"
            placeholder="Enter your age"
          />
          {errors.ageYears ? (
            <span className="field-error">{errors.ageYears}</span>
          ) : null}
        </label>

        <label className="field-group">
          <span className="field-label">Country</span>
          <select
            className={`field-input ${errors.country ? 'field-input-error' : ''}`}
            name="country"
            value={values.country}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select your country
            </option>
            <option value="LK">Sri Lanka</option>
            <option value="SE">Sweden</option>
            <option value="GB">United Kingdom</option>
            <option value="CA">Canada</option>
            <option value="US">United States</option>
          </select>
          {errors.country ? (
            <span className="field-error">{errors.country}</span>
          ) : null}
        </label>

        <label className="field-group">
          <span className="field-label">Income bracket</span>
          <select
            className={`field-input ${errors.incomeBracket ? 'field-input-error' : ''}`}
            name="incomeBracket"
            value={values.incomeBracket}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select your income bracket
            </option>
            <option value="under_25k">Under $25k</option>
            <option value="25k_50k">$25k - $50k</option>
            <option value="50k_100k">$50k - $100k</option>
            <option value="100k_200k">$100k - $200k</option>
            <option value="200k_plus">$200k+</option>
            <option value="prefer_not_say">Prefer not to say</option>
          </select>
          {errors.incomeBracket ? (
            <span className="field-error">{errors.incomeBracket}</span>
          ) : null}
        </label>

        <label className="field-group">
          <span className="field-label">Relationship status</span>
          <select
            className={`field-input ${errors.relationshipStatus ? 'field-input-error' : ''}`}
            name="relationshipStatus"
            value={values.relationshipStatus}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select your relationship status
            </option>
            <option value="single">Single</option>
            <option value="partnered">Partnered</option>
            <option value="married">Married</option>
            <option value="separated_divorced">Separated / Divorced</option>
            <option value="widowed">Widowed</option>
            <option value="prefer_not_say">Prefer not to say</option>
          </select>
          {errors.relationshipStatus ? (
            <span className="field-error">{errors.relationshipStatus}</span>
          ) : null}
        </label>
      </div>

      <div className="form-actions dual-actions">
        <button
          type="button"
          className="button button-secondary"
          onClick={onBack}
        >
          Back
        </button>

        <button type="submit" className="button button-primary">
          Save Profile
        </button>
      </div>
    </form>
  )
}

export default ProfileSetupForm