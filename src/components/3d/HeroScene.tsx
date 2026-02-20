import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshTransmissionMaterial, Environment, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

function HeroSphere() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.08
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.12
    }
  })

  return (
    <Float speed={1.8} rotationIntensity={0.6} floatIntensity={0.8}>
      <mesh ref={meshRef} scale={4}>
        <sphereGeometry args={[1, 128, 128]} />
        <MeshTransmissionMaterial 
          backside
          samples={20}
          thickness={2}
          chromaticAberration={0.3}
          anisotropy={1}
          distortion={1.2}
          distortionScale={1}
          temporalDistortion={0.5}
          iridescence={2}
          iridescenceIOR={1.5}
          iridescenceThicknessRange={[0, 2800]}
          color="#ffffff"
          transmission={1}
          roughness={0}
        />
      </mesh>
    </Float>
  )
}

function FloatingShapes() {
  const shapes = [
    { pos: [-6, 3, -4], scale: 0.6, color: '#818cf8' },
    { pos: [7, -2, -6], scale: 0.5, color: '#f472b6' },
    { pos: [-4, -4, -2], scale: 0.4, color: '#c084fc' },
    { pos: [5, 4, -5], scale: 0.45, color: '#22d3ee' },
    { pos: [0, 5, -3], scale: 0.35, color: '#34d399' },
  ]

  return (
    <>
      {shapes.map((shape, i) => (
        <Float key={i} speed={0.6 + Math.random() * 0.4} rotationIntensity={0.5} floatIntensity={0.6}>
          <mesh position={shape.pos as [number, number, number]} scale={shape.scale}>
            <icosahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color={shape.color} wireframe opacity={0.6} transparent />
          </mesh>
        </Float>
      ))}
    </>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[15, 15, 15]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-15, -15, -15]} intensity={0.8} color="#818cf8" />
      <pointLight position={[15, -15, 15]} intensity={0.8} color="#f472b6" />
      <pointLight position={[0, 15, 0]} intensity={0.5} color="#c084fc" />
      
      <HeroSphere />
      <FloatingShapes />
      <Sparkles count={200} scale={30} size={6} speed={0.5} color="#c4b5fd" />
      <Environment preset="city" />
    </>
  )
}

export default function Hero3D() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas 
        camera={{ position: [0, 0, 6], fov: 30 }} 
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
