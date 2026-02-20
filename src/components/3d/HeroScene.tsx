import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshTransmissionMaterial, Environment, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

function WaveSphere() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={2}>
        <sphereGeometry args={[1, 128, 128]} />
        <MeshTransmissionMaterial 
          distortion={0.5}
          distortionScale={0.5}
          temporalDistortion={0.1}
          thickness={0.5}
          roughness={0.1}
          transmission={1}
          chromaticAberration={0.06}
          anisotropy={0.1}
          color="#a855f7"
        />
      </mesh>
    </Float>
  )
}

function BackgroundShapes() {
  const shapes = Array.from({ length: 15 }, (_, idx) => ({
    position: [
      (Math.random() - 0.5) * 30,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 15 - 5
    ] as [number, number, number],
    scale: Math.random() * 0.5 + 0.2,
    speed: Math.random() * 0.5 + 0.2,
    color: idx % 2 === 0 ? '#06b6d4' : '#ec4899'
  }))

  return (
    <>
      {shapes.map((shape, i) => (
        <Float key={i} speed={shape.speed} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh position={shape.position} scale={shape.scale}>
            <icosahedronGeometry args={[1, 0]} />
            <meshStandardMaterial 
              color={shape.color} 
              wireframe 
              transparent 
              opacity={0.3} 
            />
          </mesh>
        </Float>
      ))}
    </>
  )
}

function Particles() {
  const count = 200
  const positions = new Float32Array(count * 3)
  
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 40
    positions[i * 3 + 1] = (Math.random() - 0.5) * 40
    positions[i * 3 + 2] = (Math.random() - 0.5) * 40
  }

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#a855f7" transparent opacity={0.6} />
    </points>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#a855f7" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />
      <pointLight position={[0, 0, 10]} intensity={0.8} color="#ec4899" />
      
      <WaveSphere />
      <BackgroundShapes />
      <Particles />
      <Sparkles count={100} scale={20} size={2} speed={0.5} color="#a855f7" />
      <Environment preset="night" />
      <fog attach="fog" args={['#050505', 5, 25]} />
    </>
  )
}

export default function Hero3D() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }} gl={{ antialias: true }}>
        <Scene />
      </Canvas>
    </div>
  )
}
