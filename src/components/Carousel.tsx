import { Image, ImageProps, useTexture } from '@react-three/drei';
import { extend, GroupProps, ThreeEvent, useFrame } from '@react-three/fiber';
import React, { useRef, useState } from 'react';
import { easing } from 'maath';
import {
  BufferGeometry,
  DoubleSide,
  Group,
  Material,
  Mesh,
  NormalBufferAttributes,
  Object3DEventMap,
  RepeatWrapping,
} from 'three';
import '../utilities/geometry';
import { BentPlaneGeometry, MeshSineMaterial } from '../utilities/geometry';
import { projectsList } from '../utilities/info';
extend({ MeshSineMaterial, BentPlaneGeometry });

const Carousel = ({ radius = 1.4, count = 8 }: { radius?: number; count?: number }) => {
  return (
    <>
      <Rig rotation={[0, 0, 0.15]}>
        {projectsList.map((project, key) => (
          <Card
            key={key}
            url={project.image}
            position={[
              Math.sin((key / count) * Math.PI * 2) * radius,
              0,
              Math.cos((key / count) * Math.PI * 2) * radius,
            ]}
            rotation={[0, Math.PI + (key / count) * Math.PI * 2, 0]}
          />
        ))}
      </Rig>
      <Banner position={[0, -0.15, 0]} />
    </>
  );
};

const Rig = (props: GroupProps) => {
  const ref = useRef<Group<Object3DEventMap>>(null);
  useFrame((state, delta) => {
    if (ref.current) {
      if (ref.current.rotation) ref.current.rotation.y -= (delta / 10) % 360; // Rotate contents
      if (state.events.update) state.events.update(); // Raycasts every frame rather than on pointer-move
    }
  });
  return <group ref={ref} {...props} />;
};

function Card({ ...props }: ImageProps) {
  const ref = useRef<any>(null);
  const [hovered, hover] = useState(false);
  const pointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    hover(true);
  };
  const pointerOut = () => hover(false);
  useFrame((_state, delta) => {
    if (ref.current) {
      easing.damp3(ref.current.scale, hovered ? 1.15 : 1, 0.1, delta);
      easing.damp(ref.current.material, 'radius', hovered ? 0.25 : 0.1, 0.2, delta);
      easing.damp(ref.current.material, 'zoom', hovered ? 1 : 1.5, 0.2, delta);
    }
  });
  return (
    <Image ref={ref} transparent side={DoubleSide} onPointerOver={pointerOver} onPointerOut={pointerOut} {...props}>
      {/* @ts-ignore */}
      <bentPlaneGeometry args={[0.1, 1, 1, 20, 20]} />
    </Image>
  );
}

function Banner(props: JSX.IntrinsicElements['mesh']) {
  const ref = useRef<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>>(null);
  const texture = useTexture('/logo512.png');
  texture.wrapS = texture.wrapT = RepeatWrapping;
  useFrame((_state, delta) => {
    if (ref.current) {
      //@ts-ignore
      ref.current.material.time.value += Math.abs(delta / 10) * 4;
      //@ts-ignore
      ref.current.material.map.offset.x += delta / 2;
    }
  });
  return (
    <mesh ref={ref} {...props}>
      <cylinderGeometry args={[1.6, 1.6, 0.14, 128, 16, true]} />
      {/* @ts-ignore */}
      <meshSineMaterial map={texture} map-anisotropy={16} map-repeat={[30, 1]} side={DoubleSide} toneMapped={false} />
    </mesh>
  );
}

export default Carousel;
