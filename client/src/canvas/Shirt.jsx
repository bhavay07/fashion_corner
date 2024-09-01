import React from 'react';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Decal, useGLTF, useTexture } from '@react-three/drei';
import state from '../store';
const Shirt = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF('/shirt_baked.glb');
  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);
  useFrame((state, delta) => {
    if (true) {
      //easing.dampC(materials.lambert1.color, snap.color, 0.25, delta);
      materials.lambert1.color.set('blue'); // Set to any color you want

    }
     else {
      console.warn('Material "lambert1" not found');
    }
  });
  console.log('Materials:', materials,snap.color);

  const stateString = JSON.stringify(snap);
  return (
    <group>
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        roughness={1}
      >
        {snap.isFullTexture && fullTexture && (
          <Decal 
            position={[0, 0, 0]}
            rotation={[12, 12, 31]}
            scale={1}
            map={fullTexture}
            depthTest={false}
            depthWrite={true}
          />
        )}
        {snap.isLogoTexture && logoTexture && (
          <Decal 
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
            mapAnisotropy={16} 
            depthTest={false}
            depthWrite={true}
          />
        )}
      </mesh>
    </group>
  );
}
export default Shirt;