import { Object3D } from 'three';

import { FIELD_SIZE } from '../constants';
import { degToRad } from '../utils';
import { IPosition, MoveDirectionEnum } from './types';


interface ICoordinates {
    x: number;
    y: number;
}
const HALF_FIELD_SIZE = FIELD_SIZE / 2;

type IToGlobal = {
    (value: number): number;
    (value: ICoordinates): ICoordinates;
}

export const toGlobal: IToGlobal = (value: any): any => {
    if (typeof value === 'number') {
        return value - HALF_FIELD_SIZE;
    }

    return {
        x: value.x - HALF_FIELD_SIZE,
        y: value.y - HALF_FIELD_SIZE,
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


export const calculateNewPosition = (position: IPosition, newDirection: MoveDirectionEnum): IPosition => {
    switch (newDirection) {
        case MoveDirectionEnum.Down:
            return {
                x: position.x,
                y: position.y - 1,
                angle: MoveDirectionEnum.Down,
            };
        case MoveDirectionEnum.Right:
            return {
                x: position.x + 1,
                y: position.y,
                angle: MoveDirectionEnum.Right,
            };
        case MoveDirectionEnum.Up:
            return {
                x: position.x,
                y: position.y + 1,
                angle: MoveDirectionEnum.Up,
            };
        case MoveDirectionEnum.Left:
            return {
                x: position.x - 1,
                y: position.y,
                angle: MoveDirectionEnum.Left,
            };
        default:
            throw new Error(`GameLogicUtils. makeStep. Unknown newDirection type = ${newDirection}`);
    }
};

export const setNewPosition = (model: Object3D, position: IPosition): void => {
    const { x, y } = toGlobal({ x: position.x, y: position.y });
    const angle = degToRad(position.angle);
    model.position.setX(x);
    model.position.setY(y);
    model.rotation.set(0, 0, angle);
};
