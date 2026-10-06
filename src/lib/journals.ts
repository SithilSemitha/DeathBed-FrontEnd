export type JournalHistoryItem = {
  id: string
  title: string
  status: 'Completed' | 'In Progress'
  date: string
  summary: string
  category: string
  promptCount: number
  lastUpdated: string
  focus: string
}

export const mockJournalHistory: JournalHistoryItem[] = [
  {
    id: 'journal-1',
    title: 'Career change reflection journal',
    status: 'Completed',
    date: '22 Jun 2026',
    summary:
      'A completed pre-mortem journal exploring whether changing to a lower-paying but more meaningful path would create future regret.',
    category: 'Career',
    promptCount: 5,
    lastUpdated: '22 Jun 2026',
    focus: 'Meaning vs financial stability',
  },
  {
    id: 'journal-2',
    title: 'Study abroad decision journal',
    status: 'In Progress',
    date: '20 Jun 2026',
    summary:
      'A partially completed reflection about moving abroad for postgraduate study and the trade-offs involved.',
    category: 'Education',
    promptCount: 3,
    lastUpdated: '21 Jun 2026',
    focus: 'Opportunity vs distance from family',
  },
  {
    id: 'journal-3',
    title: 'Relationship future-risk journal',
    status: 'Completed',
    date: '14 Jun 2026',
    summary:
      'A completed journal focused on identifying possible future regrets around staying in or leaving a relationship.',
    category: 'Relationship',
    promptCount: 5,
    lastUpdated: '14 Jun 2026',
    focus: 'Long-term compatibility and emotional cost',
  },
]

export function fetchMockJournalHistory(): Promise<JournalHistoryItem[]> {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve(mockJournalHistory)
    }, 900)
  })
}

export function getMockJournalById(journalId: string): JournalHistoryItem | null {
  return (
    mockJournalHistory.find((journal) => journal.id === journalId) ?? null
  )
}