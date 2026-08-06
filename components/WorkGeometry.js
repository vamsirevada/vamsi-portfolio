"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

// Two wireframe primitives flanking the section — offset away from center so
// they read as ambient framing rather than competing with the heading/cards.
function WireframeCluster() {
  const groupRef = useRef(null);
  const icoRef = useRef(null);
  const knotRef = useRef(null);

  useFrame((state, delta) => {
    if (icoRef.current) {
      icoRef.current.rotation.x += delta * 0.09;
      icoRef.current.rotation.y += delta * 0.13;
    }
    if (knotRef.current) {
      knotRef.current.rotation.x -= delta * 0.06;
      knotRef.current.rotation.y += delta * 0.08;
    }
    if (groupRef.current) {
      const targetX = state.pointer.y * 0.12;
      const targetY = state.pointer.x * 0.12;
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.03;
      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.03;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={icoRef} position={[3.4, 0.6, -1]}>
        <icosahedronGeometry args={[1.5, 0]} />
        <meshBasicMaterial color="#6EE7B7" wireframe transparent opacity={0.2} />
      </mesh>
      <mesh ref={knotRef} position={[-3.6, -0.5, -1.5]}>
        <torusKnotGeometry args={[0.7, 0.22, 110, 16]} />
        <meshBasicMaterial color="#4F8CFF" wireframe transparent opacity={0.16} />
      </mesh>
    </group>
  );
}

export default function WorkGeometry() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 42 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.5]}
      events={() => ({ enabled: false, priority: 0 })}
      style={{ position: "absolute", inset: 0 }}
    >
      <WireframeCluster />
    </Canvas>
  );
}
