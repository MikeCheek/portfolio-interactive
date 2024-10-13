import React, { useEffect, useRef, useState } from 'react';
import Character from './Character';
import { CapsuleCollider, RigidBody, vec3 } from '@react-three/rapier';
import { useKeyboardControls } from '@react-three/drei';
import { Controls, JUMP_FORCE, MAX_VEL, MOVEMENT_SPEED } from '../utilities/controls';
import { useFrame } from '@react-three/fiber';
import { Group, Vector3 } from 'three';

const CharacterController = () => {
  const jumpPressed = useKeyboardControls((state) => state[Controls.jump]);
  const leftPressed = useKeyboardControls((state) => state[Controls.left]);
  const rightPressed = useKeyboardControls((state) => state[Controls.right]);
  const backPressed = useKeyboardControls((state) => state[Controls.back]);
  const forwardPressed = useKeyboardControls((state) => state[Controls.forward]);

  const ref = useRef(null);
  const refCharacter = useRef<Group>(null);

  const [isOnFloor, setIsOnFloor] = useState<boolean>(true);

  useFrame((state) => {
    const impulse = { x: 0, y: 0, z: 0 };
    const obj: any | null = ref.current;
    if (!obj || !refCharacter.current) return;

    const linvel = obj.linvel();
    let changeRotation = false;

    if (jumpPressed && isOnFloor) {
      impulse.y += JUMP_FORCE;
      setIsOnFloor(false);
    }

    if (rightPressed && linvel.x < MAX_VEL) {
      impulse.x += MOVEMENT_SPEED;
      changeRotation = true;
    }
    if (leftPressed && linvel.x > -MAX_VEL) {
      impulse.x -= MOVEMENT_SPEED;
      changeRotation = true;
    }
    if (backPressed && linvel.z < MAX_VEL) {
      impulse.z += MOVEMENT_SPEED;
      changeRotation = true;
    }
    if (forwardPressed && linvel.z > -MAX_VEL) {
      impulse.z -= MOVEMENT_SPEED;
      changeRotation = true;
    }

    obj.applyImpulse(impulse, true);

    if (changeRotation) {
      const angle = Math.atan2(linvel.x, linvel.z);
      refCharacter.current.rotation.y = angle;
    }

    const characterWorldPosition = refCharacter.current.getWorldPosition(new Vector3());
    state.camera.position.x = characterWorldPosition.x;
    state.camera.position.z = characterWorldPosition.z + 14;

    const targetLookAt = new Vector3(characterWorldPosition.x, 0, characterWorldPosition.z);

    state.camera.lookAt(targetLookAt);
  });

  const resetPosition = () => {
    if (ref.current) {
      (ref.current as any).setTranslation(vec3({ x: 0, y: 0, z: 0 }));
      (ref.current as any).setLinvel(vec3({ x: 0, y: 0, z: 0 }));
    }
  };

  return (
    <group>
      <RigidBody //position={[0, 3, 0]}
        colliders={false}
        ref={ref}
        scale={[0.5, 0.5, 0.5]}
        enabledRotations={[false, false, false]}
        onCollisionEnter={() => setIsOnFloor(true)}
        onIntersectionEnter={({ other }) => {
          if (other.rigidBodyObject?.name === 'void') {
            resetPosition();
          }
        }}
      >
        <CapsuleCollider args={[0.8, 0.4]} position={[0, 1.2, 0]} />
        <group ref={refCharacter}>
          <Character />
        </group>
      </RigidBody>
    </group>
  );
};

export default CharacterController;
