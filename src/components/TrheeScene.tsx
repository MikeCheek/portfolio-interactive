import React from 'react';
import { Environment } from '@react-three/drei';
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
  return (
    <>
      <Environment preset="sunset" />
      <pointLight position={[10, 10, 10]} />
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
