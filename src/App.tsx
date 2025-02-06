import React, { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import ThreeScene from './components/TrheeScene';
import { Physics } from '@react-three/rapier';
import { Controls } from './utilities/controls';
import { KeyboardControls, Loader } from '@react-three/drei';
import './App.css';
import { Analytics } from "@vercel/analytics/react"

function App() {
  const map = useMemo(
    () => [
      { name: Controls.forward, keys: ['ArrowUp', 'KeyW'] },
      { name: Controls.back, keys: ['ArrowDown', 'KeyS'] },
      { name: Controls.left, keys: ['ArrowLeft', 'KeyA'] },
      { name: Controls.right, keys: ['ArrowRight', 'KeyD'] },
      { name: Controls.jump, keys: ['Space'] },
      { name: Controls.shift, keys: ['Shift'] },
    ],
    []
  );

  return (
    <div className="App">
      <Analytics />
      <main className="App-main">
        <KeyboardControls map={map}>
          <Canvas shadows camera={{ position: [0, 6, 14], fov: 30 }}>
            <Suspense>
              <Physics debug={!process.env.NODE_ENV || process.env.NODE_ENV === 'development'}>
                {/* <OrbitControls /> */}
                <ThreeScene />
              </Physics>
            </Suspense>
          </Canvas>
          <Loader />
        </KeyboardControls>
      </main>
    </div>
  );
}

export default App;

