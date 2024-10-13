import { Box } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import React from 'react';

const Domino = ({ x = 10, y = 0 }: { x?: number; y?: number }) => {
  return (
    <group position={[x, y, 0]}>
      {[...Array(10)].map((_, i) => (
        <Tile step={i} key={i} />
      ))}
    </group>
  );
};

const Tile = ({ step }: { step: number }) => {
  return (
    <RigidBody position={[step * 2, 0, 0]} name={'tile' + step}>
      <Box args={[0.2, 3, 1.5]}>
        <meshStandardMaterial color="mediumpurple" />
      </Box>
    </RigidBody>
  );
};

export default Domino;
