import React, { useEffect, useMemo } from 'react';
import { useLoader } from 'react-three-fiber';
import { RepeatWrapping, TextureLoader } from 'three';

import { FIELD_SIZE } from '../constants';
import { Model } from '../model';
import { getBushesPositions, getRandomPositions } from './utils';


const PLANET_SIZE = 50 * FIELD_SIZE;
const PALMS_AMOUNT = 60;
const BIG_TREES_AMOUNT = 60;
const BUSHES_AMOUNT = 1000;
const StuffComponent: React.FC = () => {
    const loadedTexture = useLoader(TextureLoader, '/textures/grass.jpg');
    useEffect(() => {
        loadedTexture.wrapS = RepeatWrapping;
        loadedTexture.wrapT = RepeatWrapping;
        loadedTexture.repeat.set(PLANET_SIZE, PLANET_SIZE);
    }, [loadedTexture]);

    const palmsPositions = useMemo(() => getRandomPositions(PALMS_AMOUNT, PLANET_SIZE, FIELD_SIZE), []);
    const bigTreesPositions = useMemo(() => getRandomPositions(BIG_TREES_AMOUNT, PLANET_SIZE, FIELD_SIZE), []);
    const bushesPositions = useMemo(() => getBushesPositions(BUSHES_AMOUNT, PLANET_SIZE, FIELD_SIZE), []);

    const renderObject = (positions: ReturnType<typeof getRandomPositions>, Component: React.ElementType) => (
        <>
            {positions.map(({ x, y, angle }) => (
                <Component key={`${x}${y}${angle}`} position={[x, y]} angle={angle} />
            ))}
        </>
    );

    return (
        <>
            <fog attach="fog" args={['black', FIELD_SIZE, PLANET_SIZE * 0.08]} />
            <mesh>
                <boxBufferGeometry
                    attach="geometry"
                    args={[PLANET_SIZE, PLANET_SIZE, 1]}
                />
                <meshStandardMaterial attach="material" color="green" map={loadedTexture} />
                {renderObject(palmsPositions, Model.PalmTree)}
                {renderObject(bigTreesPositions, Model.BigTree)}
                {renderObject(bushesPositions, Model.Bush)}
            </mesh>
        </>
    );
};

export const Ground = React.memo(StuffComponent);
