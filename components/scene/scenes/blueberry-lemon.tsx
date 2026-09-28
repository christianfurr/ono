import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { CatmullRomCurve3, Vector3, type Group } from "three";
import { Jar, type FlavorSceneProps } from "../shared-models";

const BERRIES = [
  [-1.42, -0.52, 0.28, 0.36],
  [-1.52, 0.52, -0.1, 0.3],
  [-0.86, 1.4, 0.12, 0.27],
  [0.82, 1.34, -0.24, 0.32],
  [1.48, 0.42, 0.18, 0.38],
  [1.35, -0.7, -0.06, 0.3],
] as const;

function CrownedBerry({
  position,
  radius,
}: {
  position: readonly [number, number, number];
  radius: number;
}) {
  return (
    <group position={[...position]}>
      <mesh castShadow>
        <sphereGeometry args={[radius, 22, 16]} />
        <meshStandardMaterial color="#34417e" roughness={0.68} />
      </mesh>
      {[0, 1, 2, 3, 4].map((index) => {
        const angle = (index / 5) * Math.PI * 2;
        return (
          <mesh
            key={index}
            position={[
              Math.cos(angle) * radius * 0.22,
              radius * 0.83,
              Math.sin(angle) * radius * 0.22,
            ]}
            rotation={[Math.PI / 2, 0, -angle]}
            scale={[1, 0.34, 0.72]}
          >
            <coneGeometry args={[radius * 0.2, radius * 0.38, 6]} />
            <meshStandardMaterial color="#1d285e" roughness={0.9} />
          </mesh>
        );
      })}
    </group>
  );
}

export function BlueberryLemonScene({ paused }: FlavorSceneProps) {
  const group = useRef<Group>(null);
  const phase = useRef(0);
  const lemonSpiral = useMemo(() => {
    const points = Array.from({ length: 34 }, (_, index) => {
      const t = index / 33;
      const angle = t * Math.PI * 4.4;
      const radius = 1.5 - t * 0.22;
      return new Vector3(
        Math.cos(angle) * radius,
        1.45 - t * 2.5,
        Math.sin(angle) * radius * 0.54,
      );
    });
    return new CatmullRomCurve3(points);
  }, []);

  useFrame((_, delta) => {
    if (!paused && group.current) {
      phase.current += delta;
      group.current.rotation.y -= delta * 0.05;
      group.current.position.y = Math.sin(phase.current * 0.62 + 2) * 0.035;
    }
  });

  return (
    <group ref={group}>
      <Jar color="#7680a9" glassTint="#f1edbd" topColor="#aab0c5" />

      <mesh castShadow>
        <tubeGeometry args={[lemonSpiral, 128, 0.065, 10, false]} />
        <meshPhysicalMaterial
          clearcoat={0.28}
          color="#e6cc3d"
          roughness={0.48}
        />
      </mesh>

      {BERRIES.map(([x, y, z, radius], index) => (
        <CrownedBerry
          key={index}
          position={[x, y, z]}
          radius={radius}
        />
      ))}
    </group>
  );
}
