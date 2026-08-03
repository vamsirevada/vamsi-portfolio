"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COUNT = 24;
const CONNECT_DISTANCE = 3.6;
const RADIUS = 7.6;
// Keeps nodes clear of the headline/CTA column so the network reads as
// ambient framing rather than competing with the text for attention.
const EXCLUDE_X = 3.6;
const EXCLUDE_Y = 2.1;
const PULSE_COUNT = 5;

function seedNodes() {
  const nodes = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    let point;
    for (let attempt = 0; attempt < 30; attempt++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = RADIUS * (0.55 + Math.random() * 0.45);
      const candidate = new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta) * 0.55,
        r * Math.cos(phi) * 0.7
      );
      if (Math.abs(candidate.x) > EXCLUDE_X || Math.abs(candidate.y) > EXCLUDE_Y) {
        point = candidate;
        break;
      }
    }
    nodes.push(point ?? new THREE.Vector3(EXCLUDE_X + 1, 0, 0));
  }
  return nodes;
}

// Liang-Barsky clip test: true if any part of segment p1->p2 passes through
// the exclusion rectangle (in local XY, ignoring depth — good enough at this
// camera distance to keep edges from slicing across the headline).
function segmentHitsExclusion(p1, p2) {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  let t0 = 0;
  let t1 = 1;
  const checks = [
    [-dx, p1.x - -EXCLUDE_X],
    [dx, EXCLUDE_X - p1.x],
    [-dy, p1.y - -EXCLUDE_Y],
    [dy, EXCLUDE_Y - p1.y],
  ];
  for (const [p, q] of checks) {
    if (p === 0) {
      if (q < 0) return false;
    } else {
      const r = q / p;
      if (p < 0) {
        if (r > t1) return false;
        if (r > t0) t0 = r;
      } else {
        if (r < t0) return false;
        if (r < t1) t1 = r;
      }
    }
  }
  return true;
}

function buildEdges(nodes) {
  const edges = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      if (
        nodes[i].distanceTo(nodes[j]) < CONNECT_DISTANCE &&
        !segmentHitsExclusion(nodes[i], nodes[j])
      ) {
        edges.push([i, j]);
      }
    }
  }
  return edges;
}

function Network() {
  const groupRef = useRef(null);
  const pulseRefs = useRef([]);

  const { nodes, edgeGeometry, pulseEdges } = useMemo(() => {
    const nodes = seedNodes();
    const edges = buildEdges(nodes);
    const positions = new Float32Array(edges.length * 6);
    edges.forEach(([a, b], i) => {
      positions.set(
        [nodes[a].x, nodes[a].y, nodes[a].z, nodes[b].x, nodes[b].y, nodes[b].z],
        i * 6
      );
    });
    const edgeGeometry = new THREE.BufferGeometry();
    edgeGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const pulseEdges = [...edges]
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(PULSE_COUNT, edges.length));
    return { nodes, edgeGeometry, pulseEdges };
  }, []);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (group) {
      group.rotation.y += delta * 0.01;
      const targetX = state.pointer.y * 0.05;
      const targetZ = state.pointer.x * 0.05;
      group.rotation.x += (targetX - group.rotation.x) * 0.03;
      group.rotation.z += (targetZ - group.rotation.z) * 0.03;
    }
    pulseRefs.current.forEach((mesh, i) => {
      const edge = pulseEdges[i];
      if (!mesh || !edge) return;
      const [a, b] = edge;
      const t = (state.clock.elapsedTime * 0.25 + i * 0.31) % 1;
      mesh.position.lerpVectors(nodes[a], nodes[b], t);
      mesh.material.opacity = Math.sin(t * Math.PI) * 0.55;
    });
  });

  return (
    <group ref={groupRef}>
      <lineSegments geometry={edgeGeometry}>
        <lineBasicMaterial
          color="#6EE7B7"
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.04, 12, 12]} />
          <meshBasicMaterial
            color={i % 5 === 0 ? "#4F8CFF" : "#6EE7B7"}
            transparent
            opacity={0.4}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
      {pulseEdges.map((_, i) => (
        <mesh key={`pulse-${i}`} ref={(el) => (pulseRefs.current[i] = el)}>
          <sphereGeometry args={[0.065, 8, 8]} />
          <meshBasicMaterial
            color="#6EE7B7"
            transparent
            opacity={0}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function HeroNetwork() {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.5]}
      events={() => ({ enabled: false, priority: 0 })}
      style={{ position: "absolute", inset: 0 }}
    >
      <Network />
    </Canvas>
  );
}
