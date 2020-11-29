import React, { Suspense, useRef } from 'react';
import { Canvas } from 'react-three-fiber';
import { PolarGridHelper } from 'react-three-fiber/components';
import { Sky } from 'drei';
import { Vector3 } from 'three';

import { Camera } from './camera';
import { useGameLogic } from './gameLogic';
import { Ground } from './Ground';
import { Model } from './model';
import { SceneHelperComponent } from './sceneHelper';
import { Snake } from './Snake';


export const App = () => {
    const sceneRef = useRef(null);
    useGameLogic(sceneRef);

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
                <Snake />
                <Model.Apple />
                <SceneHelperComponent ref={sceneRef} />
            </Suspense>
        </Canvas>
    );
};
