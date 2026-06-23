import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import OnboardingRoute from './routes/OnboardingRoute'
import DecisionInputRoute from './routes/DecisionInputRoute'
import DataUsageRoute from './routes/DataUsageRoute'
import LoginRoute from './routes/LoginRoute'
import ForgotPasswordRoute from './routes/ForgotPasswordRoute'
import ResetPasswordRoute from './routes/ResetPasswordRoute'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/onboarding" replace />} />
        <Route path="/onboarding" element={<OnboardingRoute />} />
        <Route path="/data-usage" element={<DataUsageRoute />} />
        <Route path="/login" element={<LoginRoute />} />
        <Route path="/forgot-password" element={<ForgotPasswordRoute />} />
        <Route path="/reset-password" element={<ResetPasswordRoute />} />
        <Route path="/decisions/new" element={<DecisionInputRoute />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App