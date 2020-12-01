import { IAnimation, IWithAnimation, IWithoutAnimation } from './types';


export const isWithoutAnimation = (value: IAnimation): value is IWithoutAnimation => (
    value.type === 'undefined'
);

export const createAnimationConfig = (number: number, speed: number, timeOffset?: number): IWithAnimation => ({
    type: 'defined',
    number,
    speed,
    offset: timeOffset ?? 0,
});

export const createEmptyAnimationConfig = (): IWithoutAnimation => ({
    type: 'undefined',
});
