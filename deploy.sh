#!/bin/bash

# Mystical Tarot Deployment Script
echo "🌙 Deploying Mystical Tarot to Vercel..."

# Check if required environment variables exist
if [ -z "$OPENAI_API_KEY" ]; then
    echo "⚠️  Warning: OPENAI_API_KEY not set. The app won't work without it."
    echo "   Set it in Vercel dashboard or your .env.local file"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building the project..."
npm run build

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
npx vercel --prod

echo "✨ Deployment complete!"
echo "🔮 Your mystical tarot app is now live!"
echo ""
echo "Don't forget to:"
echo "1. Set your OPENAI_API_KEY in Vercel dashboard"
echo "2. Configure your custom domain"  
echo "3. Test the tarot readings work properly"
echo ""
echo "May Luna guide your users to spiritual enlightenment! 🌙✨"