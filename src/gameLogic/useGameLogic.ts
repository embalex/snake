import { MutableRefObject, useEffect, useRef } from 'react';
import { Scene } from 'three';

import {
    APPLE_START_POSITION,
    DUCK_START_POSITION,
    NAME,
    UPDATES_SETTINGS,
} from '../constants';
import { IPosition } from '../types';
import { appleLogicThread } from './appleLogic';
import { stepperBuilder } from './stepper';
import {
    IDirectionBuffer,
    MoveDirectionEnum,
} from './types';
import { useKeys } from './useKeys';
import {
    calculateNewPosition,
    getPosition,
    setPosition,
} from './utils';


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


type ISceneRef = MutableRefObject<Scene>

export const useGameLogic = (sceneRef: ISceneRef): void => {
    const headPositionRef = useRef<IPosition>(DUCK_START_POSITION);
    const directionBufferRef = useRef<IDirectionBuffer>({
        direction: MoveDirectionEnum.Down,
        canBeUpdated: false,
    });
    const appleRef = useRef<IPosition>(APPLE_START_POSITION);
    useKeys(directionBufferRef);


    useEffect(() => {
        const stepper = stepperBuilder(UPDATES_SETTINGS.startIntervalMs, UPDATES_SETTINGS.intervalDecrease);

        const makeStep = () => {
            const headPosition = { ...headPositionRef.current };
            const { direction: headNewDirection } = directionBufferRef.current;

            const newHeadPosition = calculateNewPosition(headPosition, headNewDirection);
            directionBufferRef.current.canBeUpdated = true;
            headPositionRef.current = newHeadPosition;

            const onMicroStep = () => {
                try {
                    const currentPosition = getPosition(sceneRef.current, NAME.Ducky);
                    const subPosition = calculateNewPosition(
                        currentPosition,
                        headPositionRef.current.angle,
                        1 / stepper.getUpdatesByStep(),
                    );
                    setPosition(sceneRef.current, NAME.Ducky, subPosition);
                } catch (error) {
                    // eslint-disable-next-line no-console
                    console.error(error);
                }
            };

            stepper.start(
                onMicroStep,
                () => {
                    const { isHeadEatApple } = appleLogicThread(sceneRef.current, appleRef, [headPositionRef.current]);
                    if (isHeadEatApple) {
                        stepper.increaseSpeed();
                    }
                    makeStep();
                },
            );
        };

        makeStep();

        return stepper.stop;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};
