type point = [number, number]
export type points = point[];

export const makeDummy = (): points[] => {
    const now = new Date();

    let dummys: points[] = [];
    for(let i = 0; i < 3; i++){
        let dummy: points = [];
        for(let j = 0; j < 10; j++){
            dummy.push([
                now.getTime() + j,
                (i + j) % 2,
            ])
        }
        dummys.push(dummy);
    }
    return dummys;
};