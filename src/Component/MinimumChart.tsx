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
    [0, 1],
    [1, 0],
    [2, 1],
    [3, 0],
];

const series = new TimeSeries({
    name: "testSeries",
    columns: ["time", "test"],
    points: data,
})

export const MinimumChart = () => {

    return (
        <div>
            <p>test</p>
            <Resizable>
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
                            <LineChart
                                axis="test"
                                spacing={1}
                                columns={["test"]}
                                series={series}
                                interpolation = "curveStepAfter"
                            />
                        </Charts>
                    </ChartRow>
                </ChartContainer>
            </Resizable>
        </div>
    );
};