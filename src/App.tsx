import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import OnboardingRoute from './routes/OnboardingRoute.tsx'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/onboarding" replace />} />
        <Route path="/onboarding" element={<OnboardingRoute />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App