'use client'

import React, { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, Box, useTexture } from '@react-three/drei'
import { Group, Mesh, Texture } from 'three'
import { TarotCard } from '@/data/tarot-cards'

interface TarotCard3DProps {
  card: TarotCard
  isRevealed?: boolean
  isFlipping?: boolean
  onClick?: () => void
  position?: [number, number, number]
  rotation?: [number, number, number]
  enableAIImages?: boolean
}

function Card3D({ 
  card, 
  isRevealed = false, 
  isFlipping = false, 
  onClick,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  enableAIImages = false
}: TarotCard3DProps) {
  const cardRef = useRef<Group>(null)
  const [hovered, setHovered] = useState(false)
  const [aiImage, setAIImage] = useState<string | null>(null)
  const [imageLoading, setImageLoading] = useState(false)
  
  // 生成AI图像
  useEffect(() => {
    if (enableAIImages && isRevealed && !aiImage && !imageLoading) {
      setImageLoading(true)
      
      const generateImage = async () => {
        try {
          const response = await fetch('/api/generate-image', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              card: {
                cardName: card.name,
                arcana: card.arcana,
                meaning: card.upright.meaning,
                keywords: card.upright.keywords || [],
                element: card.element,
                zodiacSign: card.astrology
              },
              provider: 'openai'
            })
          })
          
          const data = await response.json()
          if (data.success) {
            setAIImage(data.imageUrl)
          }
        } catch (error) {
          console.error('Failed to generate AI image:', error)
        } finally {
          setImageLoading(false)
        }
      }
      
      generateImage()
    }
  }, [enableAIImages, isRevealed, card, aiImage, imageLoading])
  
  // 加载AI生成的图像纹理
  let aiTexture = null
  try {
    if (aiImage) {
      aiTexture = useTexture(aiImage, (texture) => {
        if (texture) {
          texture.flipY = false
        }
      })
    }
  } catch (error) {
    console.warn('Failed to load AI texture:', error)
  }
  
  // 3D卡牌动画
  useFrame((state) => {
    if (cardRef.current) {
      // 悬浮效果
      if (hovered) {
        cardRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1 + 0.2
        cardRef.current.rotation.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.05
      } else {
        cardRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.05
      }
      
      // 翻转动画
      if (isFlipping) {
        cardRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 4) * Math.PI
      } else if (isRevealed) {
        cardRef.current.rotation.y = Math.PI
      }
    }
  })

  const cardWidth = 1.2
  const cardHeight = 2
  const cardDepth = 0.02

  return (
    <group 
      ref={cardRef} 
      position={position}
      rotation={rotation}
      onClick={onClick}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* 卡牌主体 */}
      <Box args={[cardWidth, cardHeight, cardDepth]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color={isRevealed ? "#f8f9fa" : "#2d1b4e"} 
          roughness={0.1}
          metalness={0.1}
        />
      </Box>
      
      {/* 卡牌正面 - 显示塔罗牌内容 */}
      <group position={[0, 0, cardDepth/2 + 0.001]} rotation={[0, Math.PI, 0]} visible={isRevealed}>
        {/* AI生成的图像背景 */}
        {aiImage && (
          <Box args={[cardWidth - 0.1, cardHeight - 0.3, 0.001]} position={[0, 0.1, -0.001]}>
            <meshStandardMaterial 
              map={aiTexture} 
              transparent
              opacity={0.8}
            />
          </Box>
        )}
        
        {/* 图像加载中指示 */}
        {imageLoading && (
          <Box args={[cardWidth - 0.1, cardHeight - 0.3, 0.001]} position={[0, 0.1, -0.001]}>
            <meshStandardMaterial color="#1a0b2e" transparent opacity={0.8} />
          </Box>
        )}
        {imageLoading && (
          <Text
            position={[0, 0.1, 0]}
            fontSize={0.1}
            color="#d4af37"
            anchorX="center"
            anchorY="middle"
          >
            生成中...
          </Text>
        )}
        
        {/* 卡牌名称 */}
        <Text
          position={[0, cardHeight/2 - 0.15, 0]}
          fontSize={0.12}
          color="#2d1b4e"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Cinzel-Bold.woff"
        >
          {card.name}
        </Text>
        
        {/* 卡牌数字/符号 - 在AI图像模式下调整位置 */}
        <Text
          position={[0, aiImage ? -0.5 : 0.3, 0]}
          fontSize={aiImage ? 0.4 : 0.8}
          color="#d4af37"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Cinzel-Bold.woff"
        >
          {card.number ? `${card.number}` : card.arcana}
        </Text>
        
        {/* 卡牌描述关键词 */}
        <Text
          position={[0, aiImage ? -0.7 : -0.3, 0]}
          fontSize={0.08}
          color={aiImage ? "#ffffff" : "#6c757d"}
          anchorX="center"
          anchorY="middle"
          maxWidth={cardWidth - 0.2}
        >
          {card.upright.keywords?.slice(0, 3).join(' • ') || card.upright.meaning.split('.')[0]}
        </Text>
        
        {/* 装饰边框 */}
        <Box args={[cardWidth - 0.05, 0.02, 0.001]} position={[0, cardHeight/2 - 0.05, 0]}>
          <meshStandardMaterial color="#d4af37" />
        </Box>
        <Box args={[cardWidth - 0.05, 0.02, 0.001]} position={[0, -cardHeight/2 + 0.05, 0]}>
          <meshStandardMaterial color="#d4af37" />
        </Box>
        <Box args={[0.02, cardHeight - 0.05, 0.001]} position={[cardWidth/2 - 0.05, 0, 0]}>
          <meshStandardMaterial color="#d4af37" />
        </Box>
        <Box args={[0.02, cardHeight - 0.05, 0.001]} position={[-cardWidth/2 + 0.05, 0, 0]}>
          <meshStandardMaterial color="#d4af37" />
        </Box>
      </group>
      
      {/* 卡牌背面 - 神秘图案 */}
      <group position={[0, 0, -cardDepth/2 - 0.001]} visible={!isRevealed || isFlipping}>
        {/* 背景渐变 */}
        <Box args={[cardWidth - 0.1, cardHeight - 0.1, 0.001]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#4a0e4e" />
        </Box>
        
        {/* 中央神秘符号 */}
        <Text
          position={[0, 0, 0.001]}
          fontSize={0.6}
          color="#d4af37"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Cinzel-Bold.woff"
        >
          ✦
        </Text>
        
        {/* 四角装饰 */}
        {[
          [-cardWidth/3, cardHeight/3],
          [cardWidth/3, cardHeight/3],
          [-cardWidth/3, -cardHeight/3],
          [cardWidth/3, -cardHeight/3]
        ].map(([x, y], i) => (
          <Text
            key={i}
            position={[x, y, 0.001]}
            fontSize={0.2}
            color="#8a2be2"
            anchorX="center"
            anchorY="middle"
            font="/fonts/Cinzel-Bold.woff"
          >
            ◆
          </Text>
        ))}
        
        {/* Luna标识 */}
        <Text
          position={[0, -cardHeight/2 + 0.15, 0.001]}
          fontSize={0.08}
          color="#d4af37"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Cinzel-Bold.woff"
        >
          LUNA'S MYSTICAL TAROT
        </Text>
      </group>
      
      {/* 发光效果 */}
      {hovered && (
        <pointLight 
          position={[0, 0, 0.5]} 
          intensity={0.5} 
          color="#d4af37"
          distance={3}
        />
      )}
    </group>
  )
}

export default function TarotCard3D(props: TarotCard3DProps) {
  return (
    <div className="w-full h-64 cursor-pointer">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <directionalLight position={[-5, -5, -5]} intensity={0.3} />
          <Card3D {...props} />
        </Suspense>
      </Canvas>
    </div>
  )
}