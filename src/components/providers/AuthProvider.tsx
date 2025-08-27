'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User, UserProfile, UsageStats } from '@/types'

interface AuthContextType {
  user: User | null
  userProfile: UserProfile | null
  usageStats: UsageStats | null
  loading: boolean
  signIn: (provider?: string) => Promise<void>
  signOut: () => Promise<void>
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>
  isSubscribed: boolean
  canMakeReading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [usageStats, setUsageStats] = useState<UsageStats | null>(null)
  const [loading, setLoading] = useState(true)

  // Mock authentication for MVP - replace with NextAuth.js later
  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('mystical_user')
    const storedProfile = localStorage.getItem('mystical_profile')
    const storedUsage = localStorage.getItem('mystical_usage')

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
        if (storedProfile) setUserProfile(JSON.parse(storedProfile))
        if (storedUsage) setUsageStats(JSON.parse(storedUsage))
      } catch (error) {
        console.error('Error loading stored session:', error)
      }
    } else {
      // Create guest profile with daily free readings
      const guestUsage: UsageStats = {
        dailyReadings: 0,
        monthlyReadings: 0,
        freeReadingsRemaining: 3, // 3 free readings per day for guests
        lastReading: undefined
      }
      setUsageStats(guestUsage)
      localStorage.setItem('mystical_usage', JSON.stringify(guestUsage))
    }
    
    setLoading(false)
  }, [])

  const signIn = async (provider?: string) => {
    // Mock sign-in - replace with real authentication
    const mockUser: User = {
      id: `user_${Date.now()}`,
      email: 'user@example.com',
      name: 'Mystical Seeker',
      provider: provider || 'google'
    }

    const mockProfile: UserProfile = {
      id: mockUser.id,
      name: mockUser.name,
      email: mockUser.email,
      joinDate: new Date().toISOString(),
      subscription: {
        plan: 'free',
        status: 'active'
      },
      preferences: {
        readingType: ['threeCard'],
        focusAreas: ['love', 'career'],
        notifications: true
      },
      stats: {
        totalReadings: 0,
        joinedDaysAgo: 0
      }
    }

    const mockUsage: UsageStats = {
      dailyReadings: 0,
      monthlyReadings: 0,
      freeReadingsRemaining: 10 // Registered users get more free readings
    }

    setUser(mockUser)
    setUserProfile(mockProfile)
    setUsageStats(mockUsage)

    localStorage.setItem('mystical_user', JSON.stringify(mockUser))
    localStorage.setItem('mystical_profile', JSON.stringify(mockProfile))
    localStorage.setItem('mystical_usage', JSON.stringify(mockUsage))
  }

  const signOut = async () => {
    setUser(null)
    setUserProfile(null)
    
    // Keep some usage stats for guests
    const guestUsage: UsageStats = {
      dailyReadings: 0,
      monthlyReadings: 0,
      freeReadingsRemaining: 1 // Reduced for guests
    }
    setUsageStats(guestUsage)

    localStorage.removeItem('mystical_user')
    localStorage.removeItem('mystical_profile')
    localStorage.setItem('mystical_usage', JSON.stringify(guestUsage))
  }

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!userProfile) return

    const updatedProfile = { ...userProfile, ...updates }
    setUserProfile(updatedProfile)
    localStorage.setItem('mystical_profile', JSON.stringify(updatedProfile))
  }

  const updateUsageStats = (newStats: Partial<UsageStats>) => {
    if (!usageStats) return

    const updatedStats = { ...usageStats, ...newStats }
    setUsageStats(updatedStats)
    localStorage.setItem('mystical_usage', JSON.stringify(updatedStats))
  }

  const isSubscribed = userProfile?.subscription?.plan !== 'free' && 
                      userProfile?.subscription?.status === 'active'

  const canMakeReading = (usageStats?.freeReadingsRemaining || 0) > 0 || isSubscribed

  const value = {
    user,
    userProfile,
    usageStats,
    loading,
    signIn,
    signOut,
    updateProfile,
    isSubscribed,
    canMakeReading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}