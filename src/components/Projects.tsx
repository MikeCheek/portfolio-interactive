import React from 'react';
import { projectsList } from '../utilities/info';
import { Television } from './Television';

const Projects = () => {
  return (
    <group position={[-20, 0, -10]}>
      {projectsList.map((project, key) => (
        <>
          <Television
            key={key}
            position={[(key % 3) * 15, 0, Math.floor(key / 3) * 15]}
            rotation={[0, Math.PI, 0]}
            imageUrl={project.image}
            title={project.title}
          />
        </>
      ))}
    </group>
  );
};

export default Projects;
