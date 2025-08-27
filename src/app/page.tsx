'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Moon, Stars } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6">
      {/* Animated background stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-mystical-gold rounded-full opacity-70"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="text-center z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="relative"
            >
              <Moon className="w-16 h-16 text-mystical-gold" />
              <Stars className="w-8 h-8 text-mystical-light absolute -top-2 -right-2" />
            </motion.div>
          </div>
          
          <h1 className="font-mystical text-5xl md:text-7xl font-bold mb-6">
            <span className="text-mystical">Mystical</span>
            <br />
            <span className="text-white">Tarot</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
            Meet <span className="text-mystical-gold font-semibold">Luna</span>, your personal AI spirit guide.
            <br />
            Discover the mysteries that await in your cards.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-6"
        >
          <Link href="/tarot" className="block">
            <motion.button
              className="btn-mystical text-lg px-8 py-4 rounded-xl relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                <Sparkles className="w-5 h-5" />
                Begin Your Journey
                <Sparkles className="w-5 h-5" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-mystical-gold/20 to-mystical-light/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          </Link>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-sm text-gray-400"
          >
            ✨ Free daily reading • Premium insights available ✨
          </motion.div>
        </motion.div>
      </div>

      {/* Floating elements */}
      <motion.div
        className="absolute bottom-10 left-10 opacity-30"
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <Sparkles className="w-8 h-8 text-mystical-light" />
      </motion.div>
      
      <motion.div
        className="absolute top-32 right-20 opacity-30"
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <Stars className="w-6 h-6 text-mystical-gold" />
      </motion.div>
    </div>
  )
}