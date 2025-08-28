import { useState, useCallback } from 'react'
import { TarotCard } from '@/data/tarot-cards'

interface AIImageOptions {
  provider?: 'openai' | 'stability' | 'replicate'
  quality?: 'standard' | 'hd'
}

interface AIImageResult {
  imageUrl: string | null
  loading: boolean
  error: string | null
  generateImage: (card: TarotCard, options?: AIImageOptions) => Promise<void>
}

export function useAIImage(): AIImageResult {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generateImage = useCallback(async (card: TarotCard, options: AIImageOptions = {}) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          card: {
            cardName: card.name,
            arcana: card.arcana,
            meaning: card.upright.meaning,
            keywords: card.upright.keywords || [],
            element: card.element,
            zodiacSign: card.astrology
          },
          provider: options.provider || 'openai',
          quality: options.quality || 'hd'
        })
      })
      
      const data = await response.json()
      
      if (data.success) {
        setImageUrl(data.imageUrl)
      } else {
        setError(data.error || 'Failed to generate image')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error')
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    imageUrl,
    loading,
    error,
    generateImage
  }
}