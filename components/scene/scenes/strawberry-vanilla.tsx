import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { CatmullRomCurve3, Vector3, type Group } from "three";
import { Jar, type FlavorSceneProps } from "../shared-models";

const SEEDS = [
  [-0.15, 0.16, 0.29],
  [0.13, 0.2, 0.3],
  [-0.23, -0.03, 0.28],
  [0.04, -0.06, 0.33],
  [0.22, -0.11, 0.25],
  [-0.12, -0.27, 0.24],
  [0.12, -0.31, 0.21],
] as const;

const STRAWBERRIES = [
  { position: [-1.4, -0.45, 0.35], rotation: [0.1, 0.3, -0.2], scale: 0.92 },
  { position: [1.38, 0.18, 0.1], rotation: [-0.1, -0.42, 0.24], scale: 0.76 },
  { position: [0.72, 1.28, -0.35], rotation: [0.2, 0.55, -0.45], scale: 0.62 },
] as const;

function SeededStrawberry({
  position,
  rotation,
  scale,
}: (typeof STRAWBERRIES)[number]) {
  return (
    <group position={[...position]} rotation={[...rotation]} scale={scale}>
      <mesh castShadow scale={[0.9, 1.08, 0.82]}>
        <sphereGeometry args={[0.42, 24, 18]} />
        <meshStandardMaterial color="#d94357" roughness={0.68} />
      </mesh>
      <mesh castShadow position={[0, -0.36, 0]} rotation={[0, 0, Math.PI]}>
        <coneGeometry args={[0.32, 0.48, 24]} />
        <meshStandardMaterial color="#d94357" roughness={0.7} />
      </mesh>
      {SEEDS.map(([x, y, z], index) => (
        <mesh key={index} position={[x, y, z]} scale={[0.65, 1, 0.38]}>
          <sphereGeometry args={[0.035, 8, 6]} />
          <meshStandardMaterial color="#f8db94" roughness={0.9} />
        </mesh>
      ))}
      {[0, 1, 2, 3, 4].map((index) => (
        <mesh
          key={index}
          position={[0, 0.4, 0]}
          rotation={[
            Math.PI / 2,
            0,
            (index / 5) * Math.PI * 2,
          ]}
          scale={[0.45, 0.18, 0.72]}
        >
          <coneGeometry args={[0.22, 0.44, 8]} />
          <meshStandardMaterial color="#4d713a" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

export function StrawberryVanillaScene({ paused }: FlavorSceneProps) {
  const group = useRef<Group>(null);
  const phase = useRef(0);
  const creamCurve = useMemo(
    () =>
      new CatmullRomCurve3([
        new Vector3(-1.55, 0.72, -0.1),
        new Vector3(-0.85, 1.15, 0.62),
        new Vector3(0.1, 0.96, 1.08),
        new Vector3(0.95, 0.54, 0.72),
        new Vector3(1.52, 0.82, -0.08),
      ]),
    [],
  );

  useFrame((_, delta) => {
    if (!paused && group.current) {
      phase.current += delta;
      group.current.rotation.y -= delta * 0.045;
      group.current.position.y = Math.sin(phase.current * 0.72 + 1) * 0.04;
    }
  });

  return (
    <group ref={group}>
      <Jar color="#dc9e9a" glassTint="#ffe5dc" topColor="#f2c8bd" />

      <mesh castShadow>
        <tubeGeometry args={[creamCurve, 72, 0.12, 14, false]} />
        <meshPhysicalMaterial
          clearcoat={0.25}
          color="#fff0d8"
          roughness={0.38}
          sheen={0.45}
          sheenColor="#f6afb6"
        />
      </mesh>

      {STRAWBERRIES.map((strawberry, index) => (
        <SeededStrawberry key={index} {...strawberry} />
      ))}
    </group>
  );
}
