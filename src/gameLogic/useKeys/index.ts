import { useEffect, useRef } from 'react';

import { DirectionKeyPressedEnum, KeyPressedEnum } from './types';
import { getDirectionKeyPressed, isResetKeyPressed } from './utils';


type IUseKeys = () => {
    getPressedDirectionKey: () => KeyPressedEnum;
    isResetKeyPressed: () => boolean;
}
export const useKeys: IUseKeys = () => {
    const keyPressedRef = useRef<DirectionKeyPressedEnum | undefined>(undefined);
    const keyResetRef = useRef<boolean>(false);

    useEffect(() => {
        const onKeyPress = (event: KeyboardEvent) => {
            const directionKey = getDirectionKeyPressed(event.key);
            const isResetKey = isResetKeyPressed(event.key);

            if (directionKey !== undefined) {
                keyPressedRef.current = directionKey;
            }

            if (isResetKey) {
                keyResetRef.current = true;
            }
        };

        document.addEventListener('keydown', onKeyPress);

        return () => document.removeEventListener('keydown', onKeyPress);
    }, []);

    return {
        getPressedDirectionKey: () => {
            const key = keyPressedRef.current;
            keyPressedRef.current = undefined;

            const map = {
                [DirectionKeyPressedEnum.LeftArrow]: KeyPressedEnum.LeftArrow,
                [DirectionKeyPressedEnum.RightArrow]: KeyPressedEnum.RightArrow,
            };

            return key === undefined ? KeyPressedEnum.None : map[key];
        },
        isResetKeyPressed: () => {
            const isPressed = keyResetRef.current;
            keyResetRef.current = false;

            return isPressed;
        },
    };
};
