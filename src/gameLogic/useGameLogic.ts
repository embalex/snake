import React, { MutableRefObject, useEffect, useRef } from 'react';
import { Scene } from 'three';

import { DUCK_START_POSITION, NAME, START_TIMER_INTERVAL } from '../constants';
import { sceneHelperUtil } from '../sceneHelper';
import { IPosition, ISnake, MoveDirectionEnum } from './types';
import { calculateNewPosition, getDirectionByKey, setNewPosition } from './utils';


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

            const newPosition = calculateNewPosition(headPosition, headNewDirection);

            moveDirectionRef.current.canBeUpdated = true;

            headRef.current = newPosition;

            setNewPosition(
                sceneHelperUtil.getObject3DByName(sceneRef.current, NAME.Ducky),
                newPosition,
            );
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
