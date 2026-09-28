import type { ReactNode } from "react";
import { DoubleSide } from "three";

export type FlavorSceneProps = {
  particleCount: number;
  paused: boolean;
};

type OatSurfaceProps = {
  color?: string;
  topColor?: string;
};

type JarProps = OatSurfaceProps & {
  children?: ReactNode;
  glassTint?: string;
};

const OAT_FLECKS = [
  [-0.48, 0.38, -0.18, 0.08],
  [-0.25, 0.39, 0.4, -0.25],
  [0.04, 0.39, -0.52, 0.4],
  [0.27, 0.39, 0.29, -0.4],
  [0.51, 0.38, -0.03, 0.12],
  [-0.12, 0.4, 0.08, -0.55],
  [0.38, 0.39, -0.38, 0.65],
] as const;

export function OatSurface({
  color = "#d8c19c",
  topColor = "#ead8b7",
}: OatSurfaceProps) {
  return (
    <group>
      <mesh castShadow position={[0, -0.39, 0]} receiveShadow>
        <cylinderGeometry args={[0.87, 0.83, 1.46, 48]} />
        <meshStandardMaterial color={color} roughness={0.88} />
      </mesh>
      <mesh position={[0, 0.34, 0]} receiveShadow>
        <cylinderGeometry args={[0.87, 0.87, 0.07, 48]} />
        <meshStandardMaterial color={topColor} roughness={0.95} />
      </mesh>
      {OAT_FLECKS.map(([x, y, z, rotation], index) => (
        <mesh
          key={index}
          position={[x, y, z]}
          rotation={[0, rotation, 0]}
          scale={[1.35, 0.2, 0.58]}
        >
          <sphereGeometry args={[0.1, 10, 6]} />
          <meshStandardMaterial color="#f3e4c9" roughness={1} />
        </mesh>
      ))}
    </group>
  );
}

export function Jar({
  children,
  color,
  glassTint = "#fff8ed",
  topColor,
}: JarProps) {
  return (
    <group>
      <OatSurface color={color} topColor={topColor} />
      {children}

      <mesh castShadow renderOrder={3}>
        <cylinderGeometry args={[1.01, 0.94, 2.55, 64, 1, true]} />
        <meshPhysicalMaterial
          color={glassTint}
          depthWrite={false}
          opacity={0.34}
          roughness={0.16}
          side={DoubleSide}
          thickness={0.18}
          transparent
          transmission={0.5}
        />
      </mesh>

      <mesh position={[0, -1.27, 0]} renderOrder={3}>
        <cylinderGeometry args={[0.94, 0.91, 0.09, 64]} />
        <meshPhysicalMaterial
          color={glassTint}
          opacity={0.48}
          roughness={0.2}
          transparent
        />
      </mesh>

      {[-1, 1].map((direction) => (
        <mesh key={direction} position={[0, 1.18 + direction * 0.08, 0]}>
          <torusGeometry args={[0.98, 0.045, 10, 64]} />
          <meshStandardMaterial
            color="#f7efe2"
            metalness={0.03}
            opacity={0.72}
            roughness={0.22}
            transparent
          />
        </mesh>
      ))}
    </group>
  );
}
