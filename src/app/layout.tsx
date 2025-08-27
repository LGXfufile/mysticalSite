import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/components/providers/AuthProvider'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mystical Tarot - Your AI Spirit Guide',
  description: 'Connect with Luna, your personal AI tarot reader, for mystical insights and spiritual guidance.',
  keywords: ['tarot', 'AI tarot', 'spiritual guidance', 'mystical', 'fortune telling'],
  authors: [{ name: 'Mystical Tarot' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen bg-mystical-gradient flex flex-col">
            <Navigation />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster position="bottom-center" />
        </AuthProvider>
      </body>
    </html>
  )
}