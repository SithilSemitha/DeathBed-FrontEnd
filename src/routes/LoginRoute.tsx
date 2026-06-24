import { useState } from 'react'
import { Link } from 'react-router-dom'

function LoginRoute() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Validation 
  function validate(): boolean {
    const next: { email?: string; password?: string } = {}

    if (!email.trim()) {
      next.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = 'Please enter a valid email address.'
    }

    if (!password) {
      next.password = 'Password is required.'
    } else if (password.length < 6) {
      next.password = 'Password must be at least 6 characters.'
    }

    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function performLogin(loginEmail: string, loginPassword: string): Promise<void> {
    // TODO: Connect to authentication backend
    // waiting for backend!
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    try {
      await performLogin(email.trim(), password)
      // TODO: handle successful login 
      // need to redirect to dashboard 
    } catch {
      // TODO: show an error if fails
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="screen-shell">
      <div className="screen-backdrop" />

      <div className="screen-content">
        <div className="auth-card onboarding-card auth-page-card">
          <p className="step-label">Account Access</p>

          <h1 className="screen-title">Log in</h1>

          <p className="screen-subtitle">
            Access your saved decisions, analysis history, and account features.
          </p>

          <form className="auth-form-stack" onSubmit={handleSubmit} noValidate>
            <label className="field-group">
              <span className="field-label">Email</span>
              <input
                className="field-input"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </label>

            <label className="field-group">
              <span className="field-label">Password</span>
              <input
                className="field-input"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <span className="field-error">{errors.password}</span>}
            </label>

            <div className="auth-inline-actions">
              <Link className="inline-link" to="/forgot-password">
                Forgot Password?
              </Link>
            </div>

            <button type="submit" className="button button-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in…' : 'Log In'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default LoginRoute