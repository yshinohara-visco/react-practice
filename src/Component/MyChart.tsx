import { FC, useState } from "react";
import { TimeSeries } from "pondjs";
import {
    ChartContainer,
    ChartRow,
    Charts,
    YAxis,
    Resizable,
    LineChart,
} from "react-timeseries-charts";

//ライブラリから暗黙に渡される項目は?付きで宣言しておけば使えるらしい
interface CrossHairsProps {
    x: number;
    y: number;
    width?: number;
    height?: number;
    timeScale?: Function;
}
const CrossHairs: React.FC<CrossHairsProps> = (props) => {
    const { x, y, width, height } = props;
    console.log(`x=${x} y=${y} width=${width} height=${height}`);

    const style = { PointerEvents: "none", stroke: "#fcc" };

    const { timeScale } = props;
    if (timeScale) {
        console.log("timeScaleは有ります");
        console.log(`${typeof timeScale}`);
        console.log(`${timeScale(new Date(1))}`);
        console.log(`${timeScale(1.5)}`);
    }

    if (x && y) {
        return (
            <g>
                <line style={style} x1={0} y1={y} x2={width} y2={y} />
                <line style={style} x1={x} y1={0} x2={x} y2={height} />
            </g>
        );
    } else {
        return <g />;
    }
};

//timeScaleに割り込んで小数を足せないかと思ったが上手くいかなかった
//必要なPropsが渡らなくなったし、足すべき小数を特定できない atTime()で特定できたか？
interface MyLineChartProps {
    axis: string;
    column: [string];
    series: TimeSeries;
    timeScale?: Function;
    yScale?: Function;
}
const MyLineChart: FC<MyLineChartProps> = (props) => {
    const { axis, column, series, timeScale, yScale } = props;

    if (timeScale && yScale) {
        return (
            <LineChart
                axis={axis}
                spacing={1}
                column={column}
                series={series}
                interpolation="curveStepAfter"
                timeScale={(date: Date) => {
                    timeScale(date.getTime() + 0.2);
                }}
                yScale={yScale}
            />
        );
    } else {
        return <></>;
    }
};

const data = [
    [0.1, 0],
    [1.2, 1],
    [1.3, 0],
    [2.1, 1],
    [2.2, 0],
    [3.3, 1],
    [4.4, 0],
    [5.5, 1],
    [6.6, 0],
    [7.7, 1],
    [8.8, 0],
    [9.9, 1],
];

const data2 = [
    [0, 100, 0],
    [1, 200, 1],
    [1, 300, 0],
    [2, 100, 1],
    [2, 200, 0],
    [3, 300, 1],
    [4, 400, 0],
    [5, 500, 1],
    [6, 600, 0],
    [7, 700, 1],
    [8, 800, 0],
    [9, 900, 1],
];

const series = new TimeSeries({
    name: "mySeries",
    columns: ["time", "value"],
    points: data,
});
const series2 = new TimeSeries({
    name: "seriesWithNano",
    columns: ["time", "ns", "value"],
    points: data2,
});

type pos = {
    x: number;
    y: number;
};
export const MyChart = () => {
    const [pos, setPos] = useState<pos | null>(null);

    const handleMouseMove = (x: number, y: number) => {
        setPos({ x, y });
    };

    return (
        <div>
            <p>小数の位置にプロット出来ないか？</p>
            <ChartContainer
                timeRange={series.timerange()}
                format={(date: Date) => `${date.getTime()}`}
                onMouseMove={handleMouseMove}
            >
                <ChartRow height={200}>
                    <YAxis
                        id="axis"
                        label="axis"
                        min={0}
                        max={1}
                        width={70}
                        type="linear"
                    />
                    <Charts>
                        <LineChart
                            axis="axis"
                            spacing={1}
                            column={["value"]}
                            series={series}
                            interpolation="curveStepAfter"
                        />
                        {/*<MyLineChart 上手くいかなかった
                            axis="axis"
                            column={["value"]}
                            series={series2}
                        />*/}
                        {pos ? <CrossHairs x={pos.x} y={pos.y} /> : <></>}
                    </Charts>
                </ChartRow>
            </ChartContainer>
        </div>
    );
};
