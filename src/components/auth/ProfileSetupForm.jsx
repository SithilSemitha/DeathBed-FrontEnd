function ProfileSetupForm({ onBack }) {
  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <form className="auth-card onboarding-card" onSubmit={handleSubmit}>
      <p className="step-label">Step 2 of 2</p>

      <h1 className="screen-title">About you</h1>
      <p className="screen-subtitle">
        This helps us match you with statistically similar people.
      </p>

      <div className="form-grid">
        <label className="field-group">
          <span className="field-label">First name</span>
          <input
            className="field-input"
            type="text"
            name="firstName"
            placeholder="Enter your first name"
          />
        </label>

        <label className="field-group">
          <span className="field-label">Age</span>
          <input
            className="field-input"
            type="number"
            name="ageYears"
            min="13"
            max="120"
            placeholder="Enter your age"
          />
        </label>

        <label className="field-group">
          <span className="field-label">Country</span>
          <select className="field-input" name="country" defaultValue="">
            <option value="" disabled>
              Select your country
            </option>
            <option value="LK">Sri Lanka</option>
            <option value="SE">Sweden</option>
            <option value="GB">United Kingdom</option>
            <option value="CA">Canada</option>
            <option value="US">United States</option>
          </select>
        </label>

        <label className="field-group">
          <span className="field-label">Income bracket</span>
          <select className="field-input" name="incomeBracket" defaultValue="">
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
        </label>

        <label className="field-group">
          <span className="field-label">Relationship status</span>
          <select
            className="field-input"
            name="relationshipStatus"
            defaultValue=""
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