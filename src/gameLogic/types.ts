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
