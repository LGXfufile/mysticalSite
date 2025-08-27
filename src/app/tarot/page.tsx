'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/components/providers/AuthProvider'
import { TarotCardComponent } from '@/components/ui/TarotCard'
import { ShuffleAnimation } from '@/components/ui/ShuffleAnimation'
import { TarotCard } from '@/data/tarot-cards'
import { TarotReading, LunaResponse } from '@/types'
import { TAROT_SPREADS } from '@/data/tarot-database'
import { Moon, Sparkles, Heart, Briefcase, DollarSign, User, MessageCircle, Share2, Save } from 'lucide-react'
import { toast } from 'react-hot-toast'

type ReadingStage = 'welcome' | 'question' | 'shuffling' | 'revealing' | 'interpretation' | 'complete'

export default function TarotPage() {
  const { userProfile, canMakeReading, isSubscribed } = useAuth()
  const [stage, setStage] = useState<ReadingStage>('welcome')
  const [question, setQuestion] = useState('')
  const [selectedSpread, setSelectedSpread] = useState('threeCard')
  const [currentReading, setCurrentReading] = useState<TarotReading | null>(null)
  const [revealedCards, setRevealedCards] = useState<boolean[]>([])
  const [lunaGreeting, setLunaGreeting] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Initialize Luna greeting
  useEffect(() => {
    fetchLunaGreeting()
  }, [userProfile])

  const fetchLunaGreeting = async () => {
    try {
      const response = await fetch(`/api/luna?userProfile=${encodeURIComponent(JSON.stringify(userProfile || {}))}`)
      const data: LunaResponse = await response.json()
      
      if (data.success && data.greeting) {
        setLunaGreeting(data.greeting)
      }
    } catch (error) {
      console.error('Error fetching Luna greeting:', error)
      setLunaGreeting("Welcome, beautiful soul. I'm Luna, and the cards are eager to share their wisdom with you today.")
    }
  }

  const handleStartReading = () => {
    if (!canMakeReading && !isSubscribed) {
      toast.error("You've reached your daily reading limit. Please subscribe for unlimited readings.")
      return
    }
    setStage('question')
  }

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!question.trim()) {
      toast.error('Please ask a question for the cards to answer.')
      return
    }
    setStage('shuffling')
  }

  const handleShuffleComplete = () => {
    performReading()
  }

  const performReading = async () => {
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/luna', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          spreadType: selectedSpread,
          userProfile
        })
      })

      const data: LunaResponse = await response.json()

      if (!data.success || !data.reading) {
        throw new Error(data.error || 'Failed to generate reading')
      }

      setCurrentReading(data.reading)
      setRevealedCards(new Array(data.reading.cards.length).fill(false))
      setStage('revealing')
    } catch (error) {
      console.error('Error generating reading:', error)
      setError('Unable to connect with Luna. Please try again.')
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCardReveal = (index: number) => {
    const newRevealed = [...revealedCards]
    newRevealed[index] = true
    setRevealedCards(newRevealed)

    // Check if all cards are revealed
    if (newRevealed.every(revealed => revealed)) {
      setTimeout(() => setStage('interpretation'), 500)
    }
  }

  const handleNewReading = () => {
    setStage('welcome')
    setQuestion('')
    setCurrentReading(null)
    setRevealedCards([])
    setError('')
  }

  const renderWelcomeStage = () => (
    <div className="text-center max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center justify-center mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Moon className="w-20 h-20 text-mystical-gold" />
          </motion.div>
        </div>

        <h1 className="font-mystical text-5xl md:text-6xl font-bold mb-6 text-mystical">
          Luna's Mystical Guidance
        </h1>

        {lunaGreeting && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="card-mystical mb-8 p-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-mystical-light to-mystical-gold flex items-center justify-center flex-shrink-0">
                <Moon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-gray-300 leading-relaxed italic">
                  "{lunaGreeting}"
                </p>
                <p className="text-mystical-gold font-medium mt-2">— Luna</p>
              </div>
            </div>
          </motion.div>
        )}

        <motion.button
          onClick={handleStartReading}
          className="btn-mystical text-lg px-8 py-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <span className="flex items-center gap-3">
            <Sparkles className="w-5 h-5" />
            Begin Your Reading
            <Sparkles className="w-5 h-5" />
          </span>
        </motion.button>
      </motion.div>
    </div>
  )

  const renderQuestionStage = () => (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="font-mystical text-4xl font-bold text-center mb-8 text-mystical">
          What guidance do you seek?
        </h2>

        <form onSubmit={handleQuestionSubmit} className="space-y-6">
          {/* Question input */}
          <div className="card-mystical p-6">
            <label htmlFor="question" className="block text-mystical-light font-medium mb-3">
              Ask your question to the universe:
            </label>
            <textarea
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="What do I need to know about my love life? How can I advance in my career? What does the future hold for me?"
              className="w-full h-32 px-4 py-3 bg-slate-800/50 border border-mystical-light/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-mystical-light focus:ring-2 focus:ring-mystical-light/20 resize-none"
              maxLength={500}
            />
            <div className="text-right text-sm text-gray-400 mt-2">
              {question.length}/500
            </div>
          </div>

          {/* Reading type selection */}
          <div className="card-mystical p-6">
            <label className="block text-mystical-light font-medium mb-4">
              Choose your reading style:
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(TAROT_SPREADS).map(([key, spread]) => (
                <label key={key} className="cursor-pointer">
                  <input
                    type="radio"
                    name="spread"
                    value={key}
                    checked={selectedSpread === key}
                    onChange={(e) => setSelectedSpread(e.target.value)}
                    className="sr-only"
                  />
                  <div className={`p-4 rounded-lg border-2 transition-all ${
                    selectedSpread === key
                      ? 'border-mystical-light bg-mystical-light/10'
                      : 'border-mystical-light/30 hover:border-mystical-light/50'
                  }`}>
                    <h3 className="font-medium text-white mb-2">{spread.name}</h3>
                    <p className="text-sm text-gray-300">{spread.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setStage('welcome')}
              className="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
            >
              Back
            </button>
            <button
              type="submit"
              className="flex-1 btn-mystical"
            >
              Draw My Cards
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )

  const renderRevealingStage = () => {
    if (!currentReading) return null

    const spread = TAROT_SPREADS[selectedSpread as keyof typeof TAROT_SPREADS]
    
    return (
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-mystical text-4xl font-bold text-center mb-8 text-mystical">
            Your Cards Await
          </h2>

          <div className="text-center mb-12">
            <p className="text-mystical-light text-lg mb-4">
              <strong>Your Question:</strong> "{question}"
            </p>
            <p className="text-gray-300">
              Click each card to reveal your spiritual guidance...
            </p>
          </div>

          {/* Cards display */}
          <div className="flex justify-center items-end gap-8 mb-12 min-h-80">
            {currentReading.cards.map((card, index) => (
              <div key={index} className="text-center">
                <TarotCardComponent
                  card={card}
                  isRevealed={revealedCards[index]}
                  isReversed={currentReading.reversed[index]}
                  onReveal={() => handleCardReveal(index)}
                  position={index}
                  totalCards={currentReading.cards.length}
                />
                <div className="mt-4">
                  <h3 className="text-mystical-light font-medium text-sm">
                    {spread.positions[index]}
                  </h3>
                  {revealedCards[index] && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-gray-400 mt-1"
                    >
                      {card.name}
                    </motion.p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    )
  }

  const renderInterpretationStage = () => {
    if (!currentReading) return null

    return (
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-mystical text-4xl font-bold text-center mb-8 text-mystical">
            Luna's Interpretation
          </h2>

          {/* Reading interpretation */}
          <div className="card-mystical p-8 mb-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-mystical-light to-mystical-gold flex items-center justify-center flex-shrink-0">
                <Moon className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-mystical-gold font-mystical text-xl font-bold mb-2">
                  Luna's Wisdom
                </h3>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                    {currentReading.interpretation}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={handleNewReading}
              className="btn-mystical px-6 py-3"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              New Reading
            </button>
            <button
              onClick={() => toast.success('Reading saved to your journal!')}
              className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Reading
            </button>
            <button
              onClick={() => toast.success('Reading shared successfully!')}
              className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-mystical-gradient">
      <div className="container mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {stage === 'welcome' && (
            <motion.div key="welcome" exit={{ opacity: 0, y: -30 }}>
              {renderWelcomeStage()}
            </motion.div>
          )}
          
          {stage === 'question' && (
            <motion.div key="question" exit={{ opacity: 0, y: -30 }}>
              {renderQuestionStage()}
            </motion.div>
          )}
          
          {stage === 'revealing' && (
            <motion.div key="revealing" exit={{ opacity: 0, y: -30 }}>
              {renderRevealingStage()}
            </motion.div>
          )}
          
          {stage === 'interpretation' && (
            <motion.div key="interpretation" exit={{ opacity: 0, y: -30 }}>
              {renderInterpretationStage()}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Shuffle animation overlay */}
        <ShuffleAnimation
          isShuffling={stage === 'shuffling'}
          onShuffleComplete={handleShuffleComplete}
          cardCount={TAROT_SPREADS[selectedSpread as keyof typeof TAROT_SPREADS]?.positions.length || 3}
        />

        {/* Error message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-96"
          >
            <div className="bg-red-600 text-white p-4 rounded-lg shadow-lg">
              <p>{error}</p>
              <button
                onClick={() => setError('')}
                className="mt-2 text-sm underline"
              >
                Dismiss
              </button>
            </div>
          </motion.div>
        )}

        {/* Loading overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center">
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-mystical-light border-t-transparent rounded-full mx-auto mb-4"
              />
              <p className="text-mystical-light font-medium">
                Consulting the cosmic energies...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}