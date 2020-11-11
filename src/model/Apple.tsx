import React from 'react';

import { degToRad } from '../utils';
import { IModel } from './types';
import { useModel } from './useModel';
import { createEmptyAnimationConfig } from './utils';


export const Apple: React.FC<IModel> = ({ position }) => {
    const appleModelScene = useModel(
        '/models/apple/scene.gltf',
        createEmptyAnimationConfig(),
    );

    return (
        <group position={[...position, 0]} dispose={null}>
            <mesh>
                <primitive
                    object={appleModelScene}
                    rotation={[degToRad(90), 0, 0]}
                    position={[0, 0, 0.8]}
                    scale={[0.00015, 0.00015, 0.00015]}
                />
            </mesh>
        </group>
    );
};
