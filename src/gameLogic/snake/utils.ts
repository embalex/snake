import { IPosition } from '../../types';
import { MoveDirectionEnum } from '../types';


export const calculateNewPosition = (position: IPosition, newDirection: MoveDirectionEnum, step = 1): IPosition => {
    switch (newDirection) {
        case MoveDirectionEnum.Down:
            return {
                x: position.x,
                y: position.y - step,
                angle: MoveDirectionEnum.Down,
            };
        case MoveDirectionEnum.Right:
            return {
                x: position.x + step,
                y: position.y,
                angle: MoveDirectionEnum.Right,
            };
        case MoveDirectionEnum.Up:
            return {
                x: position.x,
                y: position.y + step,
                angle: MoveDirectionEnum.Up,
            };
        case MoveDirectionEnum.Left:
            return {
                x: position.x - step,
                y: position.y,
                angle: MoveDirectionEnum.Left,
            };
        default:
            throw new Error(`calculateNewPosition. Unknown newDirection type = ${newDirection}`);
    }
};
