export type MatchProfile = {
  id: string
  label: string
  age: number
  countryCode: string
  countryLabel: string
  incomeBracket: string
  incomeLabel: string
}

export type MatchFilters = {
  minAge: string
  maxAge: string
  country: string
  incomeBracket: string
}

export type PreparedMatchFilterPayload = {
  ageMin?: number
  ageMax?: number
  country?: string
  incomeBracket?: string
}

export type FinancialChoice = {
  title: string
  label: string
  value: number
  summary: string
}

export type FinancialComparisonData = {
  dimension: string
  choiceA: FinancialChoice
  choiceB: FinancialChoice
  quickSummary: string
}

export const initialMatchFilters: MatchFilters = {
  minAge: '',
  maxAge: '',
  country: '',
  incomeBracket: '',
}

export const countryOptions = [
  { value: 'LK', label: 'Sri Lanka' },
  { value: 'SE', label: 'Sweden' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'CA', label: 'Canada' },
  { value: 'US', label: 'United States' },
]

export const incomeOptions = [
  { value: 'under_25k', label: 'Under $25k' },
  { value: '25k_50k', label: '$25k - $50k' },
  { value: '50k_100k', label: '$50k - $100k' },
  { value: '100k_200k', label: '$100k - $200k' },
  { value: '200k_plus', label: '$200k+' },
  { value: 'prefer_not_say', label: 'Prefer not to say' },
]

export const mockProfiles: MatchProfile[] = [
  {
    id: 'a',
    label: 'Person A',
    age: 27,
    countryCode: 'LK',
    countryLabel: 'Sri Lanka',
    incomeBracket: '25k_50k',
    incomeLabel: '$25k - $50k',
  },
  {
    id: 'b',
    label: 'Person B',
    age: 31,
    countryCode: 'GB',
    countryLabel: 'United Kingdom',
    incomeBracket: '50k_100k',
    incomeLabel: '$50k - $100k',
  },
  {
    id: 'c',
    label: 'Person C',
    age: 24,
    countryCode: 'CA',
    countryLabel: 'Canada',
    incomeBracket: 'under_25k',
    incomeLabel: 'Under $25k',
  },
  {
    id: 'd',
    label: 'Person D',
    age: 29,
    countryCode: 'SE',
    countryLabel: 'Sweden',
    incomeBracket: '100k_200k',
    incomeLabel: '$100k - $200k',
  },
]

export const mockFinancialComparison: FinancialComparisonData = {
  dimension: 'Financial outcomes',
  choiceA: {
    title: 'Choice A',
    label: 'Stay in current path',
    value: 46,
    summary: 'More stable short-term income, but slower upside over time.',
  },
  choiceB: {
    title: 'Choice B',
    label: 'Take the alternative path',
    value: 74,
    summary: 'Higher upside potential, but more volatility in the early phase.',
  },
  quickSummary:
    'In this mock view, Choice B shows a stronger financial upside than Choice A, while Choice A appears more stable but less rewarding over time.',
}

const countryLabelMap: Record<string, string> = {
  LK: 'Sri Lanka',
  SE: 'Sweden',
  GB: 'United Kingdom',
  CA: 'Canada',
  US: 'United States',
}

const incomeLabelMap: Record<string, string> = {
  under_25k: 'Under $25k',
  '25k_50k': '$25k - $50k',
  '50k_100k': '$50k - $100k',
  '100k_200k': '$100k - $200k',
  '200k_plus': '$200k+',
  prefer_not_say: 'Prefer not to say',
}

export function buildActiveFilterSummary(filters: MatchFilters): string[] {
  const summary: string[] = []

  if (filters.minAge) summary.push(`Min age: ${filters.minAge}`)
  if (filters.maxAge) summary.push(`Max age: ${filters.maxAge}`)

  if (filters.country) {
    summary.push(`Country: ${countryLabelMap[filters.country]}`)
  }

  if (filters.incomeBracket) {
    summary.push(`Income: ${incomeLabelMap[filters.incomeBracket]}`)
  }

  return summary
}

export function buildMatchFilterPayload(
  filters: MatchFilters,
): PreparedMatchFilterPayload {
  const payload: PreparedMatchFilterPayload = {}

  if (filters.minAge) {
    payload.ageMin = Number(filters.minAge)
  }

  if (filters.maxAge) {
    payload.ageMax = Number(filters.maxAge)
  }

  if (filters.country) {
    payload.country = filters.country
  }

  if (filters.incomeBracket) {
    payload.incomeBracket = filters.incomeBracket
  }

  return payload
}

export function filterProfiles(
  profiles: MatchProfile[],
  filters: MatchFilters,
): MatchProfile[] {
  return profiles.filter((profile) => {
    const minAgeMatches =
      !filters.minAge || profile.age >= Number(filters.minAge)

    const maxAgeMatches =
      !filters.maxAge || profile.age <= Number(filters.maxAge)

    const countryMatches =
      !filters.country || profile.countryCode === filters.country

    const incomeMatches =
      !filters.incomeBracket ||
      profile.incomeBracket === filters.incomeBracket

    return minAgeMatches && maxAgeMatches && countryMatches && incomeMatches
  })
}