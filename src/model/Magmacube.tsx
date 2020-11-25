import React from 'react';

import { degToRad } from '../utils';
import { IModel } from './types';
import { useModel } from './useModel';
import { createAnimationConfig } from './utils';


interface IProps {
    cubeNumber?: number;
}

const CUBE_ANIMATION_BASE_TIME_S = 0.1;
export const Magmacube: React.FC<IModel & IProps> = ({
    angle,
    cubeNumber = 0,
    name,
    position,
}) => {
    const magmacubeModelScene = useModel(
        '/models/magmacube/scene.gltf',
        createAnimationConfig(0, 1, cubeNumber * CUBE_ANIMATION_BASE_TIME_S),
    );

    return (
        <group
            name={name}
            position={[...position, 0]}
            rotation={[0, 0, angle]}
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
