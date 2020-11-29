import { MutableRefObject, useEffect, useRef } from 'react';
import { Scene } from 'three';

import {
    APPLE_START_POSITION,
    UPDATES_SETTINGS,
} from '../constants';
import { sceneHelperUtil } from '../sceneHelper';
import { IPosition } from '../types';
import { appleLogicThread } from './appleLogic';
import { snakeBuilder } from './snake';
import { stepperBuilder } from './stepper';
import {
    IDirectionBuffer,
    MoveDirectionEnum,
} from './types';
import { useKeys } from './useKeys';


// Here we use local (playground) coordinates. And in the end local coordinates is converted to global.

/*
        Playground:
 FIELD_SIZE (y)
 ^
 |
 |
 0              --->   FIELD_SIZE (x)

        Rotation
            0 deg
    90 deg         270 deg
            180deg
*/

export const useGameLogic = (sceneRef: MutableRefObject<Scene>): void => {
    const directionBufferRef = useRef<IDirectionBuffer>({
        direction: MoveDirectionEnum.Down,
        canBeUpdated: false,
    });
    const appleRef = useRef<IPosition>(APPLE_START_POSITION);
    useKeys(directionBufferRef);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        let stopStepper: () => void = () => {};

        const startGame = (): () => void => {
            const stepper = stepperBuilder(UPDATES_SETTINGS.startIntervalMs, UPDATES_SETTINGS.intervalDecrease);
            const snake = snakeBuilder(sceneRef, stepper.getUpdatesByStep);

            const makeStep = () => {
                stepper.step(
                    snake.microStep,
                    () => {
                        const { isHeadEatApple } = appleLogicThread(sceneRef.current, appleRef, snake.getPositions());
                        if (isHeadEatApple) {
                            stepper.increaseSpeed();
                            snake.addMagmacube();
                        }
                        snake.step(directionBufferRef.current.direction);
                        directionBufferRef.current.canBeUpdated = true;
                        makeStep();
                    },
                );
            };

            makeStep();
            return stepper.stop;
        };

        const sceneTestTimer = setInterval(() => {
            if (sceneHelperUtil.isSceneReady(sceneRef.current)) {
                clearInterval(sceneTestTimer);

                stopStepper = startGame();
            }
        }, 100);

        return stopStepper();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};
