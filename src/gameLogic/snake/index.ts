import { RefObject } from 'react';
import { Scene } from 'three';

import { DUCK_START_POSITION, NAME } from '../../constants';
import { IPosition } from '../../types';
import { KeyPressedEnum } from '../useKeys/types';
import { getPosition, setPosition } from '../utils';
import { MoveDirectionEnum } from './types';
import { calculateDirection, calculateNewPosition } from './utils';


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

const getInitialParameters = (): { initDuckyPosition: IPosition, initTailPosition: IPosition[]} => ({
    initDuckyPosition: { ...DUCK_START_POSITION },
    initTailPosition: [],
});

type ISnakeBuilder = (sceneRef: RefObject<Scene | null>, getUpdatesByStep: () => number) => ({
    reset: () => void;
    addMagmacube: () => void;
    step: (direction: KeyPressedEnum) => void;
    microStep: () => void;
    getPositions: () => { head: IPosition; tail: IPosition[] };
});

export const snakeBuilder: ISnakeBuilder = (sceneRef, getUpdatesByStep) => {
    const { initDuckyPosition, initTailPosition } = getInitialParameters();

    let mutableDuckyPosition: IPosition = initDuckyPosition;
    let mutableTailPosition: IPosition[] = initTailPosition;

    return {
        reset: () => {
            const scene = sceneRef.current;
            if (!scene) {
                return;
            }
            mutableTailPosition.forEach((_, index) => {
                setPosition(
                    scene,
                    NAME.createMagmacubeName(index),
                    { x: 0, y: 0, angle: 0 },
                    true,
                );
            });
            const { initDuckyPosition: ducky, initTailPosition: tail } = getInitialParameters();

            mutableDuckyPosition = ducky;
            mutableTailPosition = tail;
        },
        addMagmacube: () => {
            const lastTailItemPosition = { ...mutableTailPosition[mutableTailPosition.length - 1] };
            mutableTailPosition.push({ ...lastTailItemPosition });
        },
        step: (keyPressed) => {
            const scene = sceneRef.current;
            if (!scene) {
                return;
            }
            const [newDuckyPosition, newTailPosition] = step(
                scene,
                mutableDuckyPosition,
                mutableTailPosition,
                calculateDirection(keyPressed, mutableDuckyPosition.angle),
            );

            mutableDuckyPosition = newDuckyPosition;
            mutableTailPosition = newTailPosition;
        },
        microStep: () => {
            const scene = sceneRef.current;
            if (!scene) {
                return;
            }
            microStep(scene, mutableDuckyPosition, mutableTailPosition, getUpdatesByStep);
        },
        getPositions: () => ({
            head: mutableDuckyPosition,
            tail: mutableTailPosition,
        }),
    };
};
