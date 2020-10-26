import React from 'react';
import { RepeatWrapping, TextureLoader } from 'three';

import grass from './grass.jpg';


export const Ground = () => {
    const texture = new TextureLoader().load(grass);
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    texture.repeat.set(240, 240);

    return (
        <mesh receiveShadow>
            <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
            <meshStandartMaterial map={texture} attach="material" color="green" />
        </mesh>
    );
};
