import React from 'react';

import { degToRad } from '../utils';
import { IModel } from './types';
import { useModel } from './useModel';
import { createEmptyAnimationConfig } from './utils';


export const PalmTree: React.FC<IModel> = ({ position, angle }) => {
    const treesModelScene = useModel(
        '/models/palmTree/scene.gltf',
        createEmptyAnimationConfig(),
    );

    return (
        <group
            position={[...position, 0]}
            dispose={null}
            rotation={[0, 0, angle]}
        >
            <mesh>
                <primitive
                    object={treesModelScene}
                    rotation={[degToRad(90), 0, 0]}
                    position={[0, 0, 0.8]}
                    scale={[80, 80, 80]}
                />
            </mesh>
        </group>
    );
};
