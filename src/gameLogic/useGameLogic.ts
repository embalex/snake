import { MutableRefObject, useEffect, useRef } from 'react';
import { Scene } from 'three';

import {
    DUCK_START_POSITION,
    NAME,
    UPDATES_SETTINGS,
} from '../constants';
import { startSmoothTimer, stopSmoothTimer } from './smoothTimer';
import {
    IDirectionBuffer,
    IPosition,
    IUpdateState,
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
    const updatesStateRef = useRef<IUpdateState>({
        stepInterval: UPDATES_SETTINGS.startIntervalMs,
        smoothTimerId: null,
        smoothTimerCounter: UPDATES_SETTINGS.updatesPerStep,
    });

    const headPositionRef = useRef<IPosition>(DUCK_START_POSITION);
    const directionBufferRef = useRef<IDirectionBuffer>({
        direction: MoveDirectionEnum.Down,
        canBeUpdated: false,
    });
    useKeys(directionBufferRef);


    useEffect(() => {
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
                        1 / UPDATES_SETTINGS.updatesPerStep,
                    );
                    setPosition(sceneRef.current, NAME.Ducky, subPosition);
                } catch (error) {
                    // eslint-disable-next-line no-console
                    console.error(error);
                }
            };

            startSmoothTimer(updatesStateRef, onMicroStep, makeStep);
        };

        makeStep();

        return () => { stopSmoothTimer(updatesStateRef); };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};
