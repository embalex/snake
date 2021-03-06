import { Scene } from 'three';

import { FIELD_SIZE } from '../constants';
import { sceneHelperUtil } from '../sceneHelper';
import { IPosition } from '../types';
import { degToRad, radToDeg } from '../utils';


interface ICoordinates {
    x: number;
    y: number;
}
const HALF_FIELD_SIZE = FIELD_SIZE / 2;

type IConvertGlobal = {
    (value: number): number;
    (value: ICoordinates): ICoordinates;
}

export const toGlobal: IConvertGlobal = (value: number | ICoordinates): any => {
    if (typeof value === 'number') {
        return value - HALF_FIELD_SIZE;
    }

    return {
        x: value.x - HALF_FIELD_SIZE,
        y: value.y - HALF_FIELD_SIZE,
    };
};

export const toLocal: IConvertGlobal = (value: number | ICoordinates): any => {
    if (typeof value === 'number') {
        return value + HALF_FIELD_SIZE;
    }

    return {
        x: value.x + HALF_FIELD_SIZE,
        y: value.y + HALF_FIELD_SIZE,
    };
};

export const isTheSameXYCoordinates = (
    { x: x1, y: y1 }: IPosition,
    { x: x2, y: y2 }: IPosition,
): boolean => (x1 === x2) && (y1 === y2);

export const setPosition = (scene: Scene, name: string, position: IPosition, isUnderGround = false): void => {
    const { x, y } = toGlobal({ x: position.x, y: position.y });
    const angle = degToRad(position.angle);

    sceneHelperUtil.setObject3DPositionByName(scene, name, { x, y, angle }, isUnderGround);
};

export const getPosition = (scene: Scene, name: string): IPosition => {
    const globalPosition = sceneHelperUtil.getObject3DPositionByName(scene, name);

    const { x, y } = toLocal({ x: globalPosition.x, y: globalPosition.y });
    const angle = radToDeg(globalPosition.angle);

    return { x, y, angle };
};

type PlainPosition = Pick<IPosition, 'x'| 'y'>
export const isPositionInBlocked = (
    { x: testX, y: testY }: PlainPosition,
    blockedPositions: PlainPosition[],
): boolean => (
    blockedPositions.filter(
        ({ x: blockedX, y: blockedY }) => ((blockedX === testX) && (blockedY === testY)),
    ).length > 0
);
