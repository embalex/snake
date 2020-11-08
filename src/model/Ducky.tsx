import React from 'react';

import { degToRad } from '../utils';
import { IModel } from './types';
import { useModel } from './useModel';
import { createAnimationConfig } from './utils';


export const Ducky: React.FC<IModel> = ({ position }) => {
    const duckyModelScene = useModel(
        '/models/ducky/scene.gltf',
        createAnimationConfig(0, 4),
    );

    return (
        <group position={[...position, 0]} dispose={null}>
            <mesh>
                <primitive
                    object={duckyModelScene}
                    rotation={[degToRad(90), 0, 0]}
                    position={[0, 0, 0.5]}
                    scale={[0.08, 0.08, 0.08]}
                />
            </mesh>
        </group>
    );
};
