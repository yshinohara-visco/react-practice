import React, { FC } from "react";
import { TimeRange, TimeSeries } from "pondjs";
import {
    ChartContainer,
    ChartRow,
    Charts,
    YAxis,
    LineChart,
} from "react-timeseries-charts";

const series1 = new TimeSeries({
    name: "series1",
    columns: ["time", "value"],
    points: [
        [0, 0],
        [2, 1],
        [4, 2],
        [6, 4],
        [8, 1],
        [10, 5],
    ],
});

const series2 = new TimeSeries({
    name: "series2",
    columns: ["time", "value"],
    points: [
        [1, 3],
        [3, 2],
        [5, 0],
        [7, 5],
        [9, 4],
        [11, 3],
    ],
});

//小数（ナノ秒）を渡してもグラフ上のプロットはミリ秒の位置になる
const series3 = new TimeSeries({
    name: "series3",
    columns: ["time", "value"],
    points: [
        [0.5, 0],
        [0.9, 1],
        [1.2, 0],
        [1.8, 1],
        [2.4, 0],
        [3, 1],
        [3.6, 0],
    ],
});

const range = new TimeRange(new Date(0), new Date(10));

export const MultiSeries = () => {
    return (
        <div>
            <p>seriesを分けることで異なる時系列データを表示できる</p>
            <ChartContainer timeRange={range}>
                <ChartRow height="200">
                    <YAxis
                        id="axis"
                        label="test"
                        min={0}
                        max={5}
                        width="70"
                        type="linear"
                    />
                    <Charts>
                        <LineChart
                            axis="axis"
                            spacing={1}
                            columns={["value"]}
                            series={series1}
                            interpolation="curveStepAfter"
                        />
                        <LineChart
                            axis="axis"
                            spacing={1}
                            columns={["value"]}
                            series={series2}
                            interpolation="curveStepAfter"
                        />
                        <LineChart
                            axis="axis"
                            spacing={1}
                            columns={["value"]}
                            series={series3}
                            interpolation="curveStepAfter"
                        />
                    </Charts>
                </ChartRow>
            </ChartContainer>
        </div>
    );
};
