# 🌙 Mystical Tarot - AI-Powered Tarot Reading Platform

A modern, mystical tarot reading web application powered by AI, featuring Luna - your personal spiritual guide.

![Mystical Tarot](https://your-domain.com/og-image.png)

## ✨ Features

- **AI Spirit Guide**: Chat with Luna, your personalized AI tarot reader
- **Stunning 2.5D Cards**: Beautiful card animations and interactions
- **Multiple Spreads**: Single card, 3-card, love, and career readings
- **Personalized Insights**: AI-powered interpretations based on your profile
- **Subscription Plans**: Free daily readings + premium unlimited access
- **Mobile Responsive**: Perfect experience on all devices
- **Real-time Magic**: Dynamic animations and mystical effects

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- OpenAI API key
- (Optional) Supabase account for database
- (Optional) Stripe account for payments

### 1. Clone and Install

```bash
git clone https://github.com/yourusername/mystical-tarot.git
cd mystical-tarot
npm install
```

### 2. Environment Setup

Copy the environment template:

```bash
cp .env.example .env.local
```

Fill in your environment variables:

```env
# Required - OpenAI API Key
OPENAI_API_KEY=sk-your-openai-api-key-here

# Optional - For authentication (can skip for MVP)
NEXTAUTH_SECRET=your-random-secret-string
NEXTAUTH_URL=http://localhost:3000

# Optional - Google OAuth (can skip for MVP)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Optional - Database (can skip for MVP, uses localStorage)
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key

# Optional - Stripe (can skip for MVP, uses mock payments)
STRIPE_PUBLISHABLE_KEY=pk_test_your-publishable-key
STRIPE_SECRET_KEY=sk_test_your-secret-key
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your mystical tarot app!

## 🌐 Deploy to Vercel (Recommended)

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/mystical-tarot)

### Manual Deployment

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel --prod
   ```

3. **Set Environment Variables** in Vercel Dashboard:
   - Go to your project settings
   - Add all environment variables from `.env.local`
   - Redeploy if needed

### Domain Setup

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain (e.g., `mysticaltarot.com`)
3. Configure DNS according to Vercel's instructions

## 🔧 Configuration Guide

### Required Setup (Minimum Viable Product)

**Only OpenAI API Key is required for basic functionality**

1. **Get OpenAI API Key**:
   - Go to [OpenAI API](https://platform.openai.com/api-keys)
   - Create a new API key
   - Add to `OPENAI_API_KEY` in your environment

### Optional Integrations

<details>
<summary><strong>Google OAuth Setup</strong></summary>

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Go to Credentials → Create OAuth 2.0 Client ID
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://yourdomain.com/api/auth/callback/google`
6. Copy Client ID and Secret to environment variables
</details>

<details>
<summary><strong>Supabase Database Setup</strong></summary>

1. Create account at [Supabase](https://supabase.com)
2. Create a new project
3. Get URL and Anon Key from Settings → API
4. The app will automatically create tables as needed
</details>

<details>
<summary><strong>Stripe Payments Setup</strong></summary>

1. Create account at [Stripe](https://stripe.com)
2. Get API keys from Dashboard → Developers → API keys
3. Create products and prices in Stripe Dashboard
4. Update price IDs in the code if needed
</details>

## 📁 Project Structure

```
mystical-tarot/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── api/            # API routes
│   │   ├── tarot/          # Tarot reading page
│   │   └── pricing/        # Pricing page
│   ├── components/         # React components
│   │   ├── ui/            # UI components
│   │   ├── layout/        # Layout components
│   │   └── providers/     # Context providers
│   ├── data/              # Static data and types
│   ├── services/          # Business logic
│   └── types/             # TypeScript definitions
├── public/                # Static assets
└── ...config files
```

## 🎨 Customization

### Styling

The app uses Tailwind CSS with custom mystical theme colors:

```css
/* Define in tailwind.config.js */
mystical: {
  purple: '#6B46C1',
  deep: '#4C1D95', 
  light: '#8B5CF6',
  gold: '#F59E0B'
}
```

### Luna's Personality

Modify Luna's personality in `src/services/luna-ai.ts`:

```typescript
const LUNA_PERSONALITY = `
Your custom personality traits...
`
```

### Card Data

Add or modify tarot cards in `src/data/tarot-database.ts`

## 🔮 API Reference

### `/api/luna` (GET)
Get Luna's greeting and daily insights

### `/api/luna` (POST)
Generate tarot reading
```json
{
  "question": "What should I know about love?",
  "spreadType": "threeCard",
  "userProfile": { "name": "User" }
}
```

## 🐛 Troubleshooting

### Common Issues

1. **OpenAI API Errors**
   - Check your API key is valid
   - Ensure you have credits in your OpenAI account
   - Verify API key has proper permissions

2. **Build Errors**
   - Run `npm run build` locally first
   - Check for TypeScript errors
   - Ensure all environment variables are set

3. **Styling Issues**
   - Clear browser cache
   - Check Tailwind CSS is properly configured
   - Verify custom fonts are loading

### Environment-Specific Issues

**Development**:
- Use `npm run dev` for hot reloading
- Check console for errors

**Production**:
- Use `npm run build && npm run start` to test locally
- Check Vercel deployment logs

## 📊 Analytics & Monitoring

### Recommended Tools

- **Vercel Analytics**: Built-in web analytics
- **Sentry**: Error monitoring
- **PostHog**: User behavior analytics
- **Stripe Analytics**: Payment insights

### Performance Tips

- Images are optimized with Next.js Image component
- API routes are serverless functions
- Static assets are cached via CDN
- Critical CSS is inlined

## 💡 Marketing Tips

### SEO Optimization
- Update metadata in `src/app/layout.tsx`
- Add structured data for tarot readings
- Create blog content about tarot and spirituality

### Social Media
- Share mystical reading results on Instagram/TikTok
- Create "Card of the Day" content
- Use mystical hashtags: #TarotReading #AITarot #SpiritualGuidance

### Content Ideas
- Daily tarot insights blog
- Luna's wisdom articles
- User testimonials and success stories
- How-to guides for tarot beginners

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for GPT-4 API
- Framer Motion for beautiful animations
- Lucide for mystical icons
- Vercel for seamless deployment
- The mystical community for inspiration

---

**✨ May Luna guide your coding journey! ✨**

For support, email: support@yourdomain.com