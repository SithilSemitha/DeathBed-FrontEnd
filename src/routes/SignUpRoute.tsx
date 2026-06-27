import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup, googleLogin } from "../lib/api";

function SignUpRoute() {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [requestError, setRequestError] = useState<string>("");

  function validate() {
    const next: Record<string, string> = {};

    if (!email.trim()) next.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      next.email = "Please enter a valid email address.";

    if (!password) next.password = "Password is required.";
    else if (password.length < 8)
      next.password = "Password must be at least 8 characters.";

    if (confirmPassword !== password)
      next.confirmPassword = "Passwords do not match.";

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setRequestError("");
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const res = await signup(email.trim(), password);
      if (res?.error) {
        setRequestError(res.error);
        return;
      }

      // After signup, send user to onboarding to complete profile
      navigate("/onboarding");
    } catch (err: any) {
      setRequestError(
        err?.response?.data?.error ||
          err?.message ||
          "Could not create account right now. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleGoogleSignIn() {
    setRequestError("");
    setIsSubmitting(true);

    try {
      const res = await googleLogin();
      const url = res?.url || res?.data?.url;
      if (!url) throw new Error("Could not get Google login URL");
      window.location.href = url;
    } catch (err: any) {
      setRequestError(err?.message || "Google sign-in failed");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="screen-shell">
      <div className="screen-backdrop" />

      <div className="screen-content">
        <div className="auth-card onboarding-card auth-page-card">
          <p className="step-label">Create account</p>

          <h1 className="screen-title">Sign up</h1>

          {requestError ? (
            <div className="status-banner status-banner-error">
              {requestError}
            </div>
          ) : null}

          <form className="auth-form-stack" onSubmit={handleSubmit} noValidate>
            <label className="field-group">
              <span className="field-label">Email</span>
              <input
                className={`field-input ${errors.email ? "field-input-error" : ""}`}
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
              />
              {errors.email ? (
                <span className="field-error">{errors.email}</span>
              ) : null}
            </label>

            <label className="field-group">
              <span className="field-label">Password</span>
              <input
                className={`field-input ${errors.password ? "field-input-error" : ""}`}
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
              />
              {errors.password ? (
                <span className="field-error">{errors.password}</span>
              ) : null}
            </label>

            <label className="field-group">
              <span className="field-label">Confirm password</span>
              <input
                className={`field-input ${errors.confirmPassword ? "field-input-error" : ""}`}
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isSubmitting}
              />
              {errors.confirmPassword ? (
                <span className="field-error">{errors.confirmPassword}</span>
              ) : null}
            </label>

            <button
              type="submit"
              className="button button-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating account..." : "Create account"}
            </button>
          </form>

                              <div className="auth-alt-actions">
            <div className="auth-divider">
              <span>or</span>
            </div>

            <button
              type="button"
              className="button button-google auth-full-width-button"
              onClick={handleGoogleSignIn}
              disabled={isSubmitting}
            >
              Continue with Google
            </button>

            <p className="auth-footer-link-row">
              Already have an account?{' '}
              <Link className="inline-link" to="/login">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUpRoute;
