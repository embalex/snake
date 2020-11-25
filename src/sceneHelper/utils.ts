import { Object3D, Scene } from 'three';


export const getObject3DByName = (scene: Scene, name: string): Object3D | never => {
    const object3D = scene.children.find((value) => value.name === name);

    if (object3D === undefined) {
        throw new Error(`getObject3DByName. Can't find model with name=${name}`);
    }

    return object3D;
};
