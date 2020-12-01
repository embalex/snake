import React, { useEffect, useRef } from 'react';
import { extend, useThree } from 'react-three-fiber';

import { FIELD_SIZE } from '../constants';
import * as resources from '../resources';
import { degToRad } from '../utils';


extend(resources);

export const Camera: React.FC = () => {
    const cameraRef = useRef();
    const orbitControlRef = useRef();
    const {
        scene,
        setDefaultCamera,
        camera: originCamera,
        gl: { domElement },
    } = useThree();

    useEffect(() => {
        const camera = cameraRef?.current;
        if (!camera) {
            return;
        }

        setDefaultCamera(camera);
    }, [setDefaultCamera, scene]);

    return (
        <group>
            <perspectiveCamera
                ref={cameraRef}
                position={[FIELD_SIZE, FIELD_SIZE, FIELD_SIZE]}
                up={[0, 0, 1]}
            />
            <orbitControls
                enablePan={false}
                ref={orbitControlRef}
                args={[originCamera, domElement]}
                enableKeys={false}
                minZoom={1}
                maxZoom={1}
                minDistance={1.3 * FIELD_SIZE}
                maxDistance={3 * FIELD_SIZE}
                enableDamping
                dampingFactor={0.05}
                screenSpacePanning={false}
                minPolarAngle={degToRad(0)}
                maxPolarAngle={degToRad(75)}
            />
        </group>
    );
};
