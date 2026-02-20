import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

function HeroObjects() {
  const torusRef = useRef<THREE.Mesh>(null)
  const octaRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (torusRef.current) {
      torusRef.current.rotation.x = state.clock.elapsedTime * 0.3
      torusRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
    if (octaRef.current) {
      octaRef.current.rotation.x = state.clock.elapsedTime * 0.2
      octaRef.current.rotation.y = state.clock.elapsedTime * 0.4
    }
  })

  return (
    <>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={torusRef} position={[2, 0, -1]} scale={0.7}>
          <torusGeometry args={[1, 0.4, 16, 32]} />
          <meshStandardMaterial color="#818cf8" wireframe />
        </mesh>
      </Float>
      
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.7}>
        <mesh ref={octaRef} position={[-2, 1, -2]} scale={0.6}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#f472b6" wireframe />
        </mesh>
      </Float>

      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
        <mesh position={[0, -2, -3]} scale={0.5}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#22d3ee" wireframe />
        </mesh>
      </Float>
    </>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} intensity={0.3} color="#818cf8" />
      
      <HeroObjects />
      <Sparkles count={30} scale={12} size={2} speed={0.2} color="#a5b4fc" />
    </>
  )
}

export default function Hero3D() {
  return (
    <div className="fixed inset-0 z-0 opacity-80">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} gl={{ antialias: true }}>
        <Scene />
      </Canvas>
    </div>
  )
}
