import React from 'react';
import { Canvas } from 'react-three-fiber';
import { Vector3 } from 'three';
// eslint-disable-next-line import/no-unresolved
import { Physics } from 'use-cannon';

import { Camera } from './Camera';
import { Ground } from './Ground';
import { Sky } from './Sky';


export const App: React.FC = () => (
    <Canvas>
        <Camera />
        <Sky sunPosition={new Vector3(100, 1, 100)} />
        <ambientLight intensity={0.3} />
        <pointLight
            castShadow
            intensity={0.8}
            position={new Vector3(100, 100, 100)}
        />
        <Physics gravity={[0, -30, 0]}>
            <Ground />
        </Physics>
    </Canvas>
);
