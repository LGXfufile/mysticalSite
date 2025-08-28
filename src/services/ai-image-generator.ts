// AI图像生成服务
// 支持多个AI图像生成平台的统一接口

export interface AIImageConfig {
  provider: 'stability' | 'openai' | 'midjourney' | 'deepseek' | 'replicate'
  apiKey: string
  model?: string
  style?: string
  quality?: 'standard' | 'hd'
}

export interface TarotCardImagePrompt {
  cardName: string
  arcana: string
  meaning: string
  keywords: string[]
  element?: string
  zodiacSign?: string
}

export class AIImageGenerator {
  private config: AIImageConfig

  constructor(config: AIImageConfig) {
    this.config = config
  }

  // 生成塔罗牌专用的AI图像提示词
  private generateTarotPrompt(card: TarotCardImagePrompt): string {
    const baseStyle = "mystical tarot card art, ethereal, magical, detailed illustration, fantasy art style, rich colors, symbolic imagery"
    const cardStyle = "tarot card border, ornate frame, golden accents, mystical symbols"
    
    let prompt = `${card.cardName} tarot card, ${card.meaning}, `
    
    // 添加关键词
    if (card.keywords.length > 0) {
      prompt += `representing ${card.keywords.slice(0, 3).join(', ')}, `
    }
    
    // 添加元素特征
    if (card.element) {
      const elementStyles = {
        'Fire': 'fiery reds and oranges, flames, passion, energy',
        'Water': 'deep blues and teals, flowing water, emotions, intuition',
        'Earth': 'rich browns and greens, mountains, stability, nature',
        'Air': 'light yellows and whites, clouds, wind, intellect'
      }
      prompt += `${elementStyles[card.element as keyof typeof elementStyles]}, `
    }
    
    // 添加大阿卡那/小阿卡那特征
    if (card.arcana === 'Major') {
      prompt += "major arcana significance, profound spiritual symbolism, archetypal imagery, "
    } else {
      prompt += "minor arcana detail, everyday wisdom, practical guidance, "
    }
    
    prompt += `${baseStyle}, ${cardStyle}, high quality, 4k resolution, professional digital art`
    
    return prompt
  }

