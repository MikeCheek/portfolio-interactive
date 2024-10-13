import React from 'react';
import { Environment } from '@react-three/drei';
import CharacterController from './CharacterController';
import Room from './Room';
import Domino from './Domino';
import Projects from './Projects';

const ThreeScene: React.FC = () => {
  return (
    <>
      <Environment preset="sunset" />
      <pointLight position={[10, 10, 10]} />

      <group position={[0, -1, 0]}>
        <Room />
        <Domino />
        <Projects />
        <CharacterController />
      </group>
    </>
  );
};

export default ThreeScene;
