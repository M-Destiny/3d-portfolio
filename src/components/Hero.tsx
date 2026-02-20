import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  const shapes = useMemo(() => {
    return Array.from({ length: 20 }, () => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      ] as [number, number, number],
      scale: Math.random() * 0.5 + 0.2,
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
      color: ['#6366f1', '#8b5cf6', '#ec4899', '#06b6d4'][Math.floor(Math.random() * 4)]
    }));
  }, []);

  return (
    <group ref={groupRef}>
      {shapes.map((shape, i) => (
        <Float key={i} speed={2} rotationIntensity={1} floatIntensity={2}>
          <mesh position={shape.position} scale={shape.scale} rotation={shape.rotation}>
            <icosahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color={shape.color} wireframe transparent opacity={0.6} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function HeroScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <FloatingShapes />
      <fog attach="fog" args={['#0a0a0a', 10, 50]} />
    </>
  );
}

interface HeroProps {
  name: string;
  title: string;
}

export default function Hero({ name, title }: HeroProps) {
  return (
    <section className="h-screen w-full relative">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a2e 100%)' }}
      >
        <HeroScene />
      </Canvas>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="text-center">
          <h1 className="text-6xl md:text-8xl font-black mb-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {name}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light">
            {title}
          </p>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
