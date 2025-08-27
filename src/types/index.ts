import { TarotCard } from '@/data/tarot-cards'

export interface UserProfile {
  id?: string
  name?: string
  email?: string
  birthDate?: string
  zodiacSign?: string
  joinDate?: string
  subscription?: {
    plan: 'free' | 'basic' | 'premium'
    status: 'active' | 'cancelled' | 'expired'
    expiresAt?: string
  }
  preferences?: {
    readingType: string[]
    focusAreas: string[]
    notifications: boolean
  }
  stats?: {
    totalReadings: number
    favoriteCard?: string
    joinedDaysAgo: number
  }
}

export interface TarotReading {
  id: string
  userId?: string
  date: string
  cards: TarotCard[]
  interpretation: string
  question?: string
  spread: string
  reversed: boolean[]
  favorite?: boolean
  tags?: string[]
}

export interface ReadingSession {
  id: string
  question: string
  spreadType: string
  cards?: TarotCard[]
  interpretation?: string
  stage: 'question' | 'drawing' | 'revealing' | 'complete'
  createdAt: string
}

// API Response types
export interface LunaResponse {
  success: boolean
  greeting?: string
  dailyInsight?: string
  reading?: TarotReading
  spread?: string[]
  availableSpreads?: Array<{
    id: string
    name: string
    description: string
    positions: string[]
  }>
  error?: string
}

// Authentication types
export interface User {
  id: string
  email: string
  name?: string
  image?: string
  provider?: string
  profile?: UserProfile
}

// Subscription types
export interface SubscriptionPlan {
  id: string
  name: string
  price: number
  interval: 'month' | 'year'
  features: string[]
  stripePriceId: string
}

// Usage tracking
export interface UsageStats {
  dailyReadings: number
  monthlyReadings: number
  lastReading?: string
  freeReadingsRemaining: number
}

// Component prop types
export interface CardComponentProps {
  card: TarotCard
  isRevealed: boolean
  isReversed: boolean
  onReveal?: () => void
  className?: string
}

export interface ReadingDisplayProps {
  reading: TarotReading
  spread: string[]
  onShare?: () => void
  onSave?: () => void
}