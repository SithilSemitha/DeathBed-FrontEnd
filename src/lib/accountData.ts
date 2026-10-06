export type DecisionHistoryItem = {
  id: string
  title: string
  savedAt: string
  category: string
}

export type AnalysisHistoryItem = {
  id: string
  title: string
  lastOpened: string
  relatedDecision: string
  type: string
}

export type JournalLinkItem = {
  id: string
  title: string
  status: 'Completed' | 'In Progress'
  relatedDecision: string
}

type StoredDashboardData = {
  decisions: DecisionHistoryItem[]
  analyses: AnalysisHistoryItem[]
  journals: JournalLinkItem[]
}

function buildStorageKey(email: string): string {
  return `deathbed.savedData.${email.toLowerCase()}`
}

function buildDefaultDashboardData(email: string): StoredDashboardData {
  const emailLabel = email.split('@')[0] || 'user'

  return {
    decisions: [
      {
        id: 'decision-1',
        title: `${emailLabel}'s career change to startup`,
        savedAt: 'Saved 2 days ago',
        category: 'Career',
      },
      {
        id: 'decision-2',
        title: `${emailLabel}'s postgraduate study move`,
        savedAt: 'Saved 1 week ago',
        category: 'Education',
      },
      {
        id: 'decision-3',
        title: `${emailLabel}'s relationship decision`,
        savedAt: 'Saved 3 weeks ago',
        category: 'Relationship',
      },
    ],
    analyses: [
      {
        id: 'analysis-1',
        title: 'Future trajectory summary',
        lastOpened: 'Last opened yesterday',
        relatedDecision: `${emailLabel}'s career change to startup`,
        type: 'Trajectory',
      },
      {
        id: 'analysis-2',
        title: 'Bias review snapshot',
        lastOpened: 'Last opened 4 days ago',
        relatedDecision: `${emailLabel}'s postgraduate study move`,
        type: 'Bias Check',
      },
      {
        id: 'analysis-3',
        title: 'Future self conversation',
        lastOpened: 'Last opened 1 week ago',
        relatedDecision: `${emailLabel}'s relationship decision`,
        type: 'Chat',
      },
    ],
    journals: [
      {
        id: 'journal-1',
        title: `${emailLabel}'s career reflection journal`,
        status: 'Completed',
        relatedDecision: `${emailLabel}'s career change to startup`,
      },
      {
        id: 'journal-2',
        title: `${emailLabel}'s study abroad journal`,
        status: 'In Progress',
        relatedDecision: `${emailLabel}'s postgraduate study move`,
      },
    ],
  }
}

export function getOrSeedSavedDashboardData(email: string): StoredDashboardData {
  const storageKey = buildStorageKey(email)
  const existing = localStorage.getItem(storageKey)

  if (existing) {
    try {
      return JSON.parse(existing) as StoredDashboardData
    } catch {
      localStorage.removeItem(storageKey)
    }
  }

  const seeded = buildDefaultDashboardData(email)
  localStorage.setItem(storageKey, JSON.stringify(seeded))
  return seeded
}

export function saveDashboardData(
  email: string,
  data: StoredDashboardData,
): void {
  localStorage.setItem(buildStorageKey(email), JSON.stringify(data))
}