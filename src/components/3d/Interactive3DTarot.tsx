'use client'

import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import TarotCard3D from '@/components/3d/TarotCard3D'
import ShuffleAnimation3D from '@/components/3d/ShuffleAnimation3D'
import MysticalEnvironment3D from '@/components/3d/MysticalEnvironment3D'
import { TarotCard } from '@/data/tarot-cards'

interface Interactive3DTarotProps {
  cards: TarotCard[]
  selectedCards?: TarotCard[]
  onCardSelect?: (card: TarotCard) => void
  mode: '3d-deck' | '3d-spread' | '3d-single'
  enableShuffle?: boolean
  enableAIImages?: boolean
  className?: string
}

export default function Interactive3DTarot({
  cards,
  selectedCards = [],
  onCardSelect,
  mode,
  enableShuffle = true,
  enableAIImages = false,
  className = ''
}: Interactive3DTarotProps) {
  const [isShuffling, setIsShuffling] = useState(false)
  const [revealedCards, setRevealedCards] = useState<Set<string>>(new Set())

  const handleShuffle = () => {
    if (enableShuffle) {
      setIsShuffling(true)
      setRevealedCards(new Set())
    }
  }

  const handleShuffleComplete = () => {
    setIsShuffling(false)
  }

  const handleCardClick = (card: TarotCard) => {
    if (!isShuffling) {
      setRevealedCards(prev => new Set(Array.from(prev).concat(card.name)))
      onCardSelect?.(card)
    }
  }

  const renderCards = () => {
    const cardsToRender = selectedCards.length > 0 ? selectedCards : cards.slice(0, 3)

    switch (mode) {
      case '3d-single':
        return cardsToRender.slice(0, 1).map((card, index) => (
          <TarotCard3D
            key={card.name}
            card={card}
            isRevealed={revealedCards.has(card.name)}
            onClick={() => handleCardClick(card)}
            position={[0, 0, 0]}
            enableAIImages={enableAIImages}
          />
        ))

      case '3d-spread':
        return cardsToRender.map((card, index) => {
          const angle = (index - 1) * 0.8 // 弧形展开
          const radius = 2
          const x = Math.sin(angle) * radius
          const z = Math.cos(angle) * radius - 2
          
          return (
            <TarotCard3D
              key={card.name}
              card={card}
              isRevealed={revealedCards.has(card.name)}
              onClick={() => handleCardClick(card)}
              position={[x, 0, z]}
              rotation={[0, -angle, 0]}
              enableAIImages={enableAIImages}
            />
          )
        })

      case '3d-deck':
      default:
        return cardsToRender.map((card, index) => (
          <TarotCard3D
            key={card.name}
            card={card}
            isRevealed={revealedCards.has(card.name)}
            onClick={() => handleCardClick(card)}
            position={[0, index * 0.02, 0]}
            enableAIImages={enableAIImages}
          />
        ))
    }
  }

  return (
    <div className={`relative w-full h-96 ${className}`}>
      {/* 3D 塔罗牌场景 */}
      <MysticalEnvironment3D>
        {renderCards()}
      </MysticalEnvironment3D>

      {/* 洗牌动画 */}
      {isShuffling && (
        <ShuffleAnimation3D
          isShuffling={isShuffling}
          onShuffleComplete={handleShuffleComplete}
          cardCount={selectedCards.length > 0 ? selectedCards.length : 3}
        />
      )}

      {/* 控制面板 */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="flex gap-3 px-4 py-2 bg-mystical-purple/20 rounded-full border border-mystical-light/30 backdrop-blur-sm">
          {enableShuffle && (
            <button
              onClick={handleShuffle}
              disabled={isShuffling}
              className="px-4 py-2 bg-mystical-gold/20 hover:bg-mystical-gold/30 text-mystical-light rounded-full border border-mystical-gold/50 transition-all duration-300 disabled:opacity-50"
            >
              {isShuffling ? '洗牌中...' : '🔀 洗牌'}
            </button>
          )}
          
          <button
            onClick={() => setRevealedCards(new Set())}
            className="px-4 py-2 bg-mystical-purple/20 hover:bg-mystical-purple/30 text-mystical-light rounded-full border border-mystical-purple/50 transition-all duration-300"
          >
            🔄 重新开始
          </button>
          
          {enableAIImages && (
            <div className="px-3 py-2 bg-gradient-to-r from-mystical-gold/20 to-mystical-purple/20 text-mystical-light rounded-full border border-mystical-light/30 text-sm">
              ✨ AI增强
            </div>
          )}
        </div>
      </div>

      {/* 模式指示器 */}
      <div className="absolute top-4 right-4">
        <div className="px-3 py-1 bg-mystical-deep/30 text-mystical-light rounded-full border border-mystical-light/20 text-xs backdrop-blur-sm">
          {mode === '3d-single' && '单卡模式'}
          {mode === '3d-spread' && '展开模式'}
          {mode === '3d-deck' && '卡组模式'}
        </div>
      </div>
    </div>
  )
}