import React, { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import ThreeScene from './components/TrheeScene';
import { Physics } from '@react-three/rapier';
import { Controls } from './utilities/controls';
import { KeyboardControls, Loader } from '@react-three/drei';
import './App.css';
import { Analytics } from "@vercel/analytics/react"
import ControlsUI from './components/ControlsUI';
import JoystickControls from './components/Joystick';

function App() {
  const map = useMemo(
    () => [
      { name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
      { name: Controls.back, keys: ["ArrowDown", "KeyS"] },
      { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
      { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
      { name: Controls.jump, keys: ["Space"] },
      { name: Controls.shift, keys: ["Shift"] },
    ],
    []
  );

  const handleJoystickMove = (direction: string | null) => {
    // Stop movement when joystick is released
    if (!direction) {
      ["KeyW", "KeyS", "KeyA", "KeyD"].forEach((key) => {
        window.dispatchEvent(new KeyboardEvent("keyup", { key }));
      });
      return;
    }

    const keyMap: Record<"up" | "down" | "left" | "right", string> = {
      up: "KeyW",
      down: "KeyS",
      left: "KeyA",
      right: "KeyD",
    };

    if (direction in keyMap) {
      // Release all movement keys before pressing a new one
      Object.values(keyMap).forEach((key) => {
        window.dispatchEvent(new KeyboardEvent("keyup", { key }));
      });

      // Press the corresponding key
      window.dispatchEvent(new KeyboardEvent("keydown", { key: keyMap[direction as keyof typeof keyMap] }));
    }
  };

  return (
    <div className="App">
      <Analytics />
      <main className="App-main">
        <KeyboardControls map={map}>
          <Canvas shadows camera={{ position: [0, 6, 14], fov: 30 }}>
            <Suspense>
              <Physics debug={!process.env.NODE_ENV || process.env.NODE_ENV === "development"}>
                <ThreeScene />
              </Physics>
            </Suspense>
          </Canvas>
          <Loader />
        </KeyboardControls>
        <ControlsUI />
        <JoystickControls onMoveFunc={handleJoystickMove} />
      </main>
    </div>
  );
}

export default App;