import React, { useState } from "react";
import { Text } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import PopUp from "./PopUp";

const CollidableText = ({ title, description, href, github }: { title: string; description?: string, href?: string, github?: string }) => {
  const [showPopup, setShowPopup] = useState<boolean>(false);

  return (
    <RigidBody
      type="dynamic"
      colliders="cuboid"
      position={[0, 0, -2.5]}
      onCollisionEnter={({ other }) => {
        if (other.rigidBodyObject?.name === 'character') setShowPopup(true)
      }}
      onCollisionExit={({ other }) => {
        if (other.rigidBodyObject?.name === 'character') setShowPopup(false)
      }}
    >
      <CuboidCollider args={[5, 0.01, 3]} />

      <Text rotation={[Math.PI / 2, Math.PI, 0]} maxWidth={10} textAlign="center">
        <meshStandardMaterial color="white" />
        {title}
      </Text>

      {showPopup ? (
        <PopUp title={title} description={description ?? ''} href={href} github={github} close={() => setShowPopup(false)} />
      ) : <></>}
    </RigidBody>
  );
};

export default CollidableText;
