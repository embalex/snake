import React, { Suspense } from 'react';
import { Canvas } from 'react-three-fiber';
import { PolarGridHelper } from 'react-three-fiber/components';
import { Sky } from 'drei';
import { Vector3 } from 'three';
// eslint-disable-next-line import/no-unresolved
import { Physics } from 'use-cannon';

import { Camera, CameraHelper } from './camera';
import { Ground } from './Ground';
import { Model } from './model';


export const App = () => {
    const a = 1;

    return (
        <Canvas color="red">
            <Camera />
            <PolarGridHelper
                args={[200, 16, 16, 64, 0x333333, 0x333333]}
                rotation={[Math.PI / 2, 0, 0]}
            />
            <ambientLight intensity={1} />
            <pointLight position={[40, 40, 40]} />
            <Suspense fallback={null}>
                <Ground />
                <axesHelper />
                <Model.Magmacube position={[0, -3]} cubeNumber={3} />
                <Model.Magmacube position={[0, -2]} cubeNumber={2} />
                <Model.Magmacube position={[0, -1]} cubeNumber={1} />
                <Model.Magmacube position={[0, 0]} cubeNumber={0} />
                <Model.Ducky position={[0, 1]} />
                <Model.Apple position={[2, 2]} />
            </Suspense>
        </Canvas>
    );
};
