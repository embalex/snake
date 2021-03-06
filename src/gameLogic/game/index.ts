import { RefObject } from 'react';
import { AmbientLight, Scene } from 'three';

import { BLOCKED_ZONE_SIZE, FIELD_SIZE, NAME } from '../../constants';
import { sceneHelperUtil } from '../../sceneHelper';
import { isPositionInBlocked } from '../utils';
import { IPlainPosition } from './types';


const initBlockedArea = (): () => IPlainPosition[] => {
    const blockedArea: IPlainPosition[] = [];
    const centerOfArea = FIELD_SIZE / 2;

    new Array(BLOCKED_ZONE_SIZE).fill(0).forEach((_, index) => {
        const changingCoordinate = centerOfArea - BLOCKED_ZONE_SIZE / 2 + index;

        blockedArea.push({ x: changingCoordinate, y: centerOfArea + BLOCKED_ZONE_SIZE / 2 });
        blockedArea.push({ x: changingCoordinate, y: centerOfArea - BLOCKED_ZONE_SIZE / 2 });
        blockedArea.push({ x: centerOfArea + BLOCKED_ZONE_SIZE / 2, y: changingCoordinate });
        blockedArea.push({ x: centerOfArea - BLOCKED_ZONE_SIZE / 2, y: changingCoordinate });
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

type IGameBuilder = (scene: RefObject<Scene | null>) => {
    step: (snakeHead: IPlainPosition, snakeTail:IPlainPosition []) => void,
    end: () => void;
    start: () => void;
    isContinued: () => boolean;
}

export const gameBuilder: IGameBuilder = (sceneRef) => {
    const getBlockedArea = initBlockedArea();
    let isGameFinished = false;

    return {
        step: (snakeHead, snakeTail) => {
            const scene = sceneRef.current;
            if (!scene) {
                return;
            }
            isGameFinished = isGameOver(snakeHead, snakeTail, getBlockedArea());
            if (isGameFinished) {
                gameEnd(scene);
            }
        },
        start: () => {
            const scene = sceneRef.current;
            if (!scene) {
                return;
            }
            isGameFinished = false;
            gameStart(scene);
        },
        end: () => {
            const scene = sceneRef.current;
            if (!scene) {
                return;
            }
            isGameFinished = true;
            gameEnd(scene);
        },
        isContinued: () => !isGameFinished,
    };
};
