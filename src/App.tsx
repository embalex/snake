import React, { useRef } from 'react';
import { Scene as SceneType } from 'three';

import { useGameLogic } from './gameLogic';
import { Info } from './Info';
import { Loading } from './Loading';
import { Scene } from './Scene';


export const App: React.FC = () => {
    const sceneRef = useRef<SceneType>(null);
    const { score, isLoading } = useGameLogic(sceneRef);

    return (
        <>
            {isLoading && <Loading />}
            {!isLoading && <Info score={score} />}
            <Scene ref={sceneRef} />
        </>
    );
};
