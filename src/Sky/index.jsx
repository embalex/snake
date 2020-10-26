import React from 'react';
import { Sky as OriginalSky } from 'drei';
import { Vector3 } from 'three';


export const Sky = () => (
    <OriginalSky sunPosition={new Vector3(100, 1, 100)} />
);
