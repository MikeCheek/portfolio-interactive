import { ContactShadows, Plane, useEnvironment } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import React, { useMemo } from 'react';
import { Color, DoubleSide, ShaderMaterial } from 'three';
import { fragmentShader, vertexShader } from '../utilities/Shaders';

const color = '#232323';

const radius = 70;
const dim = radius * 1.5;
const floorDim = radius * 1.2

const Room = () => {
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
  const environmentMap = useEnvironment({ preset: 'sunset' })

  const waveShaderMaterial = useMemo(() => {
    return new ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uOpacity: { value: 0.8 },
        uEnvironmentMap: { value: environmentMap },
        uWavesAmplitude: { value: 0.3 },
        uWavesFrequency: { value: 1.5 },
        uWavesPersistence: { value: 0.3 },
        uWavesLacunarity: { value: 2.18 },
        uWavesIterations: { value: 8 },
        uWavesSpeed: { value: 0.2 },
        uTroughColor: { value: new Color('#186691') },
        uSurfaceColor: { value: new Color('#9bd8c0') },
        uPeakColor: { value: new Color('#bbd8e0') },
        uPeakThreshold: { value: 0.08 },
        uPeakTransition: { value: 0.05 },
        uTroughThreshold: { value: -0.01 },
        uTroughTransition: { value: 0.15 },
        uFresnelScale: { value: 0.8 },
        uFresnelPower: { value: 0.5 }
      },
      transparent: true,
      depthTest: true,
      side: DoubleSide,

    });
  }, [environmentMap]);

  useFrame(({ clock }) => {
    waveShaderMaterial.uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <RigidBody colliders={false} type="fixed" position={[0, -0.5, 0]} friction={2} name="floor">
      <CuboidCollider args={[floorDim, 0.1, floorDim]} position={[0, -0.4, 0]} />
      <Plane args={[floorDim * 2, floorDim * 2, 10]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <primitive object={waveShaderMaterial} />
      </Plane>
    </RigidBody>
  );
};

export default Room;