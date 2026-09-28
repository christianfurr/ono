import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  CatmullRomCurve3,
  Color,
  Vector3,
  type Group,
  type ShaderMaterial,
} from "three";
import { Jar, type FlavorSceneProps } from "../shared-models";

const BARK_PATHS = [
  [
    [-1.72, -0.9, 0.15],
    [-1.45, -0.4, 0.35],
    [-1.68, 0.1, 0.28],
    [-1.38, 0.62, 0.02],
    [-1.56, 1.04, -0.12],
  ],
  [
    [1.58, -0.72, -0.15],
    [1.36, -0.2, 0.18],
    [1.6, 0.25, 0.2],
    [1.32, 0.76, -0.06],
  ],
] as const;

function PowderPlume({ count, paused }: { count: number; paused: boolean }) {
  const material = useRef<ShaderMaterial>(null);
  const { positions, scales } = useMemo(() => {
    const positionValues = new Float32Array(count * 3);
    const scaleValues = new Float32Array(count);

    for (let index = 0; index < count; index += 1) {
      const t = count === 1 ? 0 : index / (count - 1);
      const angle = index * 2.399963;
      const radius = 0.12 + t * 0.52;
      positionValues[index * 3] = 0.38 + Math.cos(angle) * radius;
      positionValues[index * 3 + 1] = 0.42 + t * 1.45;
      positionValues[index * 3 + 2] = 0.45 + Math.sin(angle) * radius * 0.7;
      scaleValues[index] = 0.55 + ((index * 37) % 41) / 55;
    }

    return { positions: positionValues, scales: scaleValues };
  }, [count]);
  const uniforms = useMemo(
    () => ({ uColor: { value: new Color("#d8842d") }, uTime: { value: 0 } }),
    [],
  );

  useFrame((_, delta) => {
    if (!paused && material.current) {
      material.current.uniforms.uTime.value += delta;
    }
  });

  return (
    <points frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={material}
        depthWrite={false}
        fragmentShader={`
          uniform vec3 uColor;
          varying float vAlpha;
          void main() {
            float circle = 1.0 - smoothstep(0.16, 0.5, distance(gl_PointCoord, vec2(0.5)));
            gl_FragColor = vec4(uColor, circle * vAlpha * 0.72);
          }
        `}
        transparent
        uniforms={uniforms}
        vertexShader={`
          uniform float uTime;
          attribute float aScale;
          varying float vAlpha;
          void main() {
            vec3 animated = position;
            animated.x += sin(uTime * 0.65 + position.y * 4.0) * 0.035;
            animated.y += sin(uTime * 0.45 + position.x * 5.0) * 0.025;
            vec4 viewPosition = modelViewMatrix * vec4(animated, 1.0);
            gl_Position = projectionMatrix * viewPosition;
            gl_PointSize = (10.0 * aScale) / max(1.0, -viewPosition.z);
            vAlpha = 1.0 - smoothstep(0.4, 2.05, animated.y);
          }
        `}
      />
    </points>
  );
}

export function CinnamonHoneyScene({ particleCount, paused }: FlavorSceneProps) {
  const group = useRef<Group>(null);
  const phase = useRef(0);
  const honeyCurve = useMemo(
    () =>
      new CatmullRomCurve3([
        new Vector3(-1.45, 1.15, 0.32),
        new Vector3(-0.72, 0.98, 0.84),
        new Vector3(0.05, 0.68, 1.12),
        new Vector3(0.92, 0.35, 0.82),
        new Vector3(1.42, -0.12, 0.32),
      ]),
    [],
  );
  const barkCurves = useMemo(
    () =>
      BARK_PATHS.map(
        (path) =>
          new CatmullRomCurve3(
            path.map(([x, y, z]) => new Vector3(x, y, z)),
          ),
      ),
    [],
  );

  useFrame((_, delta) => {
    if (!paused && group.current) {
      phase.current += delta;
      group.current.rotation.y += delta * 0.055;
      group.current.position.y = Math.sin(phase.current * 0.65) * 0.035;
    }
  });

  return (
    <group ref={group}>
      <Jar color="#c6945e" glassTint="#ffdca8" topColor="#e4bd7d" />

      <mesh castShadow>
        <tubeGeometry args={[honeyCurve, 72, 0.105, 12, false]} />
        <meshPhysicalMaterial
          color="#efa82f"
          emissive="#7c2f08"
          emissiveIntensity={0.12}
          roughness={0.24}
          thickness={0.5}
          transmission={0.08}
        />
      </mesh>

      {barkCurves.map((curve, index) => (
        <mesh castShadow key={index}>
          <tubeGeometry args={[curve, 56, 0.075, 8, false]} />
          <meshStandardMaterial color={index ? "#7e321b" : "#9d4724"} roughness={0.92} />
        </mesh>
      ))}

      <PowderPlume count={particleCount} paused={paused} />
    </group>
  );
}
