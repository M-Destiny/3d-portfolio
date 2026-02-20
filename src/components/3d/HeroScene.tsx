import { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshTransmissionMaterial, Environment, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

function HeroOrb() {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHover] = useState(false)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.08
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.12
    }
  })

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.4}>
      <mesh 
        ref={meshRef} 
        scale={3}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <sphereGeometry args={[1, 128, 128]} />
        <MeshTransmissionMaterial 
          backside
          samples={12}
          thickness={1}
          chromaticAberration={0.15}
          anisotropy={0.5}
          distortion={0.8}
          distortionScale={0.7}
          temporalDistortion={0.3}
          iridescence={1.2}
          iridescenceIOR={1.3}
          iridescenceThicknessRange={[0, 1800]}
          color={hovered ? "#ffffff" : "#e0e0e0"}
          transmission={1}
          roughness={0}
        />
      </mesh>
    </Float>
  )
}

function BackgroundOrbs() {
  const orbs = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10 - 5
      ] as [number, number, number],
      scale: Math.random() * 0.3 + 0.15,
      speed: Math.random() * 0.3 + 0.2,
      color: i % 2 === 0 ? '#6366f1' : '#ec4899'
    }))
  }, [])

  return (
    <>
      {orbs.map((orb, i) => (
        <Float key={i} speed={orb.speed} rotationIntensity={0.2} floatIntensity={0.3}>
          <mesh position={orb.position} scale={orb.scale}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial color={orb.color} transparent opacity={0.4} />
          </mesh>
        </Float>
      ))}
    </>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-8, -8, -8]} intensity={0.6} color="#6366f1" />
      <pointLight position={[8, -8, 8]} intensity={0.6} color="#ec4899" />
      
      <HeroOrb />
      <BackgroundOrbs />
      <Sparkles count={80} scale={20} size={4} speed={0.3} color="#818cf8" />
      <Environment preset="city" />
    </>
  )
}

export default function Hero3D() {
  return (
    <div className="fixed inset-0 -z-10 bg-black">
      <Canvas camera={{ position: [0, 0, 5], fov: 40 }} gl={{ antialias: true, alpha: true }}>
        <Scene />
      </Canvas>
    </div>
  )
}
