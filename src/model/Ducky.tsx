import React from 'react';

import { degToRad } from '../utils';
import { IModel } from './types';
import { useModel } from './useModel';
import { createAnimationConfig } from './utils';


export const Ducky = React.forwardRef<React.ReactNode, IModel>(({ position, angle }, ref) => {
    const duckyModelScene = useModel(
        '/models/ducky/scene.gltf',
        createAnimationConfig(0, 4),
    );

    return (
        <group
            ref={ref}
            position={[...position, 0]}
            dispose={null}
            rotation={[0, 0, angle]}
        >
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
});
