import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

function MouseParticles() {
  const count = 100;
  const mesh = useRef<THREE.InstancedMesh>(null);
  const [hovered, setHover] = useState(false);
  const { viewport, mouse } = useThree();
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  useFrame(() => {
    if (!mesh.current) return;
    
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 2;
      const s = Math.cos(t);
      
      particle.mx += (mouse.x * viewport.width / 2 - particle.mx) * 0.02;
      particle.my += (mouse.y * viewport.height / 2 - particle.my) * 0.02;
      
      dummy.position.set(
        (particle.mx / 10) + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]} onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}>
      <dodecahedronGeometry args={[0.2, 0]} />
      <meshStandardMaterial color={hovered ? "#ff6b6b" : "#6366f1"} emissive={hovered ? "#ff6b6b" : "#6366f1"} emissiveIntensity={0.5} />
    </instancedMesh>
  );
}

function HeroSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[2, 0, 0]} scale={1.5}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial color="#ff6b6f" speed={2} distort={0.4} />
      </mesh>
    </Float>
  );
}

function HeroTorus() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.3}>
      <mesh ref={meshRef} position={[-2, 1, -1]} scale={0.8}>
        <torusKnotGeometry args={[0.8, 0.3, 100, 16]} />
        <meshStandardMaterial color="#4ecdc4" metalness={0.9} roughness={0.1} />
      </mesh>
    </Float>
  );
}

function FloatingGeometries() {
  const geometries = useMemo(() => {
    return Array.from({ length: 20 }, () => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10 - 5
      ] as [number, number, number],
      scale: Math.random() * 0.5 + 0.2,
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
      color: ['#ff6b6f', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'][Math.floor(Math.random() * 5)]
    }));
  }, []);

  return (
    <>
      {geometries.map((geo, idx) => (
        <Float key={idx} speed={1 + Math.random()} rotationIntensity={1} floatIntensity={1}>
          <mesh position={geo.position} scale={geo.scale} rotation={geo.rotation}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color={geo.color} wireframe />
          </mesh>
        </Float>
      ))}
    </>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ff6b6f" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4ecdc4" />
      <pointLight position={[0, 10, 0]} intensity={0.8} color="#45b7d1" />
      
      <HeroSphere />
      <HeroTorus />
      <FloatingGeometries />
      <MouseParticles />
      
      <Environment preset="city" />
      <fog attach="fog" args={['#0a0a1a', 5, 30]} />
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
