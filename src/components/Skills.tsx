import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, Text } from '@react-three/drei';
import * as THREE from 'three';
import type { Skill } from '../types';

interface SkillNodeProps {
  skill: Skill;
  position: [number, number, number];
  index: number;
}

function SkillNode({ skill, position, index }: SkillNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const color = skill.category === 'frontend' ? '#6366f1' : skill.category === 'backend' ? '#10b981' : '#f59e0b';
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + index) * 0.2;
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
      </mesh>
      <Text
        position={[0, -1, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {skill.name}
      </Text>
    </group>
  );
}

function SkillsScene({ skills }: { skills: Skill[] }) {
  const groupRef = useRef<THREE.Group>(null);
  
  const nodePositions = useMemo(() => {
    const radius = 5;
    return skills.map((_, i) => {
      const angle = (i / skills.length) * Math.PI * 2;
      const y = Math.sin(i * 0.5) * 2;
      return [
        Math.cos(angle) * radius,
        y,
        Math.sin(angle) * radius
      ] as [number, number, number];
    });
  }, [skills.length]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  // Create connections
  const lines = useMemo(() => {
    const linePoints: THREE.Vector3[] = [];
    nodePositions.forEach(pos => {
      linePoints.push(new THREE.Vector3(...pos));
    });
    linePoints.push(new THREE.Vector3(...nodePositions[0]));
    return linePoints;
  }, [nodePositions]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      <group ref={groupRef}>
        {skills.map((skill, i) => (
          <SkillNode key={skill.name} skill={skill} position={nodePositions[i]} index={i} />
        ))}
        
        <Line
          points={lines}
          color="#6366f1"
          lineWidth={1}
          transparent
          opacity={0.3}
        />
      </group>
      
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
    </>
  );
}

interface SkillsProps {
  skills: Skill[];
}

export default function Skills({ skills }: SkillsProps) {
  return (
    <section id="skills" className="min-h-screen py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">
          Skills & <span className="text-purple-400">Technologies</span>
        </h2>
        
        <div className="h-[500px] rounded-2xl overflow-hidden">
          <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
            <SkillsScene skills={skills} />
          </Canvas>
        </div>
        
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {['Frontend', 'Backend', 'Tools'].map(cat => (
            <span key={cat} className="px-4 py-2 rounded-full bg-gray-800 text-gray-300 text-sm">
              {cat}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
