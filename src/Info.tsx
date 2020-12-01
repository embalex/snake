import React from 'react';


interface IProps {
    score: number;
}

export const Info: React.FC<IProps> = ({ score }) => (
    <div className="info-wrapper">
        <p className="info-score">{`Score: ${score}`}</p>
        <p>&apos;←&apos; - turn left</p>
        <p>&apos;→&apos; - turn right</p>
        <p>&apos;r&apos; - restart game</p>
    </div>
);
