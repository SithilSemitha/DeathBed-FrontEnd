import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../lib/api";

function isValidEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email);
}

function ForgotPasswordRoute() {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [requestError, setRequestError] = useState<string>("");
  const [requestSuccess, setRequestSuccess] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEmailError("");
    setRequestError("");
    setRequestSuccess("");

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setEmailError("Please enter your email address");
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    const apiBase = import.meta.env.VITE_API_BASE;

    if (!apiBase) {
      setRequestError("API base URL is not configured. Reset link not sent.");
      return;
    }

    setIsSubmitting(true);

    try {
      await forgotPassword(trimmedEmail);
      setRequestSuccess("If that email exists, a reset link has been sent.");
    } catch (err: any) {
      setRequestError(
        err?.response?.data?.error ||
          err?.message ||
          "Could not request a password reset right now. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="screen-shell">
      <div className="screen-backdrop" />

      <div className="screen-content">
        <div className="auth-card onboarding-card auth-page-card">
          <p className="step-label">Password Reset</p>

          <h1 className="screen-title">Forgot your password?</h1>

          <p className="screen-subtitle">
            Enter your account email and we’ll send you a password reset link if
            the account exists.
          </p>

          {requestError ? (
            <div className="status-banner status-banner-error">
              {requestError}
            </div>
          ) : null}

          {requestSuccess ? (
            <div className="status-banner status-banner-success">
              {requestSuccess}
            </div>
          ) : null}

          <form className="auth-form-stack" onSubmit={handleSubmit} noValidate>
            <label className="field-group">
              <span className="field-label">Email</span>
              <input
                className={`field-input ${emailError ? "field-input-error" : ""}`}
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                disabled={isSubmitting}
              />
              {emailError ? (
                <span className="field-error">{emailError}</span>
              ) : null}
            </label>

            <button
              type="submit"
              className="button button-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending reset link..." : "Request Reset Link"}
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
  );
}

export default ForgotPasswordRoute;
