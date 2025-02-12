import React from 'react';
import { projectsList } from '../utilities/info';
import { Television } from './Television';
import { Vector3 } from 'three';

const Projects = ({ position }: { position: Vector3 }) => {
  return (
    <group position={position}>
      {projectsList.map((project, key) => {
        const row = Math.floor(key / 3)
        const isEvenRow = row % 2 === 0
        const xOffset = isEvenRow ? -5 : 0
        const yOffset = (row % 2 ? 1 : -1) * (key % 2 ? -1 : 2)

        return <Television
          key={key}
          position={[((key % 3) * 15) + xOffset, 0, (row * 20) + yOffset]}
          rotation={[0, Math.PI, 0]}
          imageUrl={project.image}
          title={project.title}
          description={project.description}
          href={project.href}
          github={project.github}
          videoUrl={project.video}
        />
      })}
    </group>
  );
};

export default Projects;
