import React from 'react';
import { useThree } from 'react-three-fiber';


export const CameraHelper: React.FC = () => {
    const { camera } = useThree();

    return <cameraHelper args={[camera]} />;
};
