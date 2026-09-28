"use client";

import { Canvas } from "@react-three/fiber";
import type { ComponentType } from "react";
import type { Recipe } from "@/lib/recipes";
import type { FlavorSceneProps } from "./shared-models";
import { BlueberryLemonScene } from "./scenes/blueberry-lemon";
import { ChocolatePeanutButterScene } from "./scenes/chocolate-peanut-butter";
import { CinnamonHoneyScene } from "./scenes/cinnamon-honey";
import { StrawberryVanillaScene } from "./scenes/strawberry-vanilla";
import styles from "./scene.module.css";

type SceneCanvasProps = {
  mobile: boolean;
  paused: boolean;
  recipe: Recipe;
};

const SCENES: Record<Recipe["scene"]["composition"], ComponentType<FlavorSceneProps>> = {
  "berry-orbit": StrawberryVanillaScene,
  "citrus-current": BlueberryLemonScene,
  "cocoa-fold": ChocolatePeanutButterScene,
  "honey-ribbon": CinnamonHoneyScene,
};

export function SceneCanvas({ mobile, paused, recipe }: SceneCanvasProps) {
  const ActiveScene = SCENES[recipe.scene.composition];
  const particleCount = mobile
    ? recipe.scene.particleCount.mobile
    : recipe.scene.particleCount.desktop;

  return (
    <div aria-hidden="true" className={styles.canvasLayer}>
      <Canvas
        camera={{
          far: 30,
          fov: mobile ? 39 : 34,
          near: 0.1,
          position: [...recipe.scene.cameraPosition],
        }}
        dpr={mobile ? [1, 1.2] : [1, 1.5]}
        frameloop={paused ? "demand" : "always"}
        gl={{
          alpha: true,
          antialias: !mobile,
          powerPreference: mobile ? "low-power" : "high-performance",
        }}
        shadows={!mobile}
      >
        <ambientLight intensity={0.85} />
        <hemisphereLight
          args={[recipe.scene.keyLight, recipe.scene.fillLight, 1.45]}
        />
        <directionalLight
          castShadow={!mobile}
          color={recipe.scene.keyLight}
          intensity={2.5}
          position={[3.5, 4.5, 4]}
          shadow-mapSize-height={mobile ? 256 : 512}
          shadow-mapSize-width={mobile ? 256 : 512}
        />

        <ActiveScene
          particleCount={particleCount}
          paused={paused}
        />

        <mesh position={[0, -1.35, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[8, 8]} />
          <shadowMaterial opacity={0.2} transparent />
        </mesh>
      </Canvas>
    </div>
  );
}
