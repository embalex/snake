import { useEffect, useRef } from 'react';

import { KeyPressedEnum } from './types';
import { getKeyPressed } from './utils';


export const useKeys = () => {
    const keyPressedRef = useRef<KeyPressedEnum>(KeyPressedEnum.None);

    useEffect(() => {
        const onKeyPress = (event: KeyboardEvent) => {
            const key = getKeyPressed(event.key);

            if (key === undefined) {
                keyPressedRef.current = KeyPressedEnum.None;
                return;
            }

            keyPressedRef.current = key;
        };

        document.addEventListener('keydown', onKeyPress);

        return () => document.removeEventListener('keydown', onKeyPress);
    }, []);

    return {
        getPressedKey: (): KeyPressedEnum => {
            const key = keyPressedRef.current;
            keyPressedRef.current = KeyPressedEnum.None;

            return key;
        },
    };
};
