import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

function FloatingTorus({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
      
      // Follow mouse with slight delay
      meshRef.current.position.x += (mousePosition.x * 0.5 - meshRef.current.position.x) * 0.02
      meshRef.current.position.y += (mousePosition.y * 0.3 - meshRef.current.position.y) * 0.02
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

function FloatingIcosahedron({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4
      
      // Follow mouse opposite
      meshRef.current.position.x += (-mousePosition.x * 0.3 - meshRef.current.position.x) * 0.02
      meshRef.current.position.y += (-mousePosition.y * 0.4 - meshRef.current.position.y) * 0.02
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

function FloatingOctahedron({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.25
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.35
      
      // Follow mouse
      meshRef.current.position.x += (mousePosition.x * 0.2 - meshRef.current.position.x) * 0.03
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

function FloatingDodecahedron({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.18
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.28
      
      // Follow mouse
      meshRef.current.position.y += (mousePosition.y * 0.25 - meshRef.current.position.y) * 0.02
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

function Scene({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  return (
    <>
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} intensity={0.15} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.1} color="#6366f1" />
      
      <FloatingTorus mousePosition={mousePosition} />
      <FloatingIcosahedron mousePosition={mousePosition} />
      <FloatingOctahedron mousePosition={mousePosition} />
      <FloatingDodecahedron mousePosition={mousePosition} />
      <Particles />
    </>
  )
}

export default function Hero3D() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  const handleMouseMove = (event: React.MouseEvent) => {
    // Normalize mouse position to -1 to 1
    const x = (event.clientX / window.innerWidth) * 2 - 1
    const y = -(event.clientY / window.innerHeight) * 2 + 1
    setMousePosition({ x, y })
  }

  return (
    <div className="canvas-container" onMouseMove={handleMouseMove}>
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 55 }} 
        gl={{ antialias: true, alpha: true }}
      >
        <Scene mousePosition={mousePosition} />
      </Canvas>
    </div>
  )
}
