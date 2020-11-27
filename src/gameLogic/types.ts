export interface IPosition {
    x: number;
    y: number;
    angle: number;
}

export enum MoveDirectionEnum {
    Up = 0,
    Right = 270,
    Down = 180,
    Left = 90,
}

export interface IDirectionBuffer {
    direction: MoveDirectionEnum;
    canBeUpdated: boolean;
}

export interface IUpdateState {
    stepInterval: number;
    smoothTimerId: number | null;
    smoothTimerCounter: number;
}
