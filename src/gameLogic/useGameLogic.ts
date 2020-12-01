import { MutableRefObject, useEffect } from 'react';
import { Scene } from 'three';

import { UPDATES_SETTINGS } from '../constants';
import { sceneHelperUtil } from '../sceneHelper';
import { appleBuilder } from './apple';
import { gameBuilder } from './game';
import { snakeBuilder } from './snake';
import { stepperBuilder } from './stepper';
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
    const { getPressedDirectionKey, isResetKeyPressed } = useKeys();

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        let stopStepper: () => void = () => {};

        const startGame = (): () => void => {
            const stepper = stepperBuilder(UPDATES_SETTINGS.startIntervalMs, UPDATES_SETTINGS.intervalDecrease);
            const snake = snakeBuilder(sceneRef, stepper.getUpdatesByStep);
            const apple = appleBuilder(sceneRef);
            const game = gameBuilder(sceneRef);

            const makeStep = () => {
                stepper.step(
                    () => game.isContinued() && snake.microStep(),
                    () => {
                        const snakePositions = snake.getPositions();
                        game.step(snakePositions.head, snakePositions.tail);
                        if (game.isContinued()) {
                            const { isSnakeEatApple } = apple.step([snakePositions.head, ...snakePositions.tail]);
                            if (isSnakeEatApple) {
                                stepper.increaseSpeed();
                                snake.addMagmacube();
                            }
                            snake.step(getPressedDirectionKey());
                        }
                        if (isResetKeyPressed()) {
                            stepper.reset();
                            snake.reset();
                            apple.reset();
                            game.start();
                        }
                        makeStep();
                    },
                );
            };

            snake.step(getPressedDirectionKey());
            makeStep();
            return stepper.stop;
        };

        const sceneTestTimer = setInterval(() => {
            if (sceneHelperUtil.isSceneReady(sceneRef.current)) {
                clearInterval(sceneTestTimer);

                stopStepper = startGame();
            }
        }, 100);

        return stopStepper;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};
