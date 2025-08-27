'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shuffle, Sparkles, Moon } from 'lucide-react'

interface ShuffleAnimationProps {
  isShuffling: boolean
  onShuffleComplete: () => void
  cardCount: number
  className?: string
}

export function ShuffleAnimation({ 
  isShuffling, 
  onShuffleComplete, 
  cardCount,
  className = '' 
}: ShuffleAnimationProps) {
  const [shuffleStage, setShuffleStage] = useState<'idle' | 'gathering' | 'shuffling' | 'spreading' | 'complete'>('idle')
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([])

  useEffect(() => {
    if (isShuffling) {
      performShuffleSequence()
    }
  }, [isShuffling])

  const performShuffleSequence = async () => {
    // Stage 1: Gather cards
    setShuffleStage('gathering')
    await sleep(1000)
    
    // Stage 2: Shuffle animation
    setShuffleStage('shuffling')
    generateParticles()
    await sleep(2500)
    
    // Stage 3: Spread cards
    setShuffleStage('spreading')
    await sleep(800)
    
    // Stage 4: Complete
    setShuffleStage('complete')
    onShuffleComplete()
  }

  const generateParticles = () => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 400,
      y: Math.random() * 300
    }))
    setParticles(newParticles)
  }

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  if (!isShuffling) return null

  return (
    <div className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center ${className}`}>
      <div className="relative w-96 h-96">
        {/* Background mystical circle */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-mystical-light/30"
          animate={{
            rotate: shuffleStage === 'shuffling' ? 360 : 0,
            scale: shuffleStage === 'shuffling' ? [1, 1.1, 1] : 1
          }}
          transition={{
            rotate: { duration: 4, ease: "linear", repeat: shuffleStage === 'shuffling' ? Infinity : 0 },
            scale: { duration: 2, repeat: shuffleStage === 'shuffling' ? Infinity : 0 }
          }}
        />

        {/* Mystical symbols */}
        <div className="absolute inset-0">
          {[0, 90, 180, 270].map((rotation, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2"
              style={{
                transform: `translate(-50%, -50%) rotate(${rotation}deg) translateY(-140px)`,
              }}
              animate={{
                rotate: shuffleStage === 'shuffling' ? [rotation, rotation + 360] : rotation,
                opacity: shuffleStage === 'shuffling' ? [0.3, 1, 0.3] : 0.5
              }}
              transition={{
                rotate: { duration: 6, ease: "linear", repeat: shuffleStage === 'shuffling' ? Infinity : 0 },
                opacity: { duration: 2, repeat: shuffleStage === 'shuffling' ? Infinity : 0 }
              }}
            >
              <Moon className="w-6 h-6 text-mystical-gold" />
            </motion.div>
          ))}
        </div>

        {/* Card stack */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <AnimatePresence mode="wait">
            {shuffleStage === 'gathering' && (
              <motion.div
                key="gathering"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="relative"
              >
                {/* Multiple cards converging */}
                {Array.from({ length: 5 }, (_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-32 h-48 bg-gradient-to-br from-mystical-deep to-mystical-purple rounded-lg border border-mystical-light/50"
                    initial={{
                      x: (i - 2) * 100,
                      y: (i - 2) * 60,
                      rotate: (i - 2) * 30,
                      opacity: 0.7
                    }}
                    animate={{
                      x: 0,
                      y: i * -2,
                      rotate: i * 2,
                      opacity: 1
                    }}
                    transition={{
                      duration: 0.8,
                      delay: i * 0.1,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </motion.div>
            )}

            {shuffleStage === 'shuffling' && (
              <motion.div
                key="shuffling"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative"
              >
                {/* Main shuffling animation */}
                <motion.div
                  className="w-32 h-48 bg-gradient-to-br from-mystical-deep to-mystical-purple rounded-lg border border-mystical-light/50 relative overflow-hidden"
                  animate={{
                    rotateY: [0, 180, 360, 540, 720],
                    scale: [1, 1.1, 1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2.5,
                    times: [0, 0.25, 0.5, 0.75, 1],
                    ease: "easeInOut"
                  }}
                >
                  {/* Shuffling effect overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-mystical-light/20 to-mystical-gold/20"
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0.8, 1.2, 0.8]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* Mystical symbols */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Shuffle className="w-8 h-8 text-mystical-gold" />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Flying cards effect */}
                {Array.from({ length: 3 }, (_, i) => (
                  <motion.div
                    key={`flying-${i}`}
                    className="absolute w-24 h-36 bg-gradient-to-br from-mystical-light/50 to-mystical-gold/50 rounded-lg"
                    style={{
                      left: `${-50 + i * 50}px`,
                      top: `${-30 + i * 20}px`,
                    }}
                    animate={{
                      x: [0, 100, -100, 0],
                      y: [0, -50, 50, 0],
                      rotate: [0, 180, -180, 0],
                      opacity: [0.8, 0.3, 0.8]
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </motion.div>
            )}

            {shuffleStage === 'spreading' && (
              <motion.div
                key="spreading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative"
              >
                {/* Cards spreading out */}
                {Array.from({ length: cardCount }, (_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-28 h-42 bg-gradient-to-br from-mystical-deep to-mystical-purple rounded-lg border border-mystical-light/50"
                    initial={{
                      x: 0,
                      y: 0,
                      rotate: 0,
                      scale: 1
                    }}
                    animate={{
                      x: (i - Math.floor(cardCount / 2)) * 60,
                      y: Math.abs(i - Math.floor(cardCount / 2)) * 10,
                      rotate: (i - Math.floor(cardCount / 2)) * 15,
                      scale: 0.9
                    }}
                    transition={{
                      duration: 0.8,
                      delay: i * 0.1,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mystical particles */}
        <AnimatePresence>
          {shuffleStage === 'shuffling' && particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-2 h-2 bg-mystical-gold rounded-full"
              style={{
                left: particle.x,
                top: particle.y,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                y: [particle.y, particle.y - 100],
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                duration: 2,
                delay: Math.random() * 1,
                ease: "easeOut"
              }}
            />
          ))}
        </AnimatePresence>

        {/* Status text */}
        <motion.div
          className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 text-center"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex items-center justify-center gap-2 text-mystical-light font-mystical text-lg">
            <Sparkles className="w-5 h-5" />
            {shuffleStage === 'gathering' && 'Gathering cosmic energies...'}
            {shuffleStage === 'shuffling' && 'The cards are dancing with destiny...'}
            {shuffleStage === 'spreading' && 'Your path is being revealed...'}
            <Sparkles className="w-5 h-5" />
          </div>
        </motion.div>
      </div>
    </div>
  )
}