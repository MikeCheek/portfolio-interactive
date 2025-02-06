import { useRef, useState } from "react";
import { CapsuleCollider, RigidBody, vec3 } from "@react-three/rapier";
import { useKeyboardControls } from "@react-three/drei";
import { Controls, JUMP_FORCE, MAX_VEL, MOVEMENT_SPEED } from "../utilities/controls";
import { useFrame } from "@react-three/fiber";
import { Group, Vector3 } from "three";
import MeshComponent from "./MeshComponent";

const CharacterController = () => {
  const jumpPressed = useKeyboardControls((state) => state[Controls.jump]);
  const leftPressed = useKeyboardControls((state) => state[Controls.left]);
  const rightPressed = useKeyboardControls((state) => state[Controls.right]);
  const backPressed = useKeyboardControls((state) => state[Controls.back]);
  const forwardPressed = useKeyboardControls((state) => state[Controls.forward]);
  const shiftPressed = useKeyboardControls((state) => state[Controls.shift]); // Detect Shift Key

  const ref = useRef(null);
  const refCharacter = useRef<Group>(null);

  const [isOnFloor, setIsOnFloor] = useState<boolean>(true);

  useFrame((state) => {
    const impulse = { x: 0, y: 0, z: 0 };
    const obj: any | null = ref.current;
    if (!obj || !refCharacter.current) return;

    const linvel = obj.linvel();
    let changeRotation = false;

    const speedMultiplier = shiftPressed ? 1.5 : 1; // Double speed when Shift is pressed
    const adjustedSpeed = MOVEMENT_SPEED * speedMultiplier;
    const maxVelocity = MAX_VEL * speedMultiplier;

    if (jumpPressed && isOnFloor) {
      impulse.y += JUMP_FORCE;
      setIsOnFloor(false);
    }

    if (rightPressed && linvel.x < maxVelocity) {
      impulse.x += adjustedSpeed;
      changeRotation = true;
    }
    if (leftPressed && linvel.x > -maxVelocity) {
      impulse.x -= adjustedSpeed;
      changeRotation = true;
    }
    if (backPressed && linvel.z < maxVelocity) {
      impulse.z += adjustedSpeed;
      changeRotation = true;
    }
    if (forwardPressed && linvel.z > -maxVelocity) {
      impulse.z -= adjustedSpeed;
      changeRotation = true;
    }

    if (impulse.x !== 0 && impulse.z !== 0) {
      impulse.x /= 2;
      impulse.z /= 2;
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
      <RigidBody
        colliders={false}
        ref={ref}
        name="character"
        scale={[0.5, 0.5, 0.5]}
        enabledRotations={[false, false, false]}
        onCollisionEnter={({ other }) => {
          if (other.rigidBodyObject?.name === "floor") setIsOnFloor(true);
        }}
        onIntersectionEnter={({ other }) => {
          if (other.rigidBodyObject?.name === "void") {
            resetPosition();
          }
        }}
      >
        <group ref={refCharacter}>
          <CapsuleCollider args={[0.2, 0.8]} position={[0, 0.9, 0]} />
          <MeshComponent />
        </group>
      </RigidBody>
    </group>
  );
};

export default CharacterController;
