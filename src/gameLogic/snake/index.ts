import { MutableRefObject } from 'react';
import { Scene } from 'three';

import { DUCK_START_POSITION, NAME } from '../../constants';
import { IPosition } from '../../types';
import { MoveDirectionEnum } from '../types';
import { getPosition, setPosition } from '../utils';
import { calculateNewPosition } from './utils';


const step = (
    scene: Scene,
    duckyPosition: IPosition,
    tailPosition: IPosition[],
    direction: MoveDirectionEnum,
) => {
    try {
        setPosition(scene, NAME.Ducky, duckyPosition);
        tailPosition.forEach((tailItemPosition, index) => {
            setPosition(scene, NAME.createMagmacubeName(index), tailItemPosition);
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }

    const newDuckyPosition = calculateNewPosition(duckyPosition, direction);
    const newTailPosition = tailPosition.length
        ? [{ ...duckyPosition }, ...tailPosition.slice(0, -1)]
        : [];

    return [newDuckyPosition, newTailPosition] as const;
};

const microStep = (
    scene: Scene,
    duckyPosition: IPosition,
    tailPosition: IPosition[],
    getUpdatesByStep: () => number,
) => {
    const updatesByStep = getUpdatesByStep();
    const updatePosition = (name: string, angle: IPosition['angle'], movingSize: number) => {
        try {
            const currentPosition = getPosition(scene, name);
            const subPosition = calculateNewPosition(currentPosition, angle, movingSize);
            setPosition(scene, name, subPosition);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
        }
    };

    updatePosition(NAME.Ducky, duckyPosition.angle, 1 / updatesByStep);
    tailPosition.forEach(({ angle }, index) => (
        updatePosition(NAME.createMagmacubeName(index), angle, 1 / updatesByStep)
    ));
};

type ISnakeBuilder = (sceneRef: MutableRefObject<Scene>, getUpdatesByStep: () => number) => ({
    addMagmacube: () => void;
    step: (direction: MoveDirectionEnum) => void;
    microStep: () => void;
    getPositions: () => IPosition[];
});

export const snakeBuilder: ISnakeBuilder = (sceneRef, getUpdatesByStep) => {
    let mutableDuckyPosition: IPosition = { ...DUCK_START_POSITION };
    let mutableTailPosition: IPosition[] = [];

    return {
        addMagmacube: () => {
            const lastTailItemPosition = { ...mutableTailPosition[mutableTailPosition.length - 1] };
            mutableTailPosition.push({ ...lastTailItemPosition });
        },
        step: (direction) => {
            const [newDuckyPosition, newTailPosition] = step(
                sceneRef.current,
                mutableDuckyPosition,
                mutableTailPosition,
                direction,
            );

            mutableDuckyPosition = newDuckyPosition;
            mutableTailPosition = newTailPosition;
        },
        microStep: () => microStep(sceneRef.current, mutableDuckyPosition, mutableTailPosition, getUpdatesByStep),
        getPositions: () => [mutableDuckyPosition, ...mutableTailPosition],
    };
};
