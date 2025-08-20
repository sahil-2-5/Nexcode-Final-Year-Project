import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export default function Model(props) {
  const group = useRef();
  
  // Load the GLTF model
  const { nodes, materials, animations } = useGLTF('/blurobject/blueobj.gltf');
  
  // Initialize animations using the useAnimations hook
  const { actions, names } = useAnimations(animations, group);

 

  // Continuously rotate the group using useFrame
  useFrame(() => {
    group.current.rotation.y = 90 ;
    if (group.current) {
      // Rotate the group along the Y-axis continuously
      group.current.rotation.x += 0.01;
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.object_004_Retopo_default_0.geometry} material={materials['default']} />
    </group>
  );
}

// Preload the GLTF model
useGLTF.preload('/blurobject/blueobj.gltf');
