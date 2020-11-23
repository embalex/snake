export interface IPosition {
    x: number;
    y: number;
    angle: number;
}

export interface ISnake {
    head: IPosition;
    magmacubes: IPosition[];
}


export enum MoveDirectionEnum {
    Up = 0,
    Right = 270,
    Down = 180,
    Left = 90,
}
