import React from 'react';
import { Environment, OrbitControls, Stars } from '@react-three/drei';
import CharacterController from './CharacterController';
import Room from './Room';
import Domino from './Domino';
import Projects from './Projects';
import { Vector3 } from 'three';
// import Carousel from './Carousel';
// import { useFrame } from '@react-three/fiber';
// import { easing } from 'maath';

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
        maxPolarAngle={dev ? undefined : Math.PI / 2}  // Limit vertical rotation to not go upside down
        minPolarAngle={dev ? undefined : Math.PI / 3}  // Limit minimum vertical rotation
      />
      {/* <Carousel /> */}

      <group position={[0, -1, 0]}>
        <Room />
        <Domino />
        <Projects position={new Vector3(-30, 0, -30)} />
        <CharacterController />
      </group>
    </>
  );
};

export default ThreeScene;
