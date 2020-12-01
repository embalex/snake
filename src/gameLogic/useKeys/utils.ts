import { DirectionKeyPressedEnum } from './types';


const keyToDirectionMap = {
    ArrowLeft: DirectionKeyPressedEnum.LeftArrow,
    ArrowRight: DirectionKeyPressedEnum.RightArrow,
};

export const getDirectionKeyPressed = (key: string): DirectionKeyPressedEnum | undefined => (
    keyToDirectionMap[key as keyof typeof keyToDirectionMap]
);

export const isResetKeyPressed = (key: string): boolean => (key === 'R' || key === 'r');
