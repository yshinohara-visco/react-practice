import React, { FC } from "react";
import { TimeSeries } from "pondjs";
import {
    ChartContainer,
    ChartRow,
    Charts,
    YAxis,
    Resizable,
    LineChart,
} from "react-timeseries-charts";

const data = [
    [0, 1, 0],
    [1, 0, 2],
    [2, 1, 3],
    [3, 0, 4],
];

const series = new TimeSeries({
    name: "testSeries",
    columns: ["time", "test", "test2"],
    points: data,
});

export const MinimumChart = () => {
    return (
        <div>
            <p>
                一つの時系列ならば一つのseriresに値を複数入れ、各Chartから指定すればいい
            </p>
            <ChartContainer timeRange={series.timerange()}>
                <ChartRow height="200">
                    <YAxis
                        id="test"
                        label="test"
                        min={0}
                        max={5}
                        width="70"
                        type="linear"
                    />
                    <Charts>
                        {/*ここで複数指定することで複数の線を引ける */}
                        <LineChart
                            axis="test"
                            spacing={1}
                            columns={["test", "test2"]}
                            series={series}
                            interpolation="curveStepAfter"
                        />
                        {/*<LineChart
                            axis="test"
                            spacing={1}
                            columns={["test2"]}
                            series={series}
                            interpolation="curveStepAfter"
                        />*/}
                    </Charts>
                </ChartRow>
            </ChartContainer>
        </div>
    );
};
