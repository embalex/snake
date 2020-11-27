import { MoveDirectionEnum } from '../types';


const keyToDirectionMap = {
    ArrowLeft: MoveDirectionEnum.Left,
    ArrowRight: MoveDirectionEnum.Right,
    ArrowUp: MoveDirectionEnum.Up,
    ArrowDown: MoveDirectionEnum.Down,
};

export const getDirectionByKey = (key: string): MoveDirectionEnum | undefined => (
    keyToDirectionMap[key as keyof typeof keyToDirectionMap]
);
