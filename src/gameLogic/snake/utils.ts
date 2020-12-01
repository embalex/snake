import { IPosition } from '../../types';
import { KeyPressedEnum } from '../useKeys/types';
import { MoveDirectionEnum } from './types';


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

export const calculateDirection = (keyPressed: KeyPressedEnum, direction: MoveDirectionEnum): MoveDirectionEnum => {
    if (keyPressed === KeyPressedEnum.None) {
        return direction;
    }

    const cw = [MoveDirectionEnum.Up, MoveDirectionEnum.Right, MoveDirectionEnum.Down, MoveDirectionEnum.Left];
    const ccw = [MoveDirectionEnum.Up, MoveDirectionEnum.Left, MoveDirectionEnum.Down, MoveDirectionEnum.Right];

    const rotation = keyPressed === KeyPressedEnum.LeftArrow ? ccw : cw;
    const index = rotation.indexOf(direction);
    const newIndex = (index + 1) % rotation.length;

    return rotation[newIndex];
};
