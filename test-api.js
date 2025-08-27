#!/usr/bin/env node

// Test DeepSeek API Connection
const API_KEY = 'sk-635f407d1b1e4f12a4aa87bd44cda3c5'
const API_BASE = 'https://api.deepseek.com/v1'

async function testDeepSeekAPI() {
  console.log('🧪 Testing DeepSeek API connection...')
  
  try {
    const response = await fetch(`${API_BASE}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: 'You are Luna, a mystical AI tarot reader. Respond in a warm, spiritual way.'
          },
          {
            role: 'user',
            content: 'Hello Luna, can you give me a brief greeting?'
          }
        ],
        max_tokens: 100,
        temperature: 0.8
      })
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    console.log('✅ DeepSeek API working!')
    console.log('🌙 Luna says:', data.choices[0].message.content)
    console.log('')
    console.log('🎉 Your mystical tarot app is ready to launch!')
    
  } catch (error) {
    console.log('❌ API Test Failed:', error.message)
    console.log('')
    console.log('💡 Troubleshooting:')
    console.log('1. Check your API key is correct')
    console.log('2. Ensure you have credits in your DeepSeek account')
    console.log('3. Verify your internet connection')
  }
}

testDeepSeekAPI()