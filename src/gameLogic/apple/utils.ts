import { FIELD_SIZE } from '../../constants';
import { IPosition } from '../../types';
import { isPositionInBlocked } from '../utils';


export const calcRandomPositions = (blockedPositions: IPosition[]): IPosition => {
    const getRandomCoordinates = () => ([
        Math.floor(Math.random() * FIELD_SIZE),
        Math.floor(Math.random() * FIELD_SIZE),
    ]);

    let [x, y] = getRandomCoordinates();
    while (isPositionInBlocked({ x, y }, blockedPositions)) {
        [x, y] = getRandomCoordinates();
    }

    return { x, y, angle: 0 };
};
