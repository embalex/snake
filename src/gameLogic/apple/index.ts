import { RefObject } from 'react';
import { Scene } from 'three';

import { DUCK_START_POSITION, NAME } from '../../constants';
import { IPosition } from '../../types';
import { isTheSameXYCoordinates, setPosition } from '../utils';
import { calcRandomPositions } from './utils';


const isSnakeHeadOverlapApple = (apple: IPosition, snake: IPosition[]): boolean => {
    const snakeHeadPosition = snake[0];

    return isTheSameXYCoordinates(apple, snakeHeadPosition);
};

export const step = (
    scene: Scene,
    applePosition: IPosition,
    snake: IPosition[],
): { isSnakeEatApple: boolean, actualApplePosition: IPosition } => {
    const isSnakeEatApple = isSnakeHeadOverlapApple(applePosition, snake);
    let actualApplePosition = applePosition;
    if (isSnakeEatApple) {
        actualApplePosition = calcRandomPositions(snake);
    }

    setPosition(scene, NAME.Apple, actualApplePosition);

    return {
        isSnakeEatApple,
        actualApplePosition,
    };
};


type IAppleBuilder = (sceneRef: RefObject<Scene | null>) => ({
    reset: () => void;
    step: (snakePosition: IPosition[]) => ({ isSnakeEatApple: boolean });
});

export const appleBuilder: IAppleBuilder = (sceneRef) => {
    let applePosition: IPosition = calcRandomPositions([DUCK_START_POSITION]);

    return {
        reset: () => {
            applePosition = calcRandomPositions([DUCK_START_POSITION]);
        },
        step: (snakePosition) => {
            const scene = sceneRef.current;
            if (!scene) {
                return { isSnakeEatApple: false };
            }
            const { isSnakeEatApple, actualApplePosition } = step(scene, applePosition, snakePosition);

            applePosition = actualApplePosition;
            return { isSnakeEatApple };
        },
    };
};
