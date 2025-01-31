import { useState } from "react";
import { Text } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";

const CollidableText = ({ title }: { title: string }) => {
  const [glow, setGlow] = useState(false);

  return (
    <RigidBody
      type="dynamic"
      colliders="cuboid"
      position={[0, 0, -2.5]}
      onCollisionEnter={() => {
        setGlow(true);
        // setTimeout(() => setGlow(false), 500); // Reset glow after 0.5s
      }}
      onCollisionExit={() => {
        setGlow(false)
      }}
    >
      <CuboidCollider args={[5, 0.01, 1]} /> {/* Width = 5, Height = 10, Depth = 1 */}
      <Text rotation={[Math.PI / 2, Math.PI, 0]} maxWidth={10} textAlign="center">
        <meshStandardMaterial
          color="white"
          emissive={glow ? "yellow" : "black"}
          emissiveIntensity={glow ? 2 : 0}
          toneMapped={false} // Ensures emissive color stays bright
        />
        {title}
      </Text>
    </RigidBody>
  );
};

export default CollidableText;