  // Stability AI (Stable Diffusion)
  private async generateWithStability(prompt: string): Promise<string> {
    const response = await fetch('https://api.stability.ai/v1/generation/stable-diffusion-v1-6/text-to-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        text_prompts: [
          {
            text: prompt,
            weight: 1
          },
          {
            text: "blurry, low quality, distorted, ugly, bad anatomy, nsfw",
            weight: -1
          }
        ],
        cfg_scale: 7,
        height: 896,
        width: 512,
        steps: 30,
        samples: 1,
        style_preset: "fantasy-art"
      })
    })

    if (!response.ok) {
      throw new Error(`Stability AI error: ${response.statusText}`)
    }

    const data = await response.json()
    return `data:image/png;base64,${data.artifacts[0].base64}`
  }

  // OpenAI DALL-E
  private async generateWithOpenAI(prompt: string): Promise<string> {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.config.apiKey}`
      },
      body: JSON.stringify({
        model: this.config.model || "dall-e-3",
        prompt: prompt.slice(0, 4000), // DALL-E 3 限制
        size: "1024x1792", // 接近塔罗牌比例
        quality: this.config.quality || "hd",
        style: "vivid",
        n: 1
      })
    })

    if (!response.ok) {
      throw new Error(`OpenAI error: ${response.statusText}`)
    }

    const data = await response.json()
    return data.data[0].url
  }

  // DeepSeek (如果支持图像生成)
  private async generateWithDeepSeek(prompt: string): Promise<string> {
    // DeepSeek目前主要是文本模型，这里是预留接口
    const response = await fetch(`${process.env.OPENAI_API_BASE}/v1/images/generations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.config.apiKey}`
      },
      body: JSON.stringify({
        model: "deepseek-image",
        prompt: prompt,
        size: "512x896",
        quality: "standard",
        n: 1
      })
    })

    if (!response.ok) {
      throw new Error(`DeepSeek error: ${response.statusText}`)
    }

    const data = await response.json()
    return data.data[0].url
  }

  // Replicate API
  private async generateWithReplicate(prompt: string): Promise<string> {
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${this.config.apiKey}`
      },
      body: JSON.stringify({
        version: "ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4", // SDXL
        input: {
          prompt: prompt,
          negative_prompt: "blurry, low quality, distorted, ugly, bad anatomy, nsfw",
          width: 512,
          height: 896,
          num_inference_steps: 30,
          guidance_scale: 7,
          scheduler: "DPMSolverMultistep"
        }
      })
    })

    if (!response.ok) {
      throw new Error(`Replicate error: ${response.statusText}`)
    }

    const prediction = await response.json()
    
    // 轮询直到图像生成完成
    return this.pollReplicateResult(prediction.id)
  }

  private async pollReplicateResult(id: string): Promise<string> {
    let attempts = 0
    const maxAttempts = 60 // 10分钟超时

    while (attempts < maxAttempts) {
      const response = await fetch(`https://api.replicate.com/v1/predictions/${id}`, {
        headers: {
          'Authorization': `Token ${this.config.apiKey}`
        }
      })

      if (!response.ok) {
        throw new Error(`Replicate polling error: ${response.statusText}`)
      }

      const prediction = await response.json()

      if (prediction.status === 'succeeded') {
        return prediction.output[0]
      } else if (prediction.status === 'failed') {
        throw new Error('Image generation failed')
      }

      // 等待10秒后重试
      await new Promise(resolve => setTimeout(resolve, 10000))
      attempts++
    }

    throw new Error('Image generation timeout')
  }

  // 主要的图像生成方法
  async generateTarotCardImage(card: TarotCardImagePrompt): Promise<string> {
    const prompt = this.generateTarotPrompt(card)
    
    console.log('🎨 Generating AI image for:', card.cardName)
    console.log('📝 Prompt:', prompt)

    try {
      switch (this.config.provider) {
        case 'stability':
          return await this.generateWithStability(prompt)
        case 'openai':
          return await this.generateWithOpenAI(prompt)
        case 'deepseek':
          return await this.generateWithDeepSeek(prompt)
        case 'replicate':
          return await this.generateWithReplicate(prompt)
        default:
          throw new Error(`Unsupported provider: ${this.config.provider}`)
      }
    } catch (error) {
      console.error('❌ AI image generation failed:', error)
      // 返回默认占位图像
      return this.getDefaultImage(card)
    }
  }

  // 获取默认占位图像
  private getDefaultImage(card: TarotCardImagePrompt): string {
    // 返回一个基于卡片名称的默认SVG图像
    const svgContent = `
      <svg width="512" height="896" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#2d1b4e;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#4a0e4e;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="512" height="896" fill="url(#bg)"/>
        <rect x="20" y="20" width="472" height="856" fill="none" stroke="#d4af37" stroke-width="3"/>
        <text x="256" y="150" font-family="serif" font-size="32" fill="#d4af37" text-anchor="middle">${card.cardName}</text>
        <text x="256" y="450" font-family="serif" font-size="120" fill="#d4af37" text-anchor="middle">✦</text>
        <text x="256" y="650" font-family="serif" font-size="18" fill="#ffffff" text-anchor="middle">${card.meaning.slice(0, 50)}...</text>
        <text x="256" y="750" font-family="serif" font-size="16" fill="#8a2be2" text-anchor="middle">${card.keywords.slice(0, 2).join(' • ')}</text>
      </svg>
    `
    
    return `data:image/svg+xml;base64,${btoa(svgContent)}`
  }

  // 批量生成图像（用于预生成所有塔罗牌）
  async generateAllTarotImages(cards: TarotCardImagePrompt[]): Promise<Map<string, string>> {
    const results = new Map<string, string>()
    
    // 分批处理，避免API速率限制
    const batchSize = 3
    for (let i = 0; i < cards.length; i += batchSize) {
      const batch = cards.slice(i, i + batchSize)
      
      const batchPromises = batch.map(async (card) => {
        try {
          const imageUrl = await this.generateTarotCardImage(card)
          results.set(card.cardName, imageUrl)
          
          // 添加延迟避免API限制
          await new Promise(resolve => setTimeout(resolve, 2000))
        } catch (error) {
          console.error(`Failed to generate image for ${card.cardName}:`, error)
          results.set(card.cardName, this.getDefaultImage(card))
        }
      })
      
      await Promise.all(batchPromises)
      
      // 批次间延迟
      if (i + batchSize < cards.length) {
        await new Promise(resolve => setTimeout(resolve, 5000))
      }
    }
    
    return results
  }
}