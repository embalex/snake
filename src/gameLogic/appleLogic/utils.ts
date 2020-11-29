import { FIELD_SIZE } from '../../constants';
import { IPosition } from '../../types';


export const calcRandomPositions = (blockedPositions: IPosition[]): IPosition => {
    const getRandomCoordinates = () => ([
        Math.floor(Math.random() * FIELD_SIZE),
        Math.floor(Math.random() * FIELD_SIZE),
    ]);

    const isInBlockedPosition = (testX: number, testY: number): boolean => (
        blockedPositions.filter(
            ({ x: blockedX, y: blockedY }) => ((blockedX === testX) && (blockedY === testY)),
        ).length > 0
    );

    let [x, y] = getRandomCoordinates();
    while (isInBlockedPosition(x, y)) {
        [x, y] = getRandomCoordinates();
    }

    return { x, y, angle: 0 };
};
