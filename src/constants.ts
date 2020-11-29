import { IPosition } from './types';


const HALF_FIELD_SIZE = 10;
export const FIELD_SIZE = HALF_FIELD_SIZE * 2;
export const DUCK_START_POSITION: IPosition = {
    x: HALF_FIELD_SIZE,
    y: HALF_FIELD_SIZE,
    angle: 180,
};

export const APPLE_START_POSITION: IPosition = {
    x: HALF_FIELD_SIZE - 1,
    y: HALF_FIELD_SIZE - 1,
    angle: 0,
};

export const MAX_MAGMACUBES = 100;

export const UPDATES_SETTINGS = {
    startIntervalMs: 1000,
    intervalDecrease: 10,
};

export const NAME = {
    Ducky: 'ducky',
    Apple: 'apple',
    createMagmacubeName: (index: number): string => {
        const magmacubePrefix = 'magmacube';

        return `${magmacubePrefix}${index}`;
    },
};
