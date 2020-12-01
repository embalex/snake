import React, { Suspense, useRef } from 'react';
import { Canvas } from 'react-three-fiber';
import { PolarGridHelper } from 'react-three-fiber/components';
import { Sky } from 'drei';
import { Scene } from 'three';

import { Camera } from './camera';
import { NAME } from './constants';
import { useGameLogic } from './gameLogic';
import { Ground } from './Ground';
import { Model } from './model';
import { SceneHelperComponent } from './sceneHelper';
import { Snake } from './Snake';


export const App: React.FC = () => {
    const sceneRef = useRef<Scene>(null);
    useGameLogic(sceneRef);

    return (
        <Canvas color="red">
            <Camera />
            <PolarGridHelper
                args={[200, 16, 16, 64, 0x333333, 0x333333]}
                rotation={[Math.PI / 2, 0, 0]}
            />
            <ambientLight name={NAME.AmbientLight} intensity={1} />
            <Sky />
            <Suspense fallback={null}>
                <Ground />
                <Snake />
                <Model.Apple />
                <SceneHelperComponent ref={sceneRef} />
            </Suspense>
        </Canvas>
    );
};
