import React, { MutableRefObject, useEffect, useRef } from 'react';

import { DUCK_START_POSITION, START_TIMER_INTERVAL } from '../constants';
import { IPosition, ISnake, MoveDirectionEnum } from './types';
import { getDirectionByKey, makeStep, toGlobal } from './utils';


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


type ISnakeRef = MutableRefObject<React.ReactNode>

interface IUseGameLogicReturn {
    onKeyPress: React.KeyboardEventHandler;
}


export const useGameLogic = (snakeRef: ISnakeRef): void => {
    const trackToGlobal = ({ x, y, angle }: IPosition): IPosition => ({
        ...toGlobal({ x, y }),
        angle,
    });

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

            const newPosition = makeStep(headPosition, headNewDirection);

            moveDirectionRef.current.canBeUpdated = true;

            headRef.current = newPosition;

            /* Update duck position */
            if (!snakeRef.current) {
                return;
            }
            const { x: snakeXPosition, y: snakeYPosition } = toGlobal({ x: headRef.current.x, y: headRef.current.y });
            const snakeZPosition = (snakeRef.current as any).position.z;
            (snakeRef.current as any).position.set(snakeXPosition, snakeYPosition, snakeZPosition);
        }, START_TIMER_INTERVAL);

        return () => clearInterval(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // return {
    //     snake: {
    //         head: trackToGlobal(headRef.current),
    //         magmacubes: tail.current.map((tailTrack) => trackToGlobal(tailTrack)),
    //     },
    //     apple: toGlobal({ x: 10, y: 10 }),
    //     onKeyPress,
    // };
};
