import React, { FC } from "react";

import { TimeRange, TimeSeries } from "pondjs";
import {
    Brush,
    ChartContainer,
    ChartRow,
    Charts,
    YAxis,
    Resizable,
    LineChart,
} from "react-timeseries-charts";

import { makeDummy } from "./DummyData";

//グラフに表示するデータの用意
const { start, end, dummys } = makeDummy(3, 50);

type channel = {
    id: string;
    series: TimeSeries;
};
const channels: channel[] = dummys.map((dummy, index) => {
    const id = `row${index}`;
    return {
        id: id,
        series: new TimeSeries({
            name: id,
            columns: ["time", id],
            points: dummy,
        }),
    };
});

//1行分のグラフを作成
const makeChartRow = (channel: channel) => {
    return (
        <ChartRow height="200">
            <YAxis
                id={channel.id}
                label={channel.id}
                min={0}
                max={1}
                width="70"
                type="linear"
            />
            <Charts>
                <LineChart
                    axis={channel.id}
                    spacing={1}
                    columns={[channel.id]}
                    series={channel.series}
                    interpolation="curveStepAfter"
                />
            </Charts>
        </ChartRow>
    );
};

//ダミーデータから複数行グラフを作成
const makeChartContainer = () => {
    const rows = channels.map((channel, index) => {
        return makeChartRow(channel);
    });

    return (
        <ChartContainer timeRange={new TimeRange(start, end)}>
            {rows}
        </ChartContainer>
    );
};

const makeBrush = () => {
    return (
        <ChartContainer timeRange={new TimeRange(start, end)}>
            <ChartRow hieght="100">
                <Brush
                    timeRange={
                        new TimeRange(start, new Date(start.getTime() + 10))
                    }
                />
                <YAxis
                    id="axis"
                    label="all"
                    min={0}
                    max={1}
                    width="70"
                    type="linear"
                />
                <Charts>
                    {channels.map((channel: channel) => {
                        return (
                            <LineChart
                                axis="axis"
                                spacing={1}
                                columns={[channel.id]}
                                series={channel.series}
                                interpolation="curveStepAfter"
                            />
                        );
                    })}
                </Charts>
            </ChartRow>
        </ChartContainer>
    );
};

//メイン
export const Rows: FC = () => {
    return (
        <div>
            <p>ChartRow</p>
            {makeChartContainer()}
            {makeBrush()}
        </div>
    );
};
