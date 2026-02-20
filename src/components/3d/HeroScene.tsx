import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

function HeroObjects() {
  const groupRef = useRef<THREE.Group>(null)
  const torusRef = useRef<THREE.Mesh>(null)
  const icoRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
    if (torusRef.current) {
      torusRef.current.rotation.x = state.clock.elapsedTime * 0.5
      torusRef.current.rotation.z = state.clock.elapsedTime * 0.3
    }
    if (icoRef.current) {
      icoRef.current.rotation.x = state.clock.elapsedTime * 0.3
      icoRef.current.rotation.y = state.clock.elapsedTime * 0.5
    }
  })

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh ref={torusRef} position={[2.5, 0.5, -1]} scale={0.6}>
          <torusGeometry args={[1, 0.35, 16, 32]} />
          <meshStandardMaterial color="#6366f1" wireframe />
        </mesh>
      </Float>
      
      <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.6}>
        <mesh ref={icoRef} position={[-2, -0.5, -1.5]} scale={0.55}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#ec4899" wireframe />
        </mesh>
      </Float>

      <Float speed={2.2} rotationIntensity={0.1} floatIntensity={0.4}>
        <mesh position={[0, 2, -2]} scale={0.4}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#22d3ee" wireframe />
        </mesh>
      </Float>

      <Float speed={1.3} rotationIntensity={0.4} floatIntensity={0.7}>
        <mesh position={[1.5, -1.5, -1]} scale={0.35}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#a855f7" wireframe />
        </mesh>
      </Float>
    </group>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={1.2} />
      <pointLight position={[10, 10, 10]} intensity={0.2} color="#6366f1" />
      <pointLight position={[-10, -10, -10]} intensity={0.2} color="#ec4899" />
      
      <HeroObjects />
      <Sparkles count={50} scale={15} size={2.5} speed={0.3} color="#818cf8" />
    </>
  )
}

export default function Hero3D() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 55 }} gl={{ antialias: true }}>
        <Scene />
      </Canvas>
    </div>
  )
}
