import { Scene } from 'three';

import {FIELD_SIZE, NAME, UPDATES_BY_STEP} from '../constants';
import { sceneHelperUtil } from '../sceneHelper';
import { degToRad, radToDeg } from '../utils';
import { IPosition, MoveDirectionEnum } from './types';


interface ICoordinates {
    x: number;
    y: number;
}
const HALF_FIELD_SIZE = FIELD_SIZE / 2;

type IConvertGlobal = {
    (value: number): number;
    (value: ICoordinates): ICoordinates;
}

export const toGlobal: IConvertGlobal = (value: any): any => {
    if (typeof value === 'number') {
        return value - HALF_FIELD_SIZE;
    }

    return {
        x: value.x - HALF_FIELD_SIZE,
        y: value.y - HALF_FIELD_SIZE,
    };
};

export const toLocal: IConvertGlobal = (value: any): any => {
    if (typeof value === 'number') {
        return value + HALF_FIELD_SIZE;
    }

    return {
        x: value.x + HALF_FIELD_SIZE,
        y: value.y + HALF_FIELD_SIZE,
    };
};

const keyToDirectionMap = {
    ArrowLeft: MoveDirectionEnum.Left,
    ArrowRight: MoveDirectionEnum.Right,
    ArrowUp: MoveDirectionEnum.Up,
    ArrowDown: MoveDirectionEnum.Down,
};

export const getDirectionByKey = (key: string): MoveDirectionEnum | undefined => (
    keyToDirectionMap[key as keyof typeof keyToDirectionMap]
);


export const calculateNewPosition = (position: IPosition, newDirection: MoveDirectionEnum, step = 1): IPosition => {
    switch (newDirection) {
        case MoveDirectionEnum.Down:
            return {
                x: position.x,
                y: position.y - step,
                angle: MoveDirectionEnum.Down,
            };
        case MoveDirectionEnum.Right:
            return {
                x: position.x + step,
                y: position.y,
                angle: MoveDirectionEnum.Right,
            };
        case MoveDirectionEnum.Up:
            return {
                x: position.x,
                y: position.y + step,
                angle: MoveDirectionEnum.Up,
            };
        case MoveDirectionEnum.Left:
            return {
                x: position.x - step,
                y: position.y,
                angle: MoveDirectionEnum.Left,
            };
        default:
            throw new Error(`GameLogicUtils. makeStep. Unknown newDirection type = ${newDirection}`);
    }
};

export const setPosition = (scene: Scene, name: string, position: IPosition): void => {
    const { x, y } = toGlobal({ x: position.x, y: position.y });
    const angle = degToRad(position.angle);

    sceneHelperUtil.setObject3DPositionByName(scene, name, { x, y, angle });
};

export const getPosition = (scene: Scene, name: string): IPosition => {
    const globalPosition = sceneHelperUtil.getObject3DPositionByName(scene, name);

    const { x, y } = toLocal({ x: globalPosition.x, y: globalPosition.y });
    const angle = radToDeg(globalPosition.angle);

    return { x, y, angle };
};

