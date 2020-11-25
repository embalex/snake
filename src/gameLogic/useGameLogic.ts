import React, { MutableRefObject, useEffect, useRef } from 'react';
import { Scene } from 'three';

import {
    DUCK_START_POSITION,
    NAME,
    START_TIMER_INTERVAL,
    UPDATES_BY_STEP,
} from '../constants';
import { IPosition, MoveDirectionEnum } from './types';
import {
    calculateNewPosition,
    getDirectionByKey,
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

interface IUseGameLogicReturn {
    onKeyPress: React.KeyboardEventHandler;
}


export const useGameLogic = (sceneRef: ISceneRef): void => {
    const stepInterval = useRef<number>(START_TIMER_INTERVAL);
    const headRef = useRef<IPosition>(DUCK_START_POSITION);
    const tail = useRef<IPosition[]>([]);
    const moveDirectionRef = useRef<{ direction: MoveDirectionEnum; canBeUpdated: boolean }>({
        direction: MoveDirectionEnum.Down,
        canBeUpdated: false,
    });

    const onKeyPress = (event: KeyboardEvent) => {
        const { canBeUpdated } = moveDirectionRef.current;
        const newDirection = getDirectionByKey(event.key);

        if (!canBeUpdated) {
            return;
        }

        if (newDirection === undefined) {
            return;
        }

        moveDirectionRef.current = {
            canBeUpdated: false,
            direction: newDirection,
        };
    };

    useEffect(() => {
        document.addEventListener('keydown', onKeyPress);

        return () => document.removeEventListener('keydown', onKeyPress);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            const headPosition = { ...headRef.current };
            const { direction: headNewDirection } = moveDirectionRef.current;

            const newHeadPosition = calculateNewPosition(headPosition, headNewDirection);
            moveDirectionRef.current.canBeUpdated = true;
            headRef.current = newHeadPosition;

            let updateCounter = UPDATES_BY_STEP;
            const updateTimer = setInterval(() => {
                if (updateCounter === 0) {
                    clearInterval(updateTimer);
                    return;
                }

                updateCounter -= 1;

                const currentPosition = getPosition(sceneRef.current, NAME.Ducky);
                const subPosition = calculateNewPosition(currentPosition, headRef.current.angle, 1 / UPDATES_BY_STEP);
                setPosition(sceneRef.current, NAME.Ducky, subPosition);
            }, Math.floor(stepInterval.current / UPDATES_BY_STEP - 20));
        }, stepInterval.current);

        return () => clearInterval(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stepInterval.current]);

    // return {
    //     snake: {
    //         head: trackToGlobal(headRef.current),
    //         magmacubes: tail.current.map((tailTrack) => trackToGlobal(tailTrack)),
    //     },
    //     apple: toGlobal({ x: 10, y: 10 }),
    //     onKeyPress,
    // };
};
