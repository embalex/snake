import { IPosition } from './types';


const HALF_FIELD_SIZE = 10;
export const FIELD_SIZE = HALF_FIELD_SIZE * 2;
export const PLANET_SIZE = 50 * FIELD_SIZE;
export const BLOCKED_ZONE_SIZE = 4 * FIELD_SIZE;
export const DUCK_START_POSITION: IPosition = {
    x: HALF_FIELD_SIZE,
    y: HALF_FIELD_SIZE,
    angle: 180,
};

export const MAX_MAGMACUBES = 100;

export const UPDATES_SETTINGS = {
    startIntervalMs: 700,
    intervalDecrease: 10,
};

export const NAME = {
    Ducky: 'ducky',
    Apple: 'apple',
    AmbientLight: 'ambientLight',
    createMagmacubeName: (index: number): string => {
        const magmacubePrefix = 'magmacube';

        return `${magmacubePrefix}${index}`;
    },
};
