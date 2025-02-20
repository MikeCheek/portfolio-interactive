import React, { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { CuboidCollider, RigidBody } from '@react-three/rapier'
import { Vector3 } from 'three'
import { Text } from '@react-three/drei'
import { useGround } from '../utilities/GroundContext'
import Confetti from './Confetti'

// A single stair that can disappear but keeps its collider and reacts to collisions
const Stair = ({
  x,
  y,
  z,
  disappearing = false,
  num,
  isWon,
  won
}: {
  x: number
  y: number
  z: number
  disappearing?: boolean
  num: number
  isWon: boolean
  won: () => void
}) => {
  const [visible, setVisible] = useState(true)
  const [color, setColor] = useState('orange') // Default color
  const rigidBodyRef = useRef<any>(null)
  const { isOnGround } = useGround()

  // If disappearing, toggle visibility randomly every 2 seconds.
  useEffect(() => {
    if (disappearing) {
      const interval = setInterval(() => {
        setVisible(Math.random() > 0.5) // 50% chance of disappearing
      }, 2000)
      return () => clearInterval(interval)
    }
  }, [disappearing])

  useEffect(() => {
    if (!isWon && isOnGround) setColor('orange')
  }, [isOnGround])

  return (
    <RigidBody
      ref={rigidBodyRef}
      type="fixed"
      position={[x, y, z]}
      friction={2}
      onCollisionEnter={() => {
        setColor('#aa5500')
        if (num === 10)
          won()
      }
      } // Darker color on collision
    // onCollisionExit={() => setColor('orange')} // Restore color when no collision
    >
      <CuboidCollider args={[1, 0.05, 1]} />
      <mesh visible={visible}>
        <boxGeometry args={[2, 0.1, 2]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <Text position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]} color="#644117">
        {num}
      </Text>
    </RigidBody>
  )
}

// An obstacle that moves in unique ways
const Obstacle = ({ x, y, z, movementType }: { x: number; y: number; z: number; movementType: number }) => {
  const rigidBodyRef = useRef<any>(null)

  useFrame((state) => {
    if (!rigidBodyRef.current) return
    const t = state.clock.elapsedTime

    let newX = x
    let newY = y
    let newZ = z

    switch (movementType) {
      case 0: // Circular path
        newX = x + Math.sin(t) * 1.5
        newZ = z + Math.cos(t) * 1.5
        break
      case 1: // Bouncing up and down
        newY = y + Math.sin(t * 3) * 1.2
        break
      case 2: // Zigzag movement
        newX = x + Math.sin(t * 2) * 2
        newZ = z + Math.cos(t * 3) * 1.5
        break
      case 3: // Rotating + back and forth
        newX = x + Math.sin(t) * 1
        rigidBodyRef.current.setNextKinematicRotation({ x: 0, y: t * 2, z: 0 }) // Rotating effect
        break
      default:
        break
    }

    // Apply movement update
    rigidBodyRef.current.setNextKinematicTranslation({ x: newX, y: newY, z: newZ })
  })

  return (
    <RigidBody ref={rigidBodyRef} type="kinematicPosition" position={[x, y, z]}>
      <CuboidCollider args={[0.25, 0.25, 0.25]} />
      <mesh>
        <boxGeometry args={[0.5, 0.5, 0.5]} /> {/* Smaller obstacle */}
        <meshStandardMaterial color="red" />
      </mesh>
    </RigidBody>
  )
}

// The Stairs group contains multiple stairs and moving obstacles
const Stairs = ({ position = new Vector3(5, -0.2, 5) }: { position?: Vector3 }) => {
  const [won, setWon] = useState(false)

  const stairs = [...new Array(10)].map((_, key) => {
    return {
      x: Math.sin(key) * 4,
      y: key / 3,
      z: Math.cos(key) * 4,
      disappearing: key % 3 === 0,
      num: key + 1
    }
  })

  return (
    <group position={position}>
      {
        won ? <Confetti position={[0, 5, 0]} /> : <></>
      }
      {/* Generate stairs */}
      {stairs.map((stair, index) => (
        <Stair key={index} isWon={won} won={() => setWon(true)} {...stair} />
      ))}

      {/* Place obstacles in between stairs */}
      {stairs.slice(0, -1).map((stair, index) => {
        const nextStair = stairs[index + 1]

        // Find the midpoint between two stairs to center the obstacle
        const midX = ((stair.x + nextStair.x) / 2) + position.x
        const midY = ((stair.y + nextStair.y) / 2) + position.y + 0.5 // Slightly raised
        const midZ = ((stair.z + nextStair.z) / 2) + position.z

        return <Obstacle key={`obs-${index}`} x={midX} y={midY} z={midZ} movementType={index % 4} />
      })}
    </group>
  )
}

export default Stairs
