import { useEffect, useRef, useState } from 'react';
import { useFrame, useLoader, useThree } from 'react-three-fiber';
import { AnimationMixer } from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { IAnimation } from './types';
import { isWithoutAnimation } from './utils';


export const useModel = (url: string, animation: IAnimation): GLTF['scene'] => {
    const model = useLoader(GLTFLoader, url);
    const modelScene = model.scene.clone();
    const [mixer] = useState(() => new AnimationMixer(modelScene));
    const clockValueRef = useRef<number | null>(null);
    const { clock } = useThree();

    useEffect(() => {
        if (isWithoutAnimation(animation)) {
            return;
        }

        mixer.timeScale = animation.speed;
        const modelAnimation = model.animations[animation.number];
        modelAnimation && mixer.clipAction(modelAnimation).startAt(animation.offset).play();
    }, [model, mixer, animation]);

    useFrame(() => {
        const clockValue = clockValueRef.current;
        const elapsedTime = clock.getElapsedTime();
        const timeDelta = elapsedTime - (clockValue ?? 0);
        clockValueRef.current = elapsedTime;
        mixer.update(timeDelta);
        clock.getElapsedTime();
    });

    return modelScene;
};
