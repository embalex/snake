import React from 'react';

import { Model } from './model';


interface IItemPosition {
    x: number;
    y: number;
    angle: number;
}

interface IProps {
    head: IItemPosition;
    magmacubes: IItemPosition[];
}

export const Snake = React.forwardRef<React.ReactNode, IProps>(({ head, magmacubes }, snakeRef) => (
    <>
        <Model.Ducky
            ref={snakeRef}
            // position={[head.x, head.y]}
            // angle={head.angle}
            position={[0, 0]}
            angle={0}
        />

        {magmacubes.map(({ x, y, angle }, index) => (
            <Model.Magmacube
                /* eslint-disable-next-line react/no-array-index-key */
                key={index}
                position={[x, y]}
                cubeNumber={index}
                angle={angle}
            />
        ))}
    </>
));
