import { MutableRefObject, useEffect } from 'react';

import { IDirectionBuffer } from '../types';
import { getDirectionByKey } from './utils';


export const useKeys = (directionBufferRef: MutableRefObject<IDirectionBuffer>): void => {
    useEffect(() => {
        const onKeyPress = (event: KeyboardEvent) => {
            const { current: directionBuffer } = directionBufferRef;
            const newDirection = getDirectionByKey(event.key);

            if (!directionBuffer.canBeUpdated) {
                return;
            }

            if (newDirection === undefined) {
                return;
            }

            directionBuffer.canBeUpdated = false;
            directionBuffer.direction = newDirection;
        };

        document.addEventListener('keydown', onKeyPress);

        return () => document.removeEventListener('keydown', onKeyPress);
    }, [directionBufferRef]);
};
