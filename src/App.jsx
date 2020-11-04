import React, { Suspense } from 'react';
import { Canvas } from 'react-three-fiber';
import { PolarGridHelper } from 'react-three-fiber/components';
import { Sky } from 'drei';
import { Vector3 } from 'three';
import * as THREE from 'three/src/Three';
// eslint-disable-next-line import/no-unresolved
import { Physics } from 'use-cannon';

import { Camera, CameraHelper } from './camera';
import { Ground } from './Ground';



export const App = () => {
    const a = 1;

    return (
        <Canvas color="red">
            <Camera />
            <CameraHelper />
            <PolarGridHelper
                args={[200, 16, 16, 64, 0x333333, 0x333333]}
                rotation={[Math.PI / 2, 0, 0]}
            />
            <ambientLight intensity={20} />
            <Suspense fallback={null}>
                <Ground />
                <axesHelper />
            </Suspense>
        </Canvas>
    );
};
