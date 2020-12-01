import React from 'react';

import { MAX_MAGMACUBES, NAME } from './constants';
import { Model } from './model';


export const Snake: React.FC = () => (
    <>
        <Model.Ducky
            name={NAME.Ducky}
            position={[0, 0]}
            angle={0}
        />
        {new Array(MAX_MAGMACUBES).fill(0).map((_, index) => (
            <Model.Magmacube
                /* eslint-disable-next-line react/no-array-index-key */
                key={NAME.createMagmacubeName(index)}
                name={NAME.createMagmacubeName(index)}
                cubeNumber={index}
            />
        ))}
    </>
);
