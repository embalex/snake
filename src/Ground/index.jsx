import React from 'react';
import { useLoader } from 'react-three-fiber';
import { RepeatWrapping, TextureLoader } from 'three';

import { FIELD_SIZE } from '../constants';
import { degToRad } from '../utils';
// eslint-disable-next-line import/no-unresolved
import grass from './grass.jpg';


export const Ground = () => {
    const loadedTexture = useLoader(TextureLoader, grass);
    loadedTexture.wrapS = RepeatWrapping;
    loadedTexture.wrapT = RepeatWrapping;
    loadedTexture.repeat.set(FIELD_SIZE, FIELD_SIZE);

    return (
        <mesh>
            <boxBufferGeometry
                attach="geometry"
                args={[FIELD_SIZE, FIELD_SIZE, 1]}
                // args={[1, 1, 1]}
            />
            <meshStandardMaterial attach="material" color="green" map={loadedTexture} />
        </mesh>
    );
};
