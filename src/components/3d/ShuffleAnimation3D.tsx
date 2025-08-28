'use client'

import React, { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, Box } from '@react-three/drei'
import { Group, Vector3 } from 'three'
import * as THREE from 'three'

interface ShuffleAnimation3DProps {
  isShuffling: boolean
  onShuffleComplete: () => void
  cardCount: number
}

function ShuffleCards({ isShuffling, onShuffleComplete, cardCount }: ShuffleAnimation3DProps) {
  const groupRef = useRef<Group>(null)
  const cardsRef = useRef<Group[]>([])
  
  // 生成随机的洗牌路径
  const shufflePaths = useMemo(() => {
    return Array.from({ length: cardCount }, (_, i) => ({
      initialPosition: new Vector3(0, i * 0.02, 0),
      shufflePosition: new Vector3(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6 + 2,
        (Math.random() - 0.5) * 4
      ),
      rotation: new Vector3(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      ),
      speed: 1 + Math.random() * 2,
      delay: i * 0.1
    }))
  }, [cardCount])

  useFrame((state) => {
    if (!isShuffling || !groupRef.current) return

    const elapsedTime = state.clock.elapsedTime
    let allCardsReturned = true

    shufflePaths.forEach((path, i) => {
      const cardRef = cardsRef.current[i]
      if (!cardRef) return

      const phase = Math.max(0, (elapsedTime - path.delay) * path.speed)
      
      if (phase < 1) {
        // 洗牌阶段：卡片飞向随机位置
        allCardsReturned = false
        const t = THREE.MathUtils.smoothstep(phase, 0, 1)
        cardRef.position.lerpVectors(path.initialPosition, path.shufflePosition, t)
        
        // 旋转动画
        cardRef.rotation.x = path.rotation.x * t * Math.sin(elapsedTime * 3)
        cardRef.rotation.y = path.rotation.y * t * Math.sin(elapsedTime * 2)
        cardRef.rotation.z = path.rotation.z * t * Math.sin(elapsedTime * 4)
        
      } else if (phase < 2) {
        // 聚拢阶段：卡片回到中心
        allCardsReturned = false
        const t = THREE.MathUtils.smoothstep(phase - 1, 0, 1)
        cardRef.position.lerpVectors(path.shufflePosition, path.initialPosition, t)
        
        // 减缓旋转
        const rotationFactor = 1 - t
        cardRef.rotation.x = path.rotation.x * rotationFactor * Math.sin(elapsedTime * 3)
        cardRef.rotation.y = path.rotation.y * rotationFactor * Math.sin(elapsedTime * 2)
        cardRef.rotation.z = path.rotation.z * rotationFactor * Math.sin(elapsedTime * 4)
      } else {
        // 完成阶段：回到初始位置
        cardRef.position.copy(path.initialPosition)
        cardRef.rotation.set(0, 0, 0)
      }
    })

    // 检查是否所有卡片都完成了动画
    if (allCardsReturned && elapsedTime > 3) {
      onShuffleComplete()
    }
  })

  return (
    <group ref={groupRef}>
      {shufflePaths.map((_, i) => (
        <group 
          key={i}
          ref={(el) => {
            if (el) cardsRef.current[i] = el
          }}
        >
          {/* 3D卡片 */}
          <Box args={[1.2, 2, 0.02]} position={[0, 0, 0]}>
            <meshStandardMaterial 
              color="#2d1b4e" 
              roughness={0.1}
              metalness={0.1}
            />
          </Box>
          
          {/* 卡片背面图案 */}
          <Text
            position={[0, 0, -0.011]}
            fontSize={0.6}
            color="#d4af37"
            anchorX="center"
            anchorY="middle"
            font="/fonts/Cinzel-Bold.woff"
          >
            ✦
          </Text>
          
          {/* 发光粒子效果 */}
          <pointLight 
            position={[0, 0, 0.1]} 
            intensity={0.3} 
            color="#8a2be2"
            distance={2}
          />
        </group>
      ))}
      
      {/* 魔法光环效果 */}
      {isShuffling && (
        <>
          <pointLight 
            position={[0, 0, 2]} 
            intensity={1} 
            color="#d4af37"
            distance={8}
          />
          <pointLight 
            position={[0, 0, -2]} 
            intensity={0.5} 
            color="#8a2be2"
            distance={6}
          />
        </>
      )}
    </group>
  )
}

export default function ShuffleAnimation3D(props: ShuffleAnimation3DProps) {
  if (!props.isShuffling) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 60 }}
          style={{ background: 'transparent' }}
          gl={{ alpha: true, antialias: true }}
          dpr={[1, 2]}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.2} />
            <directionalLight position={[5, 5, 5]} intensity={0.5} />
            <directionalLight position={[-5, -5, -5]} intensity={0.3} />
            <ShuffleCards {...props} />
          </Suspense>
        </Canvas>
      </div>
      
      {/* 洗牌状态文字 */}
      <div className="absolute bottom-20 left-0 right-0 text-center">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-mystical-purple/20 rounded-full border border-mystical-light/30 backdrop-blur-sm">
          <div className="w-6 h-6 border-2 border-mystical-gold border-t-transparent rounded-full animate-spin"></div>
          <span className="text-mystical-light font-medium">Luna正在为你洗牌...</span>
        </div>
      </div>
    </div>
  )
}