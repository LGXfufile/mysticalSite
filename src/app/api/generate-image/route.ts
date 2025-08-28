import { NextRequest, NextResponse } from 'next/server'
import { AIImageGenerator, TarotCardImagePrompt, AIImageConfig } from '@/services/ai-image-generator'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { card, provider = 'openai' }: { card: TarotCardImagePrompt, provider?: string } = body

    if (!card || !card.cardName) {
      return NextResponse.json(
        { error: 'Missing required card information' },
        { status: 400 }
      )
    }

    // 配置AI图像生成器
    const config: AIImageConfig = {
      provider: provider as any,
      apiKey: getApiKey(provider),
      model: provider === 'openai' ? 'dall-e-3' : undefined,
      quality: 'hd'
    }

    if (!config.apiKey) {
      return NextResponse.json(
        { error: `No API key configured for provider: ${provider}` },
        { status: 500 }
      )
    }

    function getApiKey(provider: string): string {
      switch (provider) {
        case 'openai':
          return process.env.OPENAI_API_KEY || ''
        case 'stability':
          return process.env.STABILITY_API_KEY || ''
        case 'replicate':
          return process.env.REPLICATE_API_TOKEN || ''
        case 'deepseek':
          return process.env.OPENAI_API_KEY || '' // DeepSeek uses OpenAI format
        default:
          return process.env.OPENAI_API_KEY || ''
      }
    }

    const generator = new AIImageGenerator(config)
    const imageUrl = await generator.generateTarotCardImage(card)

    return NextResponse.json({
      success: true,
      imageUrl,
      card: card.cardName
    })

  } catch (error) {
    console.error('Image generation API error:', error)
    return NextResponse.json(
      { error: 'Failed to generate image', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}