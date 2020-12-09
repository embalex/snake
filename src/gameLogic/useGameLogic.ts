import { RefObject, useEffect, useState } from 'react';
import { Scene } from 'three';

import { UPDATES_SETTINGS } from '../constants';
import { sceneHelperUtil } from '../sceneHelper';
import { appleBuilder } from './apple';
import { gameBuilder } from './game';
import { snakeBuilder } from './snake';
import { stepperBuilder } from './stepper';
import { useKeys } from './useKeys';


export const useGameLogic = (sceneRef: RefObject<Scene | null>): { score: number; isLoading: boolean; } => {
    const { getPressedDirectionKey, isResetKeyPressed } = useKeys();
    const [score, setScore] = useState(0);
    const [isLoading, setIsLoading] = useState(true);


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
                                setScore((value) => (value + 1));
                                stepper.increaseSpeed();
                                snake.addMagmacube();
                            }
                            snake.step(getPressedDirectionKey());
                        }
                        if (isResetKeyPressed()) {
                            setScore(0);
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
            if (sceneRef.current && sceneHelperUtil.isSceneReady(sceneRef.current)) {
                clearInterval(sceneTestTimer);
                setIsLoading(false);

                stopStepper = startGame();
            }
        }, 100);

        return stopStepper;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { score, isLoading };
};
