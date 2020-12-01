import React from 'react';

import { degToRad } from '../utils';
import { useModel } from './useModel';
import { createAnimationConfig } from './utils';


interface IProps {
    name: string;

    cubeNumber?: number;
}

const CUBE_ANIMATION_BASE_TIME_S = 0.1;
export const Magmacube: React.FC<IProps> = ({ cubeNumber = 0, name }) => {
    const magmacubeModelScene = useModel(
        '/models/magmacube/scene.gltf',
        createAnimationConfig(0, 1, cubeNumber * CUBE_ANIMATION_BASE_TIME_S),
    );

    return (
        <group
            name={name}
            position={[0, 0, -100]}
        >
            <primitive
                object={magmacubeModelScene}
                rotation={[degToRad(90), degToRad(180), 0]}
                position={[0, 0, 0.9]}
                scale={[0.1, 0.1, 0.1]}
            />
        </group>
    );
};
