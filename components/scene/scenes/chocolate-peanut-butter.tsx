import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { CatmullRomCurve3, Vector3, type Group } from "three";
import { Jar, type FlavorSceneProps } from "../shared-models";

const CHOCOLATE_PIECES = [
  [-1.55, 0.65, 0.1, 0.32],
  [-1.25, -0.58, 0.55, -0.38],
  [1.48, 0.72, -0.16, -0.22],
  [1.34, -0.7, 0.25, 0.45],
] as const;

const PEANUTS = [
  [-0.92, 1.38, 0.25, -0.2],
  [0.98, 1.22, 0.18, 0.45],
  [1.72, -0.08, -0.25, -0.35],
] as const;

function PeanutHalf({
  position,
  rotation,
}: {
  position: readonly [number, number, number];
  rotation: number;
}) {
  return (
    <group position={[...position]} rotation={[0.3, rotation, 0.1]}>
      {[-0.16, 0.16].map((offset) => (
        <mesh castShadow key={offset} position={[offset, 0, 0]} scale={[1.15, 0.58, 0.72]}>
          <sphereGeometry args={[0.25, 18, 12]} />
          <meshStandardMaterial color="#c78b45" roughness={0.95} />
        </mesh>
      ))}
      <mesh position={[0, 0.15, 0.15]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.018, 0.018, 0.45, 8]} />
        <meshStandardMaterial color="#815129" roughness={1} />
      </mesh>
    </group>
  );
}

export function ChocolatePeanutButterScene({ paused }: FlavorSceneProps) {
  const group = useRef<Group>(null);
  const phase = useRef(0);
  const ribbons = useMemo(
    () => [
      new CatmullRomCurve3([
        new Vector3(-1.65, 1.1, 0.25),
        new Vector3(-0.85, 0.75, 0.92),
        new Vector3(0.05, 0.2, 1.18),
        new Vector3(0.88, 0.64, 0.88),
        new Vector3(1.62, 0.32, 0.22),
      ]),
      new CatmullRomCurve3([
        new Vector3(-1.5, -0.18, -0.22),
        new Vector3(-0.66, -0.58, 0.84),
        new Vector3(0.12, -0.82, 1.1),
        new Vector3(0.9, -0.42, 0.82),
        new Vector3(1.55, -0.76, -0.12),
      ]),
    ],
    [],
  );

  useFrame((_, delta) => {
    if (!paused && group.current) {
      phase.current += delta;
      group.current.rotation.y += delta * 0.038;
      group.current.rotation.z = Math.sin(phase.current * 0.48) * 0.012;
    }
  });

  return (
    <group ref={group}>
      <Jar color="#70442f" glassTint="#e8c9a8" topColor="#9b6a4a" />

      {ribbons.map((curve, index) => (
        <mesh castShadow key={index}>
          <tubeGeometry args={[curve, 76, index === 0 ? 0.16 : 0.13, 14, false]} />
          <meshPhysicalMaterial
            clearcoat={0.18}
            color={index === 0 ? "#5b2a19" : "#c27a2c"}
            roughness={index === 0 ? 0.48 : 0.36}
          />
        </mesh>
      ))}

      {CHOCOLATE_PIECES.map(([x, y, z, rotation], index) => (
        <mesh
          castShadow
          key={index}
          position={[x, y, z]}
          rotation={[rotation * 0.4, rotation, rotation * 0.7]}
        >
          <boxGeometry args={[0.46, 0.36, 0.18, 2, 2, 1]} />
          <meshStandardMaterial color="#4a2117" roughness={0.74} />
        </mesh>
      ))}

      {PEANUTS.map(([x, y, z, rotation], index) => (
        <PeanutHalf
          key={index}
          position={[x, y, z]}
          rotation={rotation}
        />
      ))}
    </group>
  );
}
