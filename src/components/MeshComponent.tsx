import { useLoader } from '@react-three/fiber';
import React, { useRef } from 'react';
import { Mesh } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const MeshComponent = () => {
  const fileUrl = '/assets/models/duck/Duck.gltf';
  const mesh = useRef<Mesh>(null!);
  const gltf = useLoader(GLTFLoader, fileUrl);

  return (
    <mesh ref={mesh} rotation={[0, -Math.PI / 2, 0]} castShadow>
      <primitive object={gltf.scene} />
    </mesh>
  );
};

export default MeshComponent;
