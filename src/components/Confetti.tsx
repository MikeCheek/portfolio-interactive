import React, { useEffect, useRef, useState } from 'react'
import { RigidBody } from '@react-three/rapier'
import { Vector3, Euler } from 'three'

const NUM_CONFETTI = 100
const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff']

const ConfettiPiece = ({ id, position, rotation, color }: { id: number, position: number[], rotation: number[], color: string }) => {
  const ref = useRef<any>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.applyImpulse(
        { x: (Math.random() - 0.5) * 2, y: 5, z: (Math.random() - 0.5) * 2 },
        true
      )
    }
  }, [])

  return (
    <RigidBody
      ref={ref}
      type="dynamic"
      angularVelocity={[Math.random() * 5, Math.random() * 5, Math.random() * 5]}
      colliders="ball" // ✅ Ensures proper physics collision
      position={new Vector3(...position)}
      rotation={new Euler(...rotation)}
      linearDamping={0.1}
      angularDamping={0.1}
      restitution={0.5} // ✅ Adds bounce effect
    >
      <mesh>
        <planeGeometry args={[0.2, 0.4]} />
        <meshStandardMaterial color={color} side={2} />
      </mesh>
    </RigidBody>
  )
}

const Confetti = ({ position = [0, 5, 0] }) => {
  const [confettiPieces, setConfettiPieces] = useState<
    { id: number; position: number[]; rotation: number[]; color: string }[]
  >([])

  useEffect(() => {
    const pieces = Array.from({ length: NUM_CONFETTI }, (_, i) => ({
      id: i,
      position: [
        position[0] + (Math.random() - 0.5) * 2,
        position[1] + Math.random() * 3,
        position[2] + (Math.random() - 0.5) * 2
      ],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
      color: colors[Math.floor(Math.random() * colors.length)]
    }))
    setConfettiPieces(pieces)
  }, [position])

  return (
    <group>
      {confettiPieces.map(({ id, position, rotation, color }) => (
        <ConfettiPiece key={id} id={id} position={position} rotation={rotation} color={color} />
      ))}
    </group>
  )
}

export default Confetti
