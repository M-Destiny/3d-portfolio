import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshTransmissionMaterial, Environment, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

function GlassOrb() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef} position={[0, 0, 0]} scale={2.5}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshTransmissionMaterial 
          backside
          samples={8}
          thickness={0.5}
          chromaticAberration={0.1}
          anisotropy={0.3}
          distortion={0.6}
          distortionScale={0.6}
          temporalDistortion={0.2}
          iridescence={1}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
          color="#c084fc"
          transmission={1}
          roughness={0}
        />
      </mesh>
    </Float>
  )
}

function FloatingShapes() {
  const shapes = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8 - 2
      ] as [number, number, number],
      scale: Math.random() * 0.4 + 0.2,
      speed: Math.random() * 0.5 + 0.3,
      color: ['#22d3ee', '#f472b6', '#a78bfa', '#34d399'][i % 4]
    }))
  }, [])

  return (
    <>
      {shapes.map((shape, i) => (
        <Float key={i} speed={shape.speed} rotationIntensity={1} floatIntensity={1}>
          <mesh position={shape.position} scale={shape.scale}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color={shape.color} wireframe opacity={0.7} transparent />
          </mesh>
        </Float>
      ))}
    </>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#c084fc" />
      <pointLight position={[10, -10, 10]} intensity={0.5} color="#22d3ee" />
      
      <GlassOrb />
      <FloatingShapes />
      <Sparkles count={150} scale={25} size={3} speed={0.4} color="#c084fc" />
      <Environment preset="city" />
    </>
  )
}

export default function Hero3D() {
  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <Scene />
      </Canvas>
    </div>
  )
}
