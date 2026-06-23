import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getSupabaseClient } from '../lib/supabase'

function ResetPasswordRoute() {
  const navigate = useNavigate()

  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [passwordError, setPasswordError] = useState<string>('')
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('')
  const [requestError, setRequestError] = useState<string>('')
  const [requestSuccess, setRequestSuccess] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setPasswordError('')
    setConfirmPasswordError('')
    setRequestError('')
    setRequestSuccess('')

    const trimmedPassword = password.trim()
    const trimmedConfirmPassword = confirmPassword.trim()

    if (!trimmedPassword) {
      setPasswordError('Please enter a new password')
      return
    }

    if (trimmedPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters long')
      return
    }

    if (!trimmedConfirmPassword) {
      setConfirmPasswordError('Please confirm your new password')
      return
    }

    if (trimmedPassword !== trimmedConfirmPassword) {
      setConfirmPasswordError('Passwords do not match')
      return
    }

    const supabase = getSupabaseClient()

    if (!supabase) {
      setRequestError(
        'Supabase environment values are missing. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local.',
      )
      return
    }

    setIsSubmitting(true)

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError || !user) {
        setRequestError(
          'Open this page using the password reset link sent to your email.',
        )
        return
      }

      const { error } = await supabase.auth.updateUser({
        password: trimmedPassword,
      })

      if (error) {
        setRequestError(error.message)
        return
      }

      setRequestSuccess('Password updated successfully. Redirecting to login...')

      window.setTimeout(() => {
        navigate('/login')
      }, 1200)
    } catch {
      setRequestError('Could not update your password right now. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="screen-shell">
      <div className="screen-backdrop" />

      <div className="screen-content">
        <div className="auth-card onboarding-card auth-page-card">
          <p className="step-label">Password Reset</p>

          <h1 className="screen-title">Set a new password</h1>

          <p className="screen-subtitle">
            Enter your new password below. This page is intended to be opened
            from the reset link sent to your email.
          </p>

          {requestError ? (
            <div className="status-banner status-banner-error">{requestError}</div>
          ) : null}

          {requestSuccess ? (
            <div className="status-banner status-banner-success">
              {requestSuccess}
            </div>
          ) : null}

          <form className="auth-form-stack" onSubmit={handleSubmit} noValidate>
            <label className="field-group">
              <span className="field-label">New password</span>
              <input
                className={`field-input ${passwordError ? 'field-input-error' : ''}`}
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your new password"
                disabled={isSubmitting}
              />
              {passwordError ? (
                <span className="field-error">{passwordError}</span>
              ) : null}
            </label>

            <label className="field-group">
              <span className="field-label">Confirm new password</span>
              <input
                className={`field-input ${confirmPasswordError ? 'field-input-error' : ''}`}
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Re-enter your new password"
                disabled={isSubmitting}
              />
              {confirmPasswordError ? (
                <span className="field-error">{confirmPasswordError}</span>
              ) : null}
            </label>

            <button
              type="submit"
              className="button button-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Updating password...' : 'Update Password'}
            </button>

            <div className="form-actions single-action auth-page-footer">
              <Link className="button button-secondary button-link" to="/login">
                Back to login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ResetPasswordRoute