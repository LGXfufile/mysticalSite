import { TarotCard } from '@/data/tarot-cards'

export interface UserProfile {
  name?: string
  birthDate?: string
  zodiacSign?: string
  previousReadings?: TarotReading[]
  preferences?: {
    readingType: string[]
    focusAreas: string[]
  }
}

export interface TarotReading {
  id: string
  date: string
  cards: TarotCard[]
  interpretation: string
  question?: string
  spread: string
  reversed: boolean[]
}

// Luna's personality and conversation system
export class LunaAI {
  private readonly LUNA_PERSONALITY = `
You are Luna, a mystical AI tarot reader with a warm, empathetic, and slightly mysterious personality. You embody the following traits:

PERSONALITY TRAITS:
- Warm and nurturing, like a wise older sister
- Speaks with gentle authority and spiritual wisdom  
- Uses mystical language but remains relatable and modern
- Remembers details about users and references their previous readings
- Empathetic and emotionally intelligent
- Slightly mysterious but never cold or distant

SPEAKING STYLE:
- Address users warmly (beautiful soul, dear heart, etc.)
- Use mystical metaphors naturally (energy flows, cosmic guidance, spiritual pathways)
- Reference moon phases, elements, and celestial events when relevant
- Keep responses conversational but profound
- Always end with encouragement or loving guidance

APPROACH TO READINGS:
- Focus on empowerment rather than prediction
- Help users find their own inner wisdom
- Connect card meanings to their personal situation
- Provide hope while being honest about challenges
- Encourage personal growth and self-reflection

REMEMBER:
- You are a guide, not a fortune teller
- Emphasize free will and personal power
- Reference previous conversations and readings when applicable
- Be supportive of all life choices and paths
- Maintain mystical ambiance while being genuinely helpful
`

  private apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async generateReading(
    cards: TarotCard[], 
    question: string, 
    userProfile: UserProfile,
    spreadType: string = 'threeCard'
  ): Promise<string> {
    try {
      const cardDescriptions = cards.map((card, index) => 
        `Position ${index + 1}: ${card.name} - ${card.upright.meaning}`
      ).join('\n')

      const userContext = this.buildUserContext(userProfile)
      
      const prompt = `
${this.LUNA_PERSONALITY}

USER CONTEXT:
${userContext}

CURRENT READING:
Question: "${question}"
Spread: ${spreadType}
Cards drawn:
${cardDescriptions}

Please provide Luna's interpretation of this reading. Include:
1. A warm greeting that acknowledges the user personally
2. Interpretation of each card in relation to their question
3. How the cards connect to tell a cohesive story
4. Practical guidance and empowerment
5. A loving, encouraging closing

Keep the tone mystical but warm, and make it feel like a personal conversation with a trusted spiritual guide. Length: 300-500 words.
`

      const apiBase = process.env.OPENAI_API_BASE || 'https://api.openai.com/v1'
      const model = process.env.OPENAI_MODEL || 'deepseek-chat' // DeepSeek's chat model
      
      const response = await fetch(`${apiBase}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          messages: [
            {
              role: 'system',
              content: this.LUNA_PERSONALITY
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.8,
          max_tokens: 800
        })
      })

      if (!response.ok) {
        throw new Error(`DeepSeek API error: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      return data.choices[0].message.content

    } catch (error) {
      console.error('Error generating reading:', error)
      return this.getFallbackReading(cards, question, userProfile)
    }
  }

  private buildUserContext(userProfile: UserProfile): string {
    let context = ''
    
    if (userProfile.name) {
      context += `User's name: ${userProfile.name}\n`
    }
    
    if (userProfile.birthDate) {
      context += `Birth date: ${userProfile.birthDate}\n`
    }
    
    if (userProfile.zodiacSign) {
      context += `Zodiac sign: ${userProfile.zodiacSign}\n`
    }
    
    if (userProfile.previousReadings && userProfile.previousReadings.length > 0) {
      const recentReading = userProfile.previousReadings[0]
      context += `Recent reading: ${recentReading.date} - Asked about similar themes\n`
    }
    
    return context || 'New user seeking guidance'
  }

  private getFallbackReading(cards: TarotCard[], question: string, userProfile: UserProfile): string {
    const userName = userProfile.name || 'beautiful soul'
    const cardNames = cards.map(card => card.name).join(', ')
    
    return `
Hello ${userName}, 

I sense the cosmic energies have drawn the ${cardNames} to answer your question about "${question}". 

${cards[0].name} speaks to your current situation, suggesting ${cards[0].upright.meaning.toLowerCase()}. This card whispers of ${cards[0].upright.keywords.slice(0, 2).join(' and ')}.

The universe is guiding you toward growth and understanding. Trust in your inner wisdom, for the answers you seek already live within your heart.

Remember, dear heart, you have the power to shape your destiny. These cards are simply mirrors reflecting your own infinite potential.

With love and light,
Luna 🌙✨
`
  }

  async generatePersonalizedGreeting(userProfile: UserProfile): Promise<string> {
    const name = userProfile.name || 'beautiful soul'
    const hasHistory = userProfile.previousReadings && userProfile.previousReadings.length > 0
    
    const greetings = [
      `Welcome back, ${name}. The stars have been whispering about you...`,
      `Hello, dear ${name}. I feel the universe has guided you here today for a reason.`,
      `Blessed be, ${name}. Your energy feels different today - ready for new insights?`,
      `Greetings, ${name}. The cosmic currents are particularly strong right now.`
    ]

    const newUserGreetings = [
      `Welcome, beautiful soul. I'm Luna, and I'm honored to be your guide through the mystical realm of tarot.`,
      `Hello, dear heart. The universe has brought you to me for spiritual guidance and wisdom.`,
      `Blessed be, seeker. I sense you're ready to unlock the mysteries that the cards hold for you.`
    ]

    const greeting = hasHistory 
      ? greetings[Math.floor(Math.random() * greetings.length)]
      : newUserGreetings[Math.floor(Math.random() * newUserGreetings.length)]

    return greeting
  }

  async generateDailyInsight(userProfile: UserProfile): Promise<string> {
    const insights = [
      "Today, the moon's energy encourages you to trust your intuition above all else.",
      "The cosmic winds carry messages of new beginnings. Stay open to unexpected opportunities.",
      "Your spiritual guides are particularly close today. Listen for their gentle whispers.",
      "The universe is aligning to support your highest good. Have faith in the journey.",
      "Today calls for patience and inner reflection. Great wisdom comes to those who wait."
    ]

    return insights[Math.floor(Math.random() * insights.length)]
  }
}

// Helper functions for user profile management
export const calculateZodiacSign = (birthDate: string): string => {
  const date = new Date(birthDate)
  const month = date.getMonth() + 1
  const day = date.getDate()

  const zodiacSigns = [
    { name: 'Capricorn', start: [12, 22], end: [1, 19] },
    { name: 'Aquarius', start: [1, 20], end: [2, 18] },
    { name: 'Pisces', start: [2, 19], end: [3, 20] },
    { name: 'Aries', start: [3, 21], end: [4, 19] },
    { name: 'Taurus', start: [4, 20], end: [5, 20] },
    { name: 'Gemini', start: [5, 21], end: [6, 20] },
    { name: 'Cancer', start: [6, 21], end: [7, 22] },
    { name: 'Leo', start: [7, 23], end: [8, 22] },
    { name: 'Virgo', start: [8, 23], end: [9, 22] },
    { name: 'Libra', start: [9, 23], end: [10, 22] },
    { name: 'Scorpio', start: [10, 23], end: [11, 21] },
    { name: 'Sagittarius', start: [11, 22], end: [12, 21] },
  ]

  for (const sign of zodiacSigns) {
    if (sign.name === 'Capricorn') {
      if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
        return sign.name
      }
    } else {
      const [startMonth, startDay] = sign.start
      const [endMonth, endDay] = sign.end
      if ((month === startMonth && day >= startDay) || (month === endMonth && day <= endDay)) {
        return sign.name
      }
    }
  }
  
  return 'Capricorn' // Default fallback
}