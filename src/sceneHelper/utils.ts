import { Object3D, Scene } from 'three';

import { NAME } from '../constants';
import { IPosition } from '../types';


export const getObject3DByName = (scene: Scene, name: string): Object3D | never => {
    const object3D = scene.children.find((value) => value.name === name);

    if (object3D === undefined) {
        throw new Error(`getObject3DByName. Can't find model with name=${name}, scene=${scene}`);
    }

    return object3D;
};

export const getObject3DPositionByName = (scene: Scene, name: string): IPosition | never => {
    const object3D = getObject3DByName(scene, name);

    return {
        x: object3D.position.x,
        y: object3D.position.y,
        angle: object3D.rotation.z,
    };
};

export const setObject3DPositionByName = (scene: Scene, name: string, position: IPosition): void | never => {
    const object3D = getObject3DByName(scene, name);

    object3D.position.setX(position.x);
    object3D.position.setY(position.y);
    object3D.position.setZ(0);
    object3D.rotation.set(0, 0, position.angle);
};

export const isSceneReady = (scene: Scene): boolean => {
    try {
        getObject3DByName(scene, NAME.Ducky);
        getObject3DByName(scene, NAME.Apple);

        return true;
    } catch (error) {
        return false;
    }
};
