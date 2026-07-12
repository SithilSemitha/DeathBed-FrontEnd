import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getMockJournalById } from '../lib/journals'

function buildMockPdfBlob(title: string): Blob {
  const safeTitle = title.replace(/[()]/g, '')
  const pdfContent = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj
4 0 obj
<< /Length 98 >>
stream
BT
/F1 18 Tf
72 720 Td
(Mock Journal Export) Tj
0 -28 Td
/F1 12 Tf
(${safeTitle}) Tj
0 -20 Td
(This is a frontend placeholder PDF download.) Tj
ET
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
xref
0 6
0000000000 65535 f 
0000000010 00000 n 
0000000063 00000 n 
0000000122 00000 n 
0000000248 00000 n 
0000000397 00000 n 
trailer
<< /Root 1 0 R /Size 6 >>
startxref
467
%%EOF`

  return new Blob([pdfContent], { type: 'application/pdf' })
}

function JournalDetailRoute() {
  const { journalId = '' } = useParams()
  const journal = getMockJournalById(journalId)
  const [exportMessage, setExportMessage] = useState<string>('')
  const [isExporting, setIsExporting] = useState<boolean>(false)

  const handleExportClick = async () => {
    if (!journal) {
      return
    }

    if (journal.status !== 'Completed') {
      setExportMessage('Only completed journals can be exported as PDF.')
      return
    }

    setIsExporting(true)
    setExportMessage('Preparing PDF download...')

    try {
      const pdfBlob = buildMockPdfBlob(journal.title)
      const fileUrl = window.URL.createObjectURL(pdfBlob)

      const anchor = document.createElement('a')
      anchor.href = fileUrl
      anchor.download = `${journal.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')}.pdf`

      document.body.appendChild(anchor)
      anchor.click()
      document.body.removeChild(anchor)
      window.URL.revokeObjectURL(fileUrl)

      setExportMessage('PDF download started successfully.')
    } catch {
      setExportMessage('Could not start the PDF download right now.')
    } finally {
      setIsExporting(false)
    }
  }

  if (!journal) {
    return (
      <section className="screen-shell">
        <div className="screen-backdrop" />

        <div className="screen-content dashboard-content">
          <div className="auth-card onboarding-card">
            <p className="step-label">Journal Detail</p>
            <h1 className="screen-title">Journal not found</h1>
            <p className="screen-subtitle">
              We could not find the journal you were trying to reopen.
            </p>

            <div className="form-actions single-action">
              <Link className="button button-secondary button-link" to="/journals">
                Back to journal history
              </Link>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="screen-shell">
      <div className="screen-backdrop" />

      <div className="screen-content dashboard-content">
        <div className="dashboard-header">
          <div>
            <p className="step-label">Journal Detail</p>
            <h1 className="screen-title">{journal.title}</h1>
            <p className="screen-subtitle">
              Reopened from your journal history so you can revisit or continue
              your reflection.
            </p>
          </div>

          <div className="journal-detail-header-actions">
            {journal.status === 'Completed' ? (
              <button
                type="button"
                className="button button-primary"
                onClick={handleExportClick}
                disabled={isExporting}
              >
                {isExporting ? 'Preparing PDF...' : 'Export PDF'}
              </button>
            ) : null}

            <Link className="button button-secondary button-link" to="/journals">
              Back to journal history
            </Link>
          </div>
        </div>

        <div className="journal-history-layout">
          <section className="journal-history-main">
            {exportMessage ? (
              <div className="journal-export-message">{exportMessage}</div>
            ) : null}

            <article className="journal-history-card journal-detail-card">
              <div className="journal-history-card-top">
                <span
                  className={`journal-status-pill ${
                    journal.status === 'Completed'
                      ? 'journal-status-complete'
                      : 'journal-status-draft'
                  }`}
                >
                  {journal.status}
                </span>
                <span className="journal-history-date">{journal.date}</span>
              </div>

              <div className="journal-entry-meta-row">
                <span className="journal-entry-meta-pill">{journal.category}</span>
                <span className="journal-entry-meta-pill">
                  {journal.promptCount} prompts completed
                </span>
                <span className="journal-entry-meta-pill">
                  Updated {journal.lastUpdated}
                </span>
              </div>

              <p className="journal-history-card-copy">{journal.summary}</p>

              <div className="journal-entry-focus-block">
                <span className="journal-entry-focus-label">Reflection focus</span>
                <p className="journal-entry-focus-text">{journal.focus}</p>
              </div>

              <div className="journal-detail-body">
                <h3 className="journal-detail-body-title">Journal content preview</h3>
                <p className="journal-detail-body-copy">
                  This mock reopened view shows where the full journal content
                  will appear later. For now, it proves the frontend reopen/view
                  flow works correctly from the journal history page.
                </p>
              </div>
            </article>
          </section>

          <aside className="journal-history-side-card">
            <p className="step-label decision-side-step">What you can do here</p>
            <h2 className="decision-side-title">
              Revisit or continue earlier reflection
            </h2>
            <ul className="decision-side-list">
              <li>Review what you previously wrote</li>
              <li>Compare old concerns with current thinking</li>
              <li>Continue unfinished journal work</li>
              <li>Prepare future export actions</li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  )
}

export default JournalDetailRoute