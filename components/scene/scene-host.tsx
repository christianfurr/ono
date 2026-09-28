"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { Recipe } from "@/lib/recipes";
import { SceneFallback } from "./scene-fallback";
import styles from "./scene.module.css";

const SceneCanvas = dynamic(
  () => import("./scene-canvas").then((module) => module.SceneCanvas),
  { ssr: false },
);

type SceneHostProps = {
  recipe: Recipe;
};

type SceneCapability = {
  canAnimate: boolean;
  mobile: boolean;
};

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    const options = { failIfMajorPerformanceCaveat: true };
    const context = (canvas.getContext("webgl2", options) ??
      canvas.getContext("webgl", options)) as
      | WebGL2RenderingContext
      | WebGLRenderingContext
      | null;

    context?.getExtension("WEBGL_lose_context")?.loseContext();
    return context !== null;
  } catch {
    return false;
  }
}

export function SceneHost({ recipe }: SceneHostProps) {
  const [capability, setCapability] = useState<SceneCapability>({
    canAnimate: false,
    mobile: false,
  });
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compactScreen = window.matchMedia(
      "(max-width: 720px), (pointer: coarse)",
    );
    const webGLAvailable = supportsWebGL();

    const updateCapability = () => {
      setCapability({
        canAnimate: webGLAvailable && !reducedMotion.matches,
        mobile: compactScreen.matches,
      });
    };

    updateCapability();
    reducedMotion.addEventListener("change", updateCapability);
    compactScreen.addEventListener("change", updateCapability);

    return () => {
      reducedMotion.removeEventListener("change", updateCapability);
      compactScreen.removeEventListener("change", updateCapability);
    };
  }, []);

  return (
    <div
      className={styles.host}
      data-scene={recipe.scene.composition}
      style={{ backgroundColor: recipe.palette.paper }}
    >
      <SceneFallback recipe={recipe} />

      {capability.canAnimate ? (
        <SceneCanvas
          mobile={capability.mobile}
          paused={paused}
          recipe={recipe}
        />
      ) : null}

      {capability.canAnimate ? (
        <button
          aria-label={paused ? "Resume scene motion" : "Pause scene motion"}
          aria-pressed={paused}
          className={styles.motionControl}
          onClick={() => setPaused((current) => !current)}
          type="button"
        >
          <span aria-hidden="true" className={styles.controlMark} />
          <span aria-hidden="true">{paused ? "Resume motion" : "Pause motion"}</span>
        </button>
      ) : null}
    </div>
  );
}
