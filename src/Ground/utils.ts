interface ITreePosition {
    x: number;
    y: number;
    angle: number;
}

export const getRandomPositions = (amount: number, worldSize: number, freeFieldSize: number): ITreePosition[] => (
    new Array(amount).fill(0).map(() => {
        const getRandomCoordinates = () => ([
            Math.floor((Math.random() - 0.5) * worldSize),
            Math.floor((Math.random() - 0.5) * worldSize),
        ]);

        const isInFreeField = (testX: number, testY: number): boolean => (
            (testX >= -freeFieldSize) && (testX <= freeFieldSize)
            && (testY >= -freeFieldSize) && (testY <= freeFieldSize)
        );

        const [x, y] = getRandomCoordinates();

        return (isInFreeField(x, y)
            ? null
            : {
                x,
                y,
                angle: Math.floor(Math.random() * 4) * (Math.PI / 2),
            }
        );
    }).filter((value): value is ITreePosition => Boolean(value))
);


const DIVIDER = 8;
export const getBushesPositions = (amount: number, worldSize: number, freeFieldSize: number): ITreePosition[] => {
    const sideArraySize = Math.floor((2 * freeFieldSize) / DIVIDER);
    const randomBushesAmount = amount > sideArraySize * 4
        ? amount - sideArraySize * 4
        : 0;
    return [
        ...new Array(sideArraySize).fill(0).map((_, index) => ({
            x: -freeFieldSize + index * DIVIDER,
            y: -freeFieldSize,
            angle: Math.random() * Math.PI * 2,
        })),
        ...new Array(sideArraySize).fill(0).map((_, index) => ({
            x: -freeFieldSize + index * DIVIDER,
            y: freeFieldSize,
            angle: Math.random() * Math.PI * 2,
        })),
        ...new Array(sideArraySize).fill(0).map((_, index) => ({
            x: freeFieldSize,
            y: -freeFieldSize + index * DIVIDER,
            angle: Math.random() * Math.PI * 2,
        })),
        ...new Array(sideArraySize).fill(0).map((_, index) => ({
            x: -freeFieldSize,
            y: -freeFieldSize + index * DIVIDER,
            angle: Math.random() * Math.PI * 2,
        })),
        ...getRandomPositions(randomBushesAmount, worldSize, freeFieldSize + 1),
    ];
};
