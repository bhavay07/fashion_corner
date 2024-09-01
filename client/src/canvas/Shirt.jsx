import React, { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { useGLTF, useTexture, Decal } from '@react-three/drei';
import state from '../store';

const Shirt = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF('/shirt_baked.glb');
  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  useEffect(() => {
    if (materials.lambert1) {
      materials.lambert1.color.setStyle(snap.color);
    }
  }, [snap.color, materials.lambert1]);

  return (
    <group key={snap.color}>
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        roughness={1}
      >
        {snap.isFullTexture && fullTexture && (
          <Decal 
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}  // Adjust rotation as needed
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
