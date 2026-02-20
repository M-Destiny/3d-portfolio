import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshTransmissionMaterial, Environment, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

function HeroOrb() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={3.5}>
        <sphereGeometry args={[1, 128, 128]} />
        <MeshTransmissionMaterial 
          backside
          samples={16}
          thickness={1.5}
          chromaticAberration={0.2}
          anisotropy={0.8}
          distortion={1}
          distortionScale={0.8}
          temporalDistortion={0.4}
          iridescence={1.5}
          iridescenceIOR={1.5}
          iridescenceThicknessRange={[0, 2200]}
          color="#ffffff"
          transmission={1}
          roughness={0}
        />
      </mesh>
    </Float>
  )
}

function FloatingOrbs() {
  const orbs = [
    { pos: [-8, 4, -5], scale: 0.5, color: '#6366f1' },
    { pos: [10, -3, -8], scale: 0.4, color: '#ec4899' },
    { pos: [-5, -5, -3], scale: 0.3, color: '#8b5cf6' },
    { pos: [6, 5, -6], scale: 0.35, color: '#06b6d4' },
  ]

  return (
    <>
      {orbs.map((orb, i) => (
        <Float key={i} speed={0.5 + Math.random() * 0.5} rotationIntensity={0.3} floatIntensity={0.4}>
          <mesh position={orb.pos as [number, number, number]} scale={orb.scale}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial color={orb.color} transparent opacity={0.5} />
          </mesh>
        </Float>
      ))}
    </>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#6366f1" />
      <pointLight position={[10, -10, 10]} intensity={0.5} color="#ec4899" />
      
      <HeroOrb />
      <FloatingOrbs />
      <Sparkles count={100} scale={25} size={5} speed={0.4} color="#a5b4fc" />
      <Environment preset="city" />
    </>
  )
}

export default function Hero3D() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 35 }} gl={{ antialias: true, alpha: true }}>
        <Scene />
      </Canvas>
    </div>
  )
}
