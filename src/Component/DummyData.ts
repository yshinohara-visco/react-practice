type point = [number, number]
export type points = point[];

export const makeDummy = (numRow: number, numPlot: number) => {
    const now = new Date();

    let dummys: points[] = [];
    for (let i = 0; i < numRow; i++) {
        let dummy: points = [];
        for (let j = 0; j < numPlot; j++) {
            dummy.push([
                now.getTime() + j,
                (i + j) % 2,
            ])
        }
        dummys.push(dummy);
    }
    return {
        start: now,
        end: new Date(now.getTime() + numPlot - 1),
        dummys,
    };
};