import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getSupabaseClient } from '../lib/supabase'

type LoginErrors = {
  email?: string
  password?: string
}

function LoginRoute() {
  const navigate = useNavigate()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errors, setErrors] = useState<LoginErrors>({})
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [requestError, setRequestError] = useState<string>('')

  function validate(): boolean {
    const next: LoginErrors = {}

    if (!email.trim()) {
      next.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = 'Please enter a valid email address.'
    }

    if (!password) {
      next.password = 'Password is required.'
    }

    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function performLogin(
    loginEmail: string,
    loginPassword: string,
  ): Promise<void> {
    const supabase = getSupabaseClient()

    if (!supabase) {
      throw new Error(
        'Supabase environment values are missing. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local.',
      )
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    })

    if (error) {
      throw new Error(error.message)
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setRequestError('')

    if (!validate()) return

    setIsSubmitting(true)

    try {
      await performLogin(email.trim(), password)
      navigate('/dashboard')
    } catch (error) {
      setRequestError(
        error instanceof Error
          ? error.message
          : 'Could not log in right now. Please try again.',
      )
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

          {requestError ? (
            <div className="status-banner status-banner-error">
              {requestError}
            </div>
          ) : null}

          <form className="auth-form-stack" onSubmit={handleSubmit} noValidate>
            <label className="field-group">
              <span className="field-label">Email</span>
              <input
                className={`field-input ${errors.email ? 'field-input-error' : ''}`}
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                disabled={isSubmitting}
              />
              {errors.email ? (
                <span className="field-error">{errors.email}</span>
              ) : null}
            </label>

            <label className="field-group">
              <span className="field-label">Password</span>
              <input
                className={`field-input ${errors.password ? 'field-input-error' : ''}`}
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                disabled={isSubmitting}
              />
              {errors.password ? (
                <span className="field-error">{errors.password}</span>
              ) : null}
            </label>

            <div className="auth-inline-actions">
              <Link className="inline-link" to="/forgot-password">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="button button-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Logging in...' : 'Log In'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default LoginRoute