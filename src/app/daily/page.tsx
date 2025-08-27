'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/components/providers/AuthProvider'
import { Moon, Star, Sparkles, Calendar, Heart, Briefcase, Coins, Zap } from 'lucide-react'
import Link from 'next/link'

interface DailyInsight {
  id: string
  date: string
  title: string
  message: string
  cardOfDay: {
    name: string
    meaning: string
    keywords: string[]
  }
  focus: string
  luckyNumber: number
  element: string
}

export default function DailyPage() {
  const { userProfile } = useAuth()
  const [dailyInsight, setDailyInsight] = useState<DailyInsight | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    generateDailyInsight()
  }, [userProfile])

  const generateDailyInsight = async () => {
    setLoading(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Generate today's insight (mock data for now)
    const today = new Date()
    const insights: DailyInsight = {
      id: `daily_${today.getTime()}`,
      date: today.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      title: "Cosmic Energies Align for Growth",
      message: `${userProfile?.name ? `Dear ${userProfile.name}, t` : 'T'}he universe whispers of transformation today. The moon's gentle light illuminates new pathways, while the stars guide you toward your highest potential. Trust in your intuition, for it speaks the language of the cosmos. Today brings opportunities for spiritual growth and deeper understanding of your true purpose.`,
      cardOfDay: {
        name: "The Star",
        meaning: "Hope, inspiration, and spiritual guidance illuminate your path today.",
        keywords: ["hope", "inspiration", "healing", "guidance"]
      },
      focus: "Self-reflection and inner wisdom",
      luckyNumber: Math.floor(Math.random() * 9) + 1,
      element: ["Fire", "Water", "Earth", "Air"][Math.floor(Math.random() * 4)]
    }
    
    setDailyInsight(insights)
    setLoading(false)
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-mystical-light border-t-transparent rounded-full"
        />
        <div className="ml-4">
          <p className="text-mystical-light font-medium">
            Luna is consulting the cosmic energies...
          </p>
          <p className="text-gray-400 text-sm">
            Preparing your daily insights
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="relative"
            >
              <Moon className="w-16 h-16 text-mystical-gold" />
              <Star className="w-4 h-4 text-mystical-light absolute -top-1 -right-1" />
            </motion.div>
          </div>

          <h1 className="font-mystical text-5xl md:text-6xl font-bold mb-6 text-mystical">
            Daily Insights
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Luna's wisdom for your spiritual journey today
          </p>
        </motion.div>

        {dailyInsight && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Date */}
            <motion.div 
              variants={cardVariants}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-mystical-purple/20 rounded-full border border-mystical-light/30">
                <Calendar className="w-4 h-4 text-mystical-gold" />
                <span className="text-mystical-light font-medium">{dailyInsight.date}</span>
              </div>
            </motion.div>

            {/* Main Insight */}
            <motion.div 
              variants={cardVariants}
              className="card-mystical p-8 text-center"
            >
              <h2 className="font-mystical text-3xl font-bold text-mystical mb-6">
                {dailyInsight.title}
              </h2>
              <p className="text-gray-300 leading-relaxed text-lg mb-6">
                {dailyInsight.message}
              </p>
              <div className="flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-mystical-light to-mystical-gold flex items-center justify-center">
                  <Moon className="w-6 h-6 text-white" />
                </div>
                <span className="ml-3 text-mystical-gold font-medium">— Luna</span>
              </div>
            </motion.div>

            {/* Card of the Day */}
            <motion.div 
              variants={cardVariants}
              className="card-mystical p-6"
            >
              <h3 className="font-mystical text-2xl font-bold text-mystical mb-4 flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-mystical-gold" />
                Card of the Day
              </h3>
              <div className="bg-gradient-to-r from-mystical-purple/20 to-mystical-light/20 rounded-xl p-6 border border-mystical-light/30">
                <h4 className="text-xl font-bold text-white mb-2">{dailyInsight.cardOfDay.name}</h4>
                <p className="text-gray-300 mb-4">{dailyInsight.cardOfDay.meaning}</p>
                <div className="flex flex-wrap gap-2">
                  {dailyInsight.cardOfDay.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-mystical-gold/20 text-mystical-gold rounded-full text-sm"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Daily Guidance Grid */}
            <motion.div 
              variants={cardVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="card-mystical p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-medium text-white mb-2">Today's Focus</h3>
                <p className="text-mystical-light text-sm">{dailyInsight.focus}</p>
              </div>

              <div className="card-mystical p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-medium text-white mb-2">Lucky Number</h3>
                <p className="text-mystical-light text-xl font-bold">{dailyInsight.luckyNumber}</p>
              </div>

              <div className="card-mystical p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-medium text-white mb-2">Element</h3>
                <p className="text-mystical-light text-sm">{dailyInsight.element}</p>
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div 
              variants={cardVariants}
              className="text-center"
            >
              <p className="text-gray-300 mb-6">
                Ready for a deeper reading? Let Luna guide you with a personalized tarot spread.
              </p>
              <Link href="/tarot" className="btn-mystical inline-flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Get Your Reading
                <Sparkles className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}