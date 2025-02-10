import React from 'react';
import { projectsList } from '../utilities/info';
import { Television } from './Television';
import { Vector3 } from 'three';

const Projects = ({ position }: { position: Vector3 }) => {
  return (
    <group position={position}>
      {projectsList.map((project, key) => (
        <Television
          key={key}
          position={[(key % 3) * 15, 0, Math.floor(key / 3) * 15]}
          rotation={[0, Math.PI, 0]}
          imageUrl={project.image}
          title={project.title}
          description={project.description}
          href={project.href}
          github={project.github}
          videoUrl={project.video}
        />
      ))}
    </group>
  );
};

export default Projects;
