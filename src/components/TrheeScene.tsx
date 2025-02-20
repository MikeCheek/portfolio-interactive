import React from 'react';
import { Environment, OrbitControls, Stars } from '@react-three/drei';
import CharacterController from './CharacterController';
import Room from './Room';
import Domino from './Domino';
import Projects from './Projects';
import { Vector3 } from 'three';
import { TrafficSign } from './TrafficSign';
import Stairs from './Stairs';
import { GroundProvider } from '../utilities/GroundContext';

const ThreeScene: React.FC = () => {
  // useFrame((state, delta) => {
  //   easing.damp3(state.camera.position, [-state.pointer.x * 2, state.pointer.y + 1.5, 10], 0.3, delta); // Move camera
  // });
  const dev = !process.env.NODE_ENV || process.env.NODE_ENV === "development"
  return (
    <>
      <Environment preset="sunset" />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls
        maxPolarAngle={dev ? undefined : Math.PI / 2}
        minPolarAngle={dev ? undefined : Math.PI / 3}
      />

      <GroundProvider>
        <group position={[0, -1, 0]}>
          <Room />
          <Domino position={new Vector3(8, 0, 10)} />
          <Stairs position={new Vector3(5, -0.2, -8)} />
          <TrafficSign position={[-1, -0.5, -1]} scale={[0.7, 0.7, 0.7]} />
          <Projects position={new Vector3(-40, 0, -10)} />
          <CharacterController />
        </group>
      </GroundProvider>
    </>
  );
};

export default ThreeScene;
