#!/bin/bash

# Quick Start Script for Mystical Tarot
echo "🌙✨ Welcome to Mystical Tarot Quick Start ✨🌙"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "   Visit: https://nodejs.org"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm found: $(npm --version)"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo ""
    echo "⚙️  Setting up environment variables..."
    cp .env.example .env.local
    echo "✅ Created .env.local from template"
    echo ""
    echo "🔑 IMPORTANT: You need to add your OpenAI API key to .env.local"
    echo "   1. Get your API key from: https://platform.openai.com/api-keys"
    echo "   2. Open .env.local in your editor"
    echo "   3. Replace 'sk-your-openai-api-key-here' with your actual key"
    echo ""
    read -p "Press Enter once you've added your OpenAI API key..."
fi

# Build the project
echo ""
echo "🔨 Building the project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed. Please check the error messages above."
    exit 1
fi

# Start the development server
echo ""
echo "🚀 Starting development server..."
echo "🔮 Your mystical tarot app will be available at: http://localhost:3000"
echo ""
echo "Features to test:"
echo "• 🏠 Home page with Luna's greeting"
echo "• 🔮 Tarot readings with 2.5D card animations" 
echo "• 💫 Beautiful shuffling and reveal effects"
echo "• 💳 Pricing page with subscription plans"
echo "• 🌙 Luna's personalized AI interpretations"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm run dev