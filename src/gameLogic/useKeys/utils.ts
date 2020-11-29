import { KeyPressedEnum } from './types';


const keyToDirectionMap = {
    ArrowLeft: KeyPressedEnum.LeftArrow,
    ArrowRight: KeyPressedEnum.RightArrow,
};

export const getKeyPressed = (key: string): KeyPressedEnum | undefined => (
    keyToDirectionMap[key as keyof typeof keyToDirectionMap]
);
