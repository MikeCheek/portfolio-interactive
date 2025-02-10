import { ContactShadows, Cylinder } from '@react-three/drei';
import { CuboidCollider, CylinderCollider, RigidBody } from '@react-three/rapier';
import React from 'react';

const color = '#232323';

const Room = () => {
  const dim = 70;
  return (
    <>
      <RigidBody colliders={false} type="fixed" name="void">
        <CuboidCollider position={[0, -3.5, 0]} args={[dim, 0.1, dim]} sensor />
      </RigidBody>
      <ContactShadows frames={1} position={[0, -0.88, 0]} scale={80} opacity={0.42} far={50} blur={0.8} color={color} />
      <Floor />
    </>
  );
};

const Floor = () => {
  const radius = 70;
  return (
    <RigidBody colliders={false} type="fixed" position={[0, -0.5, 0]} friction={2} name="floor">
      <CylinderCollider args={[1 / 2, radius]} />
      <Cylinder scale={[radius, 0.5, radius]} receiveShadow>
        <meshStandardMaterial color={color} />
      </Cylinder>
    </RigidBody>
  );
};

export default Room;
