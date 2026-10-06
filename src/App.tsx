import type { ReactNode } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { hasStoredSession } from './lib/auth'
import OnboardingRoute from './routes/OnboardingRoute'
import DecisionInputRoute from './routes/DecisionInputRoute'
import DataUsageRoute from './routes/DataUsageRoute'
import LoginRoute from './routes/LoginRoute'
import SignUpRoute from './routes/SignUpRoute'
import ForgotPasswordRoute from './routes/ForgotPasswordRoute'
import ResetPasswordRoute from './routes/ResetPasswordRoute'
import DashboardRoute from './routes/DashboardRoute'
import AuthCallbackRoute from './routes/AuthCallbackRoute'
import MatchedProfilesRoute from './routes/MatchedProfilesRoute'
import BiasCheckRoute from './routes/BiasCheckRoute'
import RegretRatingRoute from './routes/RegretRatingRoute'
import JournalHistoryRoute from './routes/JournalHistoryRoute'
import JournalDetailRoute from './routes/JournalDetailRoute'
import SimilarStoriesRoute from './routes/SimilarStoriesRoute'
import FollowUpPreferenceRoute from './routes/FollowUpPreferenceRoute'
import './App.css'

function ProtectedRoute({ children }: { children: ReactNode }) {
  return hasStoredSession() ? <>{children}</> : <Navigate to="/login" replace />
}

function PublicOnlyRoute({ children }: { children: ReactNode }) {
  return hasStoredSession() ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <>{children}</>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate
              to={hasStoredSession() ? '/dashboard' : '/login'}
              replace
            />
          }
        />

        <Route path="/auth/callback" element={<AuthCallbackRoute />} />

        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <LoginRoute />
            </PublicOnlyRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <PublicOnlyRoute>
              <SignUpRoute />
            </PublicOnlyRoute>
          }
        />

        <Route
          path="/forgot-password"
          element={
            <PublicOnlyRoute>
              <ForgotPasswordRoute />
            </PublicOnlyRoute>
          }
        />

        <Route
          path="/reset-password"
          element={
            <PublicOnlyRoute>
              <ResetPasswordRoute />
            </PublicOnlyRoute>
          }
        />

        <Route
          path="/onboarding"
          element={
            <ProtectedRoute>
              <OnboardingRoute />
            </ProtectedRoute>
          }
        />

        <Route
          path="/data-usage"
          element={
            <ProtectedRoute>
              <DataUsageRoute />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardRoute />
            </ProtectedRoute>
          }
        />

        <Route
          path="/decisions/new"
          element={
            <ProtectedRoute>
              <DecisionInputRoute />
            </ProtectedRoute>
          }
        />

        <Route
          path="/matches"
          element={
            <ProtectedRoute>
              <MatchedProfilesRoute />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bias-check"
          element={
            <ProtectedRoute>
              <BiasCheckRoute />
            </ProtectedRoute>
          }
        />

        <Route
          path="/regret-rating"
          element={
            <ProtectedRoute>
              <RegretRatingRoute />
            </ProtectedRoute>
          }
        />

        <Route
          path="/journals"
          element={
            <ProtectedRoute>
              <JournalHistoryRoute />
            </ProtectedRoute>
          }
        />

        <Route
          path="/journals/:journalId"
          element={
            <ProtectedRoute>
              <JournalDetailRoute />
            </ProtectedRoute>
          }
        />

        <Route
          path="/similar-stories"
          element={
            <ProtectedRoute>
              <SimilarStoriesRoute />
            </ProtectedRoute>
          }
        />

        <Route
          path="/follow-up-preferences"
          element={
            <ProtectedRoute>
              <FollowUpPreferenceRoute />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App