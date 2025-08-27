import { NextRequest, NextResponse } from 'next/server'
import { LunaAI, UserProfile, TarotReading } from '@/services/luna-ai'
import { FULL_TAROT_DECK, TAROT_SPREADS } from '@/data/tarot-database'
import { TarotCard } from '@/data/tarot-cards'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { question, spreadType = 'threeCard', userProfile } = body

    if (!question) {
      return NextResponse.json(
        { error: 'Question is required' },
        { status: 400 }
      )
    }

    // Initialize Luna AI
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      throw new Error('OpenAI API key not configured')
    }

    const luna = new LunaAI(apiKey)

    // Shuffle and draw cards
    const shuffledDeck = [...FULL_TAROT_DECK].sort(() => Math.random() - 0.5)
    const spread = TAROT_SPREADS[spreadType as keyof typeof TAROT_SPREADS] || TAROT_SPREADS.threeCard
    const drawnCards = shuffledDeck.slice(0, spread.positions.length)

    // Generate reading
    const interpretation = await luna.generateReading(
      drawnCards,
      question,
      userProfile || {},
      spreadType
    )

    // Create reading object
    const reading: TarotReading = {
      id: `reading_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      date: new Date().toISOString(),
      cards: drawnCards,
      interpretation,
      question,
      spread: spreadType,
      reversed: drawnCards.map(() => Math.random() < 0.3) // 30% chance of reversed
    }

    return NextResponse.json({
      success: true,
      reading,
      spread: spread.positions
    })

  } catch (error) {
    console.error('Error generating reading:', error)
    return NextResponse.json(
      { error: 'Failed to generate reading. Please try again.' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userProfile = searchParams.get('userProfile')
    
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      throw new Error('OpenAI API key not configured')
    }

    const luna = new LunaAI(apiKey)
    const profile = userProfile ? JSON.parse(userProfile) : {}
    
    const greeting = await luna.generatePersonalizedGreeting(profile)
    const dailyInsight = await luna.generateDailyInsight(profile)

    return NextResponse.json({
      success: true,
      greeting,
      dailyInsight,
      availableSpreads: Object.entries(TAROT_SPREADS).map(([key, spread]) => ({
        id: key,
        name: spread.name,
        description: spread.description,
        positions: spread.positions
      }))
    })

  } catch (error) {
    console.error('Error getting Luna data:', error)
    return NextResponse.json(
      { error: 'Failed to connect with Luna. Please try again.' },
      { status: 500 }
    )
  }
}