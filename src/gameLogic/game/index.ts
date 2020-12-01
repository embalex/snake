import { MutableRefObject } from 'react';
import { AmbientLight, Scene } from 'three';

import { BLOCKED_ZONE_SIZE, NAME } from '../../constants';
import { sceneHelperUtil } from '../../sceneHelper';
import { isPositionInBlocked } from '../utils';
import { IPlainPosition } from './types';


const initBlockedArea = (): () => IPlainPosition[] => {
    const blockedArea: IPlainPosition[] = [];

    new Array(BLOCKED_ZONE_SIZE).fill(0).forEach((_, index) => {
        blockedArea.push({ x: BLOCKED_ZONE_SIZE / 2 - index, y: BLOCKED_ZONE_SIZE / 2 });
        blockedArea.push({ x: BLOCKED_ZONE_SIZE / 2 - index, y: -BLOCKED_ZONE_SIZE / 2 });
        blockedArea.push({ x: BLOCKED_ZONE_SIZE / 2, y: BLOCKED_ZONE_SIZE / 2 - index });
        blockedArea.push({ x: -BLOCKED_ZONE_SIZE / 2, y: BLOCKED_ZONE_SIZE / 2 - index });
    });

    return () => blockedArea;
};

const isGameOver = (snakeHead: IPlainPosition, snakeTail: IPlainPosition[], blockedArea: IPlainPosition[]) => (
    isPositionInBlocked(snakeHead, snakeTail) || isPositionInBlocked(snakeHead, blockedArea)
);

const gameEnd = (scene: Scene): void => {
    const ambientLight = sceneHelperUtil.getObject3DByName(scene, NAME.AmbientLight) as AmbientLight;
    ambientLight.intensity = 0;
};

const gameStart = (scene: Scene): void => {
    const ambientLight = sceneHelperUtil.getObject3DByName(scene, NAME.AmbientLight) as AmbientLight;
    ambientLight.intensity = 1;
};

type IGameBuilder = (scene: MutableRefObject<Scene>) => {
    step: (snakeHead: IPlainPosition, snakeTail:IPlainPosition []) => void,
    end: () => void;
    start: () => void;
    isContinued: () => boolean;
}

export const gameBuilder: IGameBuilder = (sceneRef: MutableRefObject<Scene>) => {
    const getBlockedArea = initBlockedArea();
    let isGameFinished = false;

    return {
        step: (snakeHead, snakeTail) => {
            isGameFinished = isGameOver(snakeHead, snakeTail, getBlockedArea());
            if (isGameFinished) {
                gameEnd(sceneRef.current);
            }
        },
        start: () => {
            isGameFinished = false;
            gameStart(sceneRef.current);
        },
        end: () => {
            isGameFinished = true;
            gameEnd(sceneRef.current);
        },
        isContinued: () => !isGameFinished,
    };
};
