'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TarotCard } from '@/data/tarot-cards'
import { Sparkles, Star } from 'lucide-react'

interface TarotCardComponentProps {
  card: TarotCard
  isRevealed: boolean
  isReversed?: boolean
  onReveal?: () => void
  position: number
  totalCards: number
  className?: string
}

export function TarotCardComponent({
  card,
  isRevealed,
  isReversed = false,
  onReveal,
  position,
  totalCards,
  className = ''
}: TarotCardComponentProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [showGlow, setShowGlow] = useState(false)

  // Create mystical glow effect
  useEffect(() => {
    if (isRevealed) {
      const timer = setTimeout(() => setShowGlow(true), 300)
      return () => clearTimeout(timer)
    }
  }, [isRevealed])

  // Calculate card positioning for fan layout
  const getCardTransform = () => {
    if (totalCards === 1) return { rotate: 0, x: 0, y: 0 }
    
    const centerIndex = (totalCards - 1) / 2
    const offset = position - centerIndex
    const rotation = offset * 15 // 15 degrees per card
    const xOffset = offset * 60 // Spread cards horizontally
    const yOffset = Math.abs(offset) * 20 // Slight arc effect
    
    return {
      rotate: rotation,
      x: xOffset,
      y: yOffset
    }
  }

  const transform = getCardTransform()

  const cardVariants = {
    hidden: {
      rotateY: 0,
      scale: 0.8,
      opacity: 0,
      ...transform
    },
    visible: {
      rotateY: 0,
      scale: 1,
      opacity: 1,
      ...transform,
      transition: {
        duration: 0.8,
        delay: position * 0.2,
        ease: "easeOut"
      }
    },
    revealed: {
      rotateY: isReversed ? 180 : 0,
      scale: 1.05,
      ...transform,
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    },
    hover: {
      scale: 1.1,
      y: transform.y - 20,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  const glowVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: [0, 1, 0.7],
      scale: [0.8, 1.2, 1],
      transition: {
        duration: 2,
        times: [0, 0.5, 1],
        ease: "easeOut"
      }
    }
  }

  return (
    <div className={`relative ${className}`} style={{ perspective: '1000px' }}>
      {/* Mystical glow effect */}
      <AnimatePresence>
        {showGlow && isRevealed && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            variants={glowVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-mystical-light/20 to-mystical-gold/20 blur-xl" />
            <div className="absolute -inset-4">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-mystical-gold rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.3,
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main card */}
      <motion.div
        className="relative w-48 h-72 cursor-pointer"
        variants={cardVariants}
        initial="hidden"
        animate={isRevealed ? "revealed" : "visible"}
        whileHover={!isRevealed ? "hover" : {}}
        onClick={!isRevealed ? onReveal : undefined}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Card back */}
        <div
          className={`absolute inset-0 w-full h-full backface-hidden rounded-xl border-2 ${
            isRevealed ? 'opacity-0' : 'opacity-100'
          }`}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(0deg)'
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-mystical-deep to-mystical-purple rounded-xl p-1">
            <div className="w-full h-full bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-lg border border-mystical-light/30 relative overflow-hidden">
              {/* Mystical pattern background */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-4 border border-mystical-gold/50 rounded-lg" />
                <div className="absolute inset-8 border border-mystical-light/30 rounded-lg" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Star className="w-16 h-16 text-mystical-gold" />
                </div>
              </div>
              
              {/* Floating particles */}
              {isHovered && (
                <div className="absolute inset-0">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-mystical-light rounded-full"
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 60}%`,
                      }}
                      animate={{
                        y: [-10, -30],
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0]
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.2,
                        repeat: Infinity
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Card front */}
        <div
          className={`absolute inset-0 w-full h-full backface-hidden rounded-xl ${
            isRevealed ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-1 relative">
            {/* Card content */}
            <div className="w-full h-full bg-white rounded-lg border border-mystical-gold/50 relative overflow-hidden">
              {/* Card header */}
              <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-mystical-purple to-mystical-light p-3">
                <h3 className="text-white font-mystical text-lg font-bold text-center">
                  {card.name}
                </h3>
              </div>

              {/* Card image placeholder */}
              <div className="absolute top-16 left-4 right-4 bottom-20 bg-gradient-to-br from-mystical-light/10 to-mystical-gold/10 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Sparkles className="w-12 h-12 text-mystical-purple mx-auto mb-2" />
                  <div className="text-xs text-mystical-deep font-semibold">
                    {card.arcana} Arcana
                  </div>
                  {card.suit && (
                    <div className="text-xs text-mystical-purple mt-1">
                      {card.suit} {card.number && `• ${card.number}`}
                    </div>
                  )}
                </div>
              </div>

              {/* Card keywords */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-mystical-deep/90 to-transparent p-3">
                <div className="text-xs text-white text-center">
                  {card.upright.keywords.slice(0, 3).join(' • ')}
                </div>
              </div>

              {/* Reversed indicator */}
              {isReversed && (
                <div className="absolute top-20 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold transform rotate-12">
                  REVERSED
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Click hint for unrevealed cards */}
      {!isRevealed && isHovered && (
        <motion.div
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <div className="bg-mystical-purple text-white px-3 py-1 rounded-full text-xs font-medium">
            Click to reveal
          </div>
        </motion.div>
      )}
    </div>
  )
}