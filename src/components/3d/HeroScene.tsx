import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

function FloatingTorus() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
      <mesh ref={meshRef} position={[2, 0, -1]} scale={0.5}>
        <torusGeometry args={[1, 0.35, 16, 32]} />
        <meshStandardMaterial color="#ffffff" wireframe opacity={0.4} transparent />
      </mesh>
    </Float>
  )
}

function FloatingIcosahedron() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4
    }
  })

  return (
    <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[-2, 0.5, -1.5]} scale={0.45}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#ffffff" wireframe opacity={0.3} transparent />
      </mesh>
    </Float>
  )
}

function FloatingOctahedron() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.25
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.35
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.15} floatIntensity={0.35}>
      <mesh ref={meshRef} position={[0, -1.5, -2]} scale={0.35}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#6366f1" wireframe opacity={0.5} transparent />
      </mesh>
    </Float>
  )
}

function FloatingDodecahedron() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.18
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.28
    }
  })

  return (
    <Float speed={1.3} rotationIntensity={0.25} floatIntensity={0.45}>
      <mesh ref={meshRef} position={[1.5, 1.5, -1]} scale={0.3}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#ec4899" wireframe opacity={0.4} transparent />
      </mesh>
    </Float>
  )
}

function Particles() {
  return (
    <Sparkles 
      count={40} 
      scale={12} 
      size={2} 
      speed={0.2} 
      color="#6366f1" 
      opacity={0.3}
    />
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} intensity={0.15} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.1} color="#6366f1" />
      
      <FloatingTorus />
      <FloatingIcosahedron />
      <FloatingOctahedron />
      <FloatingDodecahedron />
      <Particles />
    </>
  )
}

export default function Hero3D() {
  return (
    <div className="canvas-container">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 55 }} 
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
