import React, { Suspense, useRef } from 'react';
import { Canvas } from 'react-three-fiber';
import { PolarGridHelper } from 'react-three-fiber/components';
import { Sky } from 'drei';
import { Vector3 } from 'three';

import { Camera } from './camera';
import { FIELD_SIZE } from './constants';
import { useGameLogic } from './gameLogic';
import { Ground } from './Ground';
import { Model } from './model';
import { Snake } from './Snake';


export const App = () => {
    const snakeRef = useRef(null);
    useGameLogic(snakeRef);

    const halfFieldSize = FIELD_SIZE / 2;

    return (
        <Canvas color="red">
            <Camera />
            <PolarGridHelper
                args={[200, 16, 16, 64, 0x333333, 0x333333]}
                rotation={[Math.PI / 2, 0, 0]}
            />
            <ambientLight intensity={1} />
            <Sky sunPosition={new Vector3(100, 10, 100)} />
            <Suspense fallback={null}>
                <Ground />
                <Snake ref={snakeRef} magmacubes={[]} />
                <Model.Apple position={[-halfFieldSize, -halfFieldSize]} />
                <Model.Apple position={[-halfFieldSize, halfFieldSize]} />
                <Model.Apple position={[halfFieldSize, -halfFieldSize]} />
                <Model.Apple position={[halfFieldSize, halfFieldSize]} />
            </Suspense>
        </Canvas>
    );
};
