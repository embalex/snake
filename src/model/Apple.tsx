import React from 'react';

import { NAME } from '../constants';
import { degToRad } from '../utils';
import { useModel } from './useModel';
import { createEmptyAnimationConfig } from './utils';


export const Apple: React.FC = () => {
    const appleModelScene = useModel(
        'models/apple/scene.gltf',
        createEmptyAnimationConfig(),
    );

    return (
        <group
            name={NAME.Apple}
            position={[0, 0, -100]}
            dispose={null}
        >
            <mesh>
                <primitive
                    object={appleModelScene}
                    rotation={[degToRad(90), 0, 0]}
                    position={[0, -0.2, 0.8]}
                    scale={[0.00015, 0.00015, 0.00015]}
                />
            </mesh>
        </group>
    );
};
