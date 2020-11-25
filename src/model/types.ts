export interface IModel {
    angle: number;
    name: string;
    position: [number, number];
}

export interface IWithAnimation {
    type: 'defined';
    number: number;
    speed: number;
    offset: number;
}

export interface IWithoutAnimation {
    type: 'undefined';
}

export type IAnimation = IWithAnimation | IWithoutAnimation;
