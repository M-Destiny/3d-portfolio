import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

function FloatingOrbs() {
  const orbs = [
    { pos: [-3, 2, -2], scale: 0.4, color: '#818cf8' },
    { pos: [3, -1, -3], scale: 0.3, color: '#f472b6' },
    { pos: [-2, -2, -1], scale: 0.25, color: '#c084fc' },
    { pos: [2, 2, -2], scale: 0.35, color: '#22d3ee' },
  ]

  return (
    <>
      {orbs.map((orb, i) => (
        <Float key={i} speed={1 + i * 0.3} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh position={orb.pos as [number, number, number]} scale={orb.scale}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial color={orb.color} transparent opacity={0.6} />
          </mesh>
        </Float>
      ))}
    </>
  )
}

function GridLines() {
  const ref = useRef<THREE.LineSegments>(null)
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <Float speed={0.2} rotationIntensity={0} floatIntensity={0.2}>
      <lineSegments ref={ref} position={[0, 0, -5]}>
        <edgesGeometry args={[new THREE.BoxGeometry(6, 6, 6), 1]} />
        <lineBasicMaterial color="#6366f1" transparent opacity={0.15} />
      </lineSegments>
    </Float>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#818cf8" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#f472b6" />
      
      <FloatingOrbs />
      <GridLines />
      <Sparkles count={50} scale={15} size={3} speed={0.3} color="#a5b4fc" />
      <Environment preset="city" />
    </>
  )
}

export default function Hero3D() {
  return (
    <div className="fixed inset-0 z-0 opacity-60">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }} gl={{ antialias: true }}>
        <Scene />
      </Canvas>
    </div>
  )
}
