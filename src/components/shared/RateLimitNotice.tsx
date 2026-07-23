interface RateLimitNoticeProps {
  secondsRemaining: number
  featureLabel: string
}

function RateLimitNotice({
  secondsRemaining,
  featureLabel,
}: RateLimitNoticeProps) {
  if (secondsRemaining <= 0) {
    return null
  }

  return (
    <div className="rate-limit-panel" role="status" aria-live="polite">
      <h3 className="rate-limit-title">AI temporarily throttled</h3>
      <p className="rate-limit-copy">
        {featureLabel} is experiencing high demand right now. Please wait{' '}
        <strong>{secondsRemaining}s</strong> before trying again. Your current
        input has been preserved.
      </p>
    </div>
  )
}

export default RateLimitNotice