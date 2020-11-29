import { MutableRefObject } from 'react';
import { Scene } from 'three';

import { NAME } from '../../constants';
import { IPosition } from '../../types';
import { isTheSameXYCoordinates, setPosition } from '../utils';
import { calcRandomPositions } from './utils';


const isSnakeHeadOverlapApple = (apple: IPosition, snake: IPosition[]): boolean => {
    const snakeHeadPosition = snake[0];

    return isTheSameXYCoordinates(apple, snakeHeadPosition);
};

const updateApplePosition = (appleRef: MutableRefObject<IPosition>, blocked: IPosition[]): void => {
    const newApplePosition = calcRandomPositions(blocked);
    const { current: applePosition } = appleRef;

    applePosition.x = newApplePosition.x;
    applePosition.y = newApplePosition.y;
    applePosition.angle = newApplePosition.angle;
};

const setApplePosition = (scene: Scene, apple: IPosition) => {
    setPosition(scene, NAME.Apple, apple);
};

export const appleLogicThread = (
    scene: Scene,
    appleRef: MutableRefObject<IPosition>,
    snake: IPosition[],
): { isHeadEatApple: boolean } => {
    const isHeadEatApple = isSnakeHeadOverlapApple(appleRef.current, snake);
    if (isHeadEatApple) {
        updateApplePosition(appleRef, snake);
    }

    setApplePosition(scene, appleRef.current);

    return { isHeadEatApple };
};
