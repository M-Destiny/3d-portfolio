import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

function FloatingTorus({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (meshRef.current) {
      // Rotation
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
      
      // Mouse follow with spring
      const targetX = mousePosition.x * 1.5
      const targetY = mousePosition.y * 0.8
      meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.03
      meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.03
      
      // Scale on hover
      const targetScale = hovered ? 0.7 : 0.5
      meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1))
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
      <mesh 
        ref={meshRef} 
        position={[2, 0, -1]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <torusGeometry args={[1, 0.35, 16, 32]} />
        <meshStandardMaterial 
          color={hovered ? "#818cf8" : "#ffffff"} 
          wireframe 
          opacity={hovered ? 0.8 : 0.4} 
          transparent 
        />
      </mesh>
    </Float>
  )
}

function FloatingIcosahedron({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4
      
      const targetX = -mousePosition.x * 1.2
      const targetY = -mousePosition.y * 0.6 + 0.5
      meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.025
      meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.025
      
      const targetScale = hovered ? 0.6 : 0.45
      meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1))
    }
  })

  return (
    <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh 
        ref={meshRef} 
        position={[-2, 0.5, -1.5]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial 
          color={hovered ? "#f472b6" : "#ffffff"} 
          wireframe 
          opacity={hovered ? 0.8 : 0.3} 
          transparent 
        />
      </mesh>
    </Float>
  )
}

function FloatingOctahedron({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.25
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.35
      
      const targetX = mousePosition.x * 0.8
      meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.02
      
      const targetScale = hovered ? 0.5 : 0.35
      meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1))
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.15} floatIntensity={0.35}>
      <mesh 
        ref={meshRef} 
        position={[0, -1.5, -2]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial 
          color={hovered ? "#22d3ee" : "#6366f1"} 
          wireframe 
          opacity={hovered ? 0.8 : 0.5} 
          transparent 
        />
      </mesh>
    </Float>
  )
}

function FloatingDodecahedron({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.18
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.28
      
      const targetY = mousePosition.y * 1 + 1.5
      meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.025
      
      const targetScale = hovered ? 0.4 : 0.3
      meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1))
    }
  })

  return (
    <Float speed={1.3} rotationIntensity={0.25} floatIntensity={0.45}>
      <mesh 
        ref={meshRef} 
        position={[1.5, 1.5, -1]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial 
          color={hovered ? "#f472b6" : "#ec4899"} 
          wireframe 
          opacity={hovered ? 0.8 : 0.4} 
          transparent 
        />
      </mesh>
    </Float>
  )
}

function Particles() {
  return (
    <Sparkles 
      count={60} 
      scale={15} 
      size={2.5} 
      speed={0.15} 
      color="#818cf8" 
      opacity={0.4}
    />
  )
}

function Scene({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  return (
    <>
      <ambientLight intensity={1.2} />
      <pointLight position={[10, 10, 10]} intensity={0.2} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.15} color="#818cf8" />
      <pointLight position={[0, 0, 10]} intensity={0.1} color="#f472b6" />
      
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
