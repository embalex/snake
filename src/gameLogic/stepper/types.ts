export interface IStepperParameters {
    stepInterval: number;
    stepIntervalDecreaseValue: number;
    timerId: number | null;
    timerInterval: number;
    updatesByStepCounter: number;
    updatesByStep: number;
}
