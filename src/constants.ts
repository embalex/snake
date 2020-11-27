import { IPosition } from './gameLogic/types';
import { degToRad } from './utils';


const HALF_FIELD_SIZE = 10;
export const FIELD_SIZE = HALF_FIELD_SIZE * 2;
export const DUCK_START_POSITION: IPosition = {
    x: HALF_FIELD_SIZE,
    y: HALF_FIELD_SIZE,
    angle: degToRad(180),
};

export const UPDATES_SETTINGS = {
    startIntervalMs: 1000,
    updatesPerStep: 10,
};

export const NAME = {
    Ducky: 'ducky',
    createMagmacubeName: (index: number): string => {
        const magmacubePrefix = 'magmacube';

        return `${magmacubePrefix}${index}`;
    },
};
