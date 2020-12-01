import { forwardRef } from 'react';
import { useThree } from 'react-three-fiber';
import { Scene } from 'three';


export const Component = forwardRef<Scene>((
    props,
    ref,
) => {
    const { scene } = useThree();
    if ((ref !== null) && (typeof ref !== 'function')) {
        // eslint-disable-next-line no-param-reassign
        ref.current = scene;
    }

    return null;
});
