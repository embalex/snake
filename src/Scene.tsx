import React, { forwardRef, Suspense } from 'react';
import { Canvas } from 'react-three-fiber';
import { Sky } from 'drei';
import { Scene as SceneType } from 'three';

import { Camera } from './camera';
import { NAME } from './constants';
import { Ground } from './Ground';
import { Model } from './model';
import { SceneHelperComponent } from './sceneHelper';
import { Snake } from './Snake';


const SceneComponent = forwardRef<SceneType>((props, sceneRef) => (
    <Canvas color="red">
        <Camera />
        <ambientLight name={NAME.AmbientLight} intensity={1} />
        <Sky />
        <Suspense fallback={null}>
            <Ground />
            <Snake />
            <Model.Apple />
            <SceneHelperComponent ref={sceneRef} />
        </Suspense>
    </Canvas>
));

export const Scene = React.memo(SceneComponent);
