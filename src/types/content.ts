export interface Episode {
  id: string
  number: string
  title: string
  summary: string
  audioUrl: string
  coverUrl?: string
  duration?: string
  size?: string
  tags: string[]
  downloadName?: string
  external?: boolean
}

export interface Show {
  showNumber: string
  slug: string
  title: string
  eyebrow: string
  lead: string
  summary: string
  coverUrl: string
  homeTag: string
  homeDescription: string
  badges: string[]
  statement: string
  episodes: Episode[]
}
