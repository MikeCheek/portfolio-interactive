import { Box, Text } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import React, { useState } from "react";
import { Euler, Vector3 } from "three";

const PATTERNS = ["straight", "zigzag", "circle", "spiral"]; // Sequence of formations
const DOMINO_COUNT = 30; // Adjust if needed
const SPACING = 1.5; // Adjust space between dominos
const TILT = 0.05; // Adds slight rotation for realism

const DominoScene = ({ position = new Vector3(0, 0, 0) }: { position?: Vector3 }) => {
  const [patternIndex, setPatternIndex] = useState(0); // Track pattern
  const currentPattern = PATTERNS[patternIndex];

  // 🔹 Change pattern on collision
  const changePattern = () => {
    setPatternIndex((prev) => (prev + 1) % PATTERNS.length);
  };

  return (
    <group position={position}>
      {/* Domino Formation */}
      <Domino key={patternIndex} pattern={currentPattern} />

      <RigidBody
        type="fixed" // Keep the "fixed" type for the body
        position={[0, 1, -4]} // Position in front of player
        colliders="cuboid"
        onCollisionEnter={({ other }) =>
          other.rigidBodyObject?.name === "character" ? changePattern() : null
        }
      >
        <Box args={[4, 2, 0.1]}>
          <meshStandardMaterial color="orange" />
        </Box>
        <Text position={[0, 0.2, 0.1]} fontSize={0.4} fontWeight={500} color="black">
          Pattern: {currentPattern.toUpperCase()}
        </Text>
        <Text position={[0, -0.5, 0.1]} fontSize={0.2} color="black">
          (Hit to change)
        </Text>
      </RigidBody>


    </group>
  );
};

const Domino = ({ pattern }: { pattern: string }) => {
  return (
    <group>
      {[...Array(DOMINO_COUNT)].map((_, i) => {
        const { position, rotation } = getPatternPosition(i, pattern, SPACING);
        return <Tile key={i} step={i} position={position} rotation={rotation} />;
      })}
    </group>
  );
};

const getPatternPosition = (index: number, type: string, spacing: number): { position: Vector3; rotation: Euler } => {
  let position = new Vector3();
  let rotation = new Euler(0, 0, (Math.random() - 0.5) * TILT); // Default slight tilt

  switch (type) {
    case "zigzag":
      position.set(
        (index % 2 === 0 ? 1 : -1) * spacing * (index / 2),
        1.5,
        (index % 2 === 0 ? -1 : 1) * spacing * (index / 3)
      );
      rotation.set(0, -Math.atan2(position.z, position.x), 0); // Face along movement direction
      break;

    case "circle":
      const angle = (index / DOMINO_COUNT) * Math.PI * 2; // Full circle
      // Reduce the radius to make the circle smaller (e.g., spacing * 5 instead of 10)
      position.set(
        Math.cos(angle) * spacing * 8,  // Adjusted to make it smaller
        1.5,
        Math.sin(angle) * spacing * 8   // Adjusted to make it smaller
      );
      rotation.set(0, Math.PI / 2 - angle, 0); // Perpendicular to circle
      break;

    case "spiral":
      const spiralAngle = index * 0.3;

      // Calculate distance using a formula where the distance decreases as index increases
      const distanceFromCenter = spacing * Math.pow(index, 0.5); // Increase the power for more spread-out tiles at the start

      position.set(
        Math.cos(spiralAngle) * distanceFromCenter,  // Make tiles farther apart in the center
        1.5,
        Math.sin(spiralAngle) * distanceFromCenter   // Tiles get closer as they move outward
      );

      rotation.set(0, Math.PI / 2 - spiralAngle, 0); // Follow spiral curve
      break;

    default: // Straight line
      position.set(index * spacing, 1.5, 0);
      break;
  }

  return { position, rotation };
}

const Tile = ({ step, position, rotation }: { step: number; position: Vector3; rotation: Euler }) => {
  return (
    <RigidBody
      position={position}
      rotation={rotation}
      mass={2}
      restitution={0.2}
      friction={0.5}
      angularDamping={0.3}
      linearDamping={0.1}
      name={"tile" + step}
    >
      <Box args={[0.2, 3, 1.5]}>
        <meshStandardMaterial color="mediumpurple" />
      </Box>
    </RigidBody>
  );
};

export default DominoScene;
