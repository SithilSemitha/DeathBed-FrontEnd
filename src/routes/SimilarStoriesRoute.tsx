import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import RateLimitNotice from '../components/shared/RateLimitNotice'

type SimilarStory = {
  id: string
  label: string
  title: string
  summary: string
}

const mockSimilarStories: SimilarStory[] = [
  {
    id: 'story-1',
    label: 'Story Preview 1',
    title: 'Leaving a stable role for uncertain work',
    summary:
      'A story about someone who left a predictable path to pursue more meaningful work, later reflecting on trade-offs between safety and fulfillment.',
  },
  {
    id: 'story-2',
    label: 'Story Preview 2',
    title: 'Choosing risk for long-term growth',
    summary:
      'A story about accepting short-term instability in exchange for long-term career growth, and the regret signals that appeared along the way.',
  },
  {
    id: 'story-3',
    label: 'Story Preview 3',
    title: 'Staying with the familiar option too long',
    summary:
      'A story about delaying change because the known path felt safer, followed by reflection on missed opportunities.',
  },
]

function SimilarStoriesRoute() {
  const [decisionContext, setDecisionContext] = useState<string>('')
  const [hasSearched, setHasSearched] = useState<boolean>(false)
  const [rateLimitSeconds, setRateLimitSeconds] = useState<number>(0)

  const contextLength = decisionContext.trim().length

  const canSearch = useMemo(() => {
    return contextLength >= 20
  }, [contextLength])

  const isRateLimited = rateLimitSeconds > 0

  useEffect(() => {
    if (rateLimitSeconds <= 0) {
      return
    }

    const timer = window.setInterval(() => {
      setRateLimitSeconds((current) => {
        if (current <= 1) {
          window.clearInterval(timer)
          return 0
        }

        return current - 1
      })
    }, 1000)

    return () => window.clearInterval(timer)
  }, [rateLimitSeconds])

  const handleSearch = () => {
    if (!canSearch || isRateLimited) {
      return
    }

    if (decisionContext.toLowerCase().includes('rate-limit-demo')) {
      setHasSearched(false)
      setRateLimitSeconds(10)
      return
    }

    setHasSearched(true)
  }

  const handleContextChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setDecisionContext(event.target.value)

    if (hasSearched) {
      setHasSearched(false)
    }
  }

  return (
    <section className="screen-shell">
      <div className="screen-backdrop" />

      <div className="screen-content dashboard-content">
        <div className="dashboard-header">
          <div>
            <p className="step-label">Similar Stories</p>
            <h1 className="screen-title">Stories similar to your decision</h1>
            <p className="screen-subtitle">
              This section will later help users explore regret stories that are
              similar in meaning, not just matching keywords.
            </p>
          </div>

          <Link className="button button-secondary button-link" to="/decisions/new">
            Back to decision input
          </Link>
        </div>

        <div className="stories-layout">
          <section className="auth-card onboarding-card stories-main-card">
            <div className="stories-search-header">
              <h2 className="stories-section-title">Semantic story search</h2>
              <p className="stories-section-copy">
                Search results here are a frontend preview of where similar
                regret stories will appear once backend semantic matching is
                connected.
              </p>
            </div>

            <RateLimitNotice
              secondsRemaining={rateLimitSeconds}
              featureLabel="Similar story search"
            />

            <div className="stories-search-box">
              <label className="field-group">
                <span className="field-label">Decision context</span>
                <textarea
                  className="field-input stories-textarea"
                  value={decisionContext}
                  onChange={handleContextChange}
                  placeholder="Example: I am deciding whether to leave a secure career path for a more meaningful but less certain opportunity."
                />
                <span className="field-helper">
                  Later, the system will use this text to search for regret
                  stories with similar meaning.
                </span>
              </label>

              <div className="stories-search-footer">
                <span className="decision-counter">
                  {contextLength} / minimum 20
                </span>
                <button
                  type="button"
                  className="button button-primary"
                  disabled={!canSearch || isRateLimited}
                  onClick={handleSearch}
                >
                  {isRateLimited
                    ? `Retry in ${rateLimitSeconds}s`
                    : 'Find Similar Stories'}
                </button>
              </div>
            </div>

            {hasSearched ? (
              <div className="stories-results-panel">
                <p className="step-label stories-results-step-label">
                  Search Results
                </p>
                <h2 className="stories-section-title">Similar regret stories</h2>
                <p className="stories-section-copy">
                  These mock results represent the kinds of stories the user may
                  see after semantic matching is performed.
                </p>

                <div className="stories-results-list">
                  {mockSimilarStories.map((story) => (
                    <article key={story.id} className="story-result-card">
                      <p className="story-result-label">{story.label}</p>
                      <h3 className="story-result-title">{story.title}</h3>
                      <p className="story-result-copy">{story.summary}</p>
                    </article>
                  ))}
                </div>
              </div>
            ) : (
              <div className="stories-results-list">
                <article className="story-result-card">
                  <p className="story-result-label">Story Preview 1</p>
                  <h3 className="story-result-title">
                    Leaving a stable role for uncertain work
                  </h3>
                  <p className="story-result-copy">
                    A story about someone who left a predictable path to pursue
                    more meaningful work, later reflecting on trade-offs between
                    safety and fulfillment.
                  </p>
                </article>

                <article className="story-result-card">
                  <p className="story-result-label">Story Preview 2</p>
                  <h3 className="story-result-title">
                    Choosing risk for long-term growth
                  </h3>
                  <p className="story-result-copy">
                    A story about accepting short-term instability in exchange
                    for long-term career growth, and the regret signals that
                    appeared along the way.
                  </p>
                </article>

                <article className="story-result-card">
                  <p className="story-result-label">Story Preview 3</p>
                  <h3 className="story-result-title">
                    Staying with the familiar option too long
                  </h3>
                  <p className="story-result-copy">
                    A story about delaying change because the known path felt
                    safer, followed by reflection on missed opportunities.
                  </p>
                </article>
              </div>
            )}
          </section>

          <aside className="stories-side-card">
            <p className="step-label decision-side-step">Why this matters</p>
            <h2 className="decision-side-title">
              Meaning matters more than exact words
            </h2>
            <ul className="decision-side-list">
              <li>Find similar stories by real situation, not wording alone</li>
              <li>Support more relevant profile matching later</li>
              <li>Help users compare emotional and practical outcomes</li>
              <li>Prepare for stronger insight before decision commitment</li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  )
}

export default SimilarStoriesRoute