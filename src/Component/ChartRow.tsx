import React, { FC } from "react";
import { 
    TimeRange,
    TimeSeries
    } from "pondjs";
import {
    ChartContainer,
    ChartRow,
    Charts,
    YAxis,
    Resizable,
    LineChart,
} from "react-timeseries-charts";
import {makeDummy} from "./DummyData"

const makeChartRow = (points: [number, number][], id: string) => {
    const series = new TimeSeries({
        name: id,
        columns: ["time", id],
        points: points,
    });

    return (
        <ChartRow height="200">
            <YAxis
                        id={id}
                        label={id}
                        min={0}
                        max={1}
                        width="70"
                        type="linear"
                    />
                    <Charts>
                        <LineChart
                            axis={id}
                            spacing={1}
                            columns={[id]}
                            series={series}
                            interpolation = "curveStepAfter"
                        />
                    </Charts>
        </ChartRow>
    );
};

const makeChartContainer = () => {

    const dummys = makeDummy();

    const rows = dummys.map((dummy, index) => {
        return makeChartRow(dummy, `row${index}`);
    });

    const dummy = dummys[0];
    const first = new Date(dummy[0][0]);
    const last = new Date(dummy[dummy.length-1][0]);
    const range = new TimeRange(first, last);

    return (
        <ChartContainer timeRange={range}>
            {rows}
        </ChartContainer>
    );
};

export const Rows: FC = () => {
    return (
        <div>
            <p>ChartRow</p>
            {makeChartContainer()}
        </div>
    );
};