import React from 'react';

import { degToRad } from '../utils';
import { IModel } from './types';
import { useModel } from './useModel';
import { createEmptyAnimationConfig } from './utils';


export const Bush: React.FC<IModel> = ({ position, angle }) => {
    const treesModelScene = useModel(
        'models/bush/scene.gltf',
        createEmptyAnimationConfig(),
    );

    return (
        <group
            position={[...position, 0]}
            rotation={[0, 0, angle]}
            dispose={null}
        >
            <mesh>
                <primitive
                    object={treesModelScene}
                    rotation={[degToRad(90), 0, 0]}
                    position={[0, 0, 0.2]}
                    scale={[0.04, 0.04, 0.04]}
                />
            </mesh>
        </group>
    );
};
