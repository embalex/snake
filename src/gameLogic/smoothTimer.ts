import { MutableRefObject } from 'react';

import { UPDATES_SETTINGS } from '../constants';
import { IUpdateState } from './types';


export const startSmoothTimer = (
    updatesStateRef: MutableRefObject<IUpdateState>,
    onTick: () => void,
    onComplete: () => void,
): void => {
    const updatesState = updatesStateRef.current;
    updatesState.smoothTimerCounter = UPDATES_SETTINGS.updatesPerStep;
    updatesState.smoothTimerId = window.setInterval(() => {
        if (updatesState.smoothTimerCounter === 0) {
            updatesState.smoothTimerId && clearInterval(updatesState.smoothTimerId);
            onComplete();
            return;
        }
        updatesState.smoothTimerCounter -= 1;

        onTick();
    }, Math.floor(updatesState.stepInterval / UPDATES_SETTINGS.updatesPerStep));
};

export const stopSmoothTimer = (updatesStateRef: MutableRefObject<IUpdateState>): void => {
    const { smoothTimerId } = updatesStateRef.current;

    smoothTimerId && clearInterval(smoothTimerId);
};
