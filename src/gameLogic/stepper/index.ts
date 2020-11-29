import { MIN_STEP_INTERVAL_MS, MIN_UPDATES_BY_STEP, UPDATES_BY_STEP_RATIO } from './constants';
import { IStepperParameters } from './types';


/* eslint-disable no-param-reassign */

const stopStepTimer = (mutableParameters: IStepperParameters): void => {
    mutableParameters.timerId && clearInterval(mutableParameters.timerId);
};

const startStepTimer = (
    mutableParameters: IStepperParameters,
    onTick: () => void,
    onComplete: () => void,
): void => {
    mutableParameters.updatesByStepCounter = mutableParameters.updatesByStep - 1;
    mutableParameters.timerId = window.setInterval(() => {
        onTick();
        if (mutableParameters.updatesByStepCounter === 0) {
            stopStepTimer(mutableParameters);
            onComplete();
            return;
        }
        mutableParameters.updatesByStepCounter -= 1;
    }, mutableParameters.timerInterval);
};

const calculateUpdatesParameters = (
    stepInterval: number,
): Pick<IStepperParameters, 'updatesByStep' | 'timerInterval'> => {
    const updatesByStep = Math.ceil(stepInterval / UPDATES_BY_STEP_RATIO) || MIN_UPDATES_BY_STEP;

    return {
        updatesByStep,
        timerInterval: Math.floor(stepInterval / updatesByStep),
    };
};

const increaseSpeed = (
    stepperMutableParameters: IStepperParameters,
): void => {
    const { stepInterval, stepIntervalDecreaseValue } = stepperMutableParameters;
    const decreasedInterval = ((stepInterval - stepIntervalDecreaseValue) < MIN_STEP_INTERVAL_MS)
        ? MIN_STEP_INTERVAL_MS
        : stepInterval - stepIntervalDecreaseValue;
    const { updatesByStep, timerInterval } = calculateUpdatesParameters(decreasedInterval);

    stepperMutableParameters.stepInterval = decreasedInterval;
    stepperMutableParameters.updatesByStep = updatesByStep;
    stepperMutableParameters.timerInterval = timerInterval;
};

type IStepperBuilder = (initialInterval: number, intervalDecreaseValue: number) => ({
    stop: () => void;
    step: (onTick: () => void, onComplete: () => void) => void;
    increaseSpeed: () => void;
    getUpdatesByStep: () => number;
});

export const stepperBuilder: IStepperBuilder = (initialInterval: number, intervalDecreaseValue: number) => {
    const stepperMutableParameters: IStepperParameters = {
        stepInterval: initialInterval,
        stepIntervalDecreaseValue: intervalDecreaseValue,
        timerId: null,
        updatesByStepCounter: 0,
        ...calculateUpdatesParameters(initialInterval),
    };

    return {
        stop: () => {
            stopStepTimer(stepperMutableParameters);
        },
        step: (onTick, onComplete) => {
            startStepTimer(stepperMutableParameters, onTick, onComplete);
        },
        increaseSpeed: () => {
            increaseSpeed(stepperMutableParameters);
        },
        getUpdatesByStep: () => stepperMutableParameters.updatesByStep,
    };
};
