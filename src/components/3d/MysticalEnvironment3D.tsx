'use client'

import React, { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, Box, Sphere, Torus } from '@react-three/drei'
import { Group, Color } from 'three'
import * as THREE from 'three'

interface MysticalEnvironment3DProps {
  children: React.ReactNode
  ambientIntensity?: number
}

function FloatingParticles() {
  const particlesRef = useRef<Group>(null)
  
  // 生成漂浮的魔法粒子
  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10
      ] as [number, number, number],
      size: 0.05 + Math.random() * 0.1,
      speed: 0.5 + Math.random() * 1,
      color: Math.random() > 0.5 ? "#d4af37" : "#8a2be2"
    }))
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.children.forEach((particle, i) => {
        const data = particles[i]
        particle.position.y += Math.sin(state.clock.elapsedTime * data.speed) * 0.01
        particle.position.x += Math.cos(state.clock.elapsedTime * data.speed * 0.5) * 0.005
        
        // 粒子发光效果
        const material = (particle as any).material
        if (material) {
          material.emissiveIntensity = 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.3
        }
      })
    }
  })

  return (
    <group ref={particlesRef}>
      {particles.map((particle, i) => (
        <Sphere key={i} args={[particle.size]} position={particle.position}>
          <meshStandardMaterial 
            color={particle.color}
            emissive={particle.color}
            emissiveIntensity={0.5}
            transparent
            opacity={0.8}
          />
        </Sphere>
      ))}
    </group>
  )
}

function MysticalTable() {
  const tableRef = useRef<Group>(null)
  
  useFrame((state) => {
    if (tableRef.current) {
      // 桌面轻微的魔法光芒脉动
      const material = (tableRef.current.children[0] as any).material
      if (material) {
        material.emissiveIntensity = 0.1 + Math.sin(state.clock.elapsedTime) * 0.05
      }
    }
  })

  return (
    <group ref={tableRef} position={[0, -1, 0]}>
      {/* 主桌面 */}
      <Box args={[12, 0.2, 8]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#1a0b2e"
          emissive="#4a0e4e"
          emissiveIntensity={0.1}
          roughness={0.3}
          metalness={0.1}
        />
      </Box>
      
      {/* 魔法圆阵 */}
      <Torus args={[3, 0.02, 8, 32]} position={[0, 0.11, 0]} rotation={[-Math.PI/2, 0, 0]}>
        <meshStandardMaterial 
          color="#d4af37"
          emissive="#d4af37"
          emissiveIntensity={0.5}
        />
      </Torus>
      
      <Torus args={[2, 0.01, 8, 32]} position={[0, 0.11, 0]} rotation={[-Math.PI/2, 0, 0]}>
        <meshStandardMaterial 
          color="#8a2be2"
          emissive="#8a2be2"
          emissiveIntensity={0.7}
        />
      </Torus>
      
      {/* 符文装饰 */}
      {[
        { pos: [0, 3, 0], symbol: "☾" },
        { pos: [3, 0, 0], symbol: "☽" },
        { pos: [0, -3, 0], symbol: "✧" },
        { pos: [-3, 0, 0], symbol: "✦" }
      ].map((rune, i) => (
        <Text
          key={i}
          position={[rune.pos[0], 0.12, rune.pos[2]]}
          fontSize={0.3}
          color="#d4af37"
          anchorX="center"
          anchorY="middle"
          rotation={[-Math.PI/2, 0, 0]}
          font="/fonts/Cinzel-Bold.woff"
        >
          {rune.symbol}
        </Text>
      ))}
      
      {/* 水晶球装饰 */}
      <Sphere args={[0.3]} position={[-4, 0.5, -2]}>
        <meshPhysicalMaterial 
          color="#ffffff"
          transmission={0.9}
          opacity={0.3}
          transparent
          roughness={0}
          ior={1.5}
        />
      </Sphere>
      
      <Sphere args={[0.2]} position={[4, 0.4, 2]}>
        <meshPhysicalMaterial 
          color="#8a2be2"
          transmission={0.7}
          opacity={0.5}
          transparent
          roughness={0.1}
          ior={1.4}
        />
      </Sphere>
    </group>
  )
}

function AmbientLighting({ intensity = 0.3 }: { intensity?: number }) {
  const lightRef = useRef<THREE.PointLight>(null)
  
  useFrame((state) => {
    if (lightRef.current) {
      // 动态环境光效
      lightRef.current.intensity = intensity + Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      lightRef.current.position.y = 5 + Math.sin(state.clock.elapsedTime * 0.3) * 0.5
    }
  })

  return (
    <>
      <ambientLight intensity={intensity * 0.5} />
      <pointLight 
        ref={lightRef}
        position={[0, 5, 0]} 
        intensity={intensity}
        color="#d4af37"
        distance={15}
        castShadow
      />
      <directionalLight 
        position={[10, 10, 10]} 
        intensity={intensity * 0.8}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
    </>
  )
}

export default function MysticalEnvironment3D({ 
  children, 
  ambientIntensity = 0.4 
}: MysticalEnvironment3DProps) {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 2, 8], fov: 60 }}
        shadows
        style={{ background: 'linear-gradient(180deg, #0f0320 0%, #1a0b2e 100%)' }}
        gl={{ alpha: false, antialias: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <AmbientLighting intensity={ambientIntensity} />
          <MysticalTable />
          <FloatingParticles />
          
          {/* 星空背景 */}
          <Sphere args={[50]} position={[0, 0, 0]}>
            <meshBasicMaterial 
              color="#000011"
              side={THREE.BackSide}
              transparent
              opacity={0.8}
            />
          </Sphere>
          
          {children}
        </Suspense>
      </Canvas>
      
      {/* 魔法光芒覆盖层 */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-radial from-mystical-gold/5 via-transparent to-mystical-purple/10" />
    </div>
  )
}