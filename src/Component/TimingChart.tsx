import React, { FC, useMemo, useState } from "react";
import { FormControlLabel, FormGroup, Stack, Switch } from "@mui/material";

import { TimeRange, TimeSeries } from "pondjs";
import {
    Brush,
    ChartContainer,
    ChartRow,
    Charts,
    YAxis,
    Resizable,
    LineChart,
    ValueAxis,
} from "react-timeseries-charts";

const makeDummyData = (num: number) => {
    let dummys = [];
    for (let i: number = 0; i < num; i++) {
        const val1: number = i % 4 ? 0 : 1;
        const val2: number = i % 6 ? 0 : 1;
        const val3: number = i % 5 ? 0 : 1;
        const val4: number = i % 8 ? 0 : 1;
        dummys.push([i, val1, val2, val3, val4]);
    }
    return dummys;
};

const data = makeDummyData(100);
const seriesDummy = new TimeSeries({
    name: "seriesDummy",
    columns: ["time", "port1", "port2", "port3", "port4"],
    points: data,
});

const start = 0;
const rangeFull = seriesDummy.timerange();
const rangeStart = new TimeRange(new Date(start), new Date(start + 20));

//タイミングチャート
export const TimingChart = () => {
    //複数行グラフ用
    const [tracker, SetTracker] = useState<Date>(new Date(start));
    const [rangeShow, setRangeShow] = useState<TimeRange>(
        new TimeRange(rangeStart)
    );
    const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
    //範囲指定用
    const [check, setCheck] = useState<boolean>(false);
    const [rangeTime, setRangeTime] = useState<TimeRange | null>(null);

    //トラッカーハンドラ
    const handleTrackerChanged = (t: Date) => {
        SetTracker(t);
    };

    //範囲変更ハンドラ
    const handleTimeRangeChange = (timerange: TimeRange) => {
        console.log("handleTimeRangeChange");
        console.log(
            `${timerange.begin().getTime()}, ${timerange.end().getTime()}`
        );
        if (timerange) {
            setRangeShow(timerange);
            console.log("set");
        } else {
            console.log("not set");
        }
    };

    //マウス移動ハンドラ
    const handleMouseMove = (x: number, y: number) => {
        setPos({ x, y });
    };

    //スイッチハンドラ
    const handleChangeSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.checked) {
            setRangeTime(null);
        }
        setCheck(event.target.checked);
    };

    //線を作成
    const makeLineChart = (
        axis: string,
        series: TimeSeries,
        column: string
    ) => {
        return (
            <LineChart
                axis={axis}
                spacing={1}
                columns={[column]}
                series={series}
                interpolation="curveStepAfter"
            />
        );
    };

    //複数行グラフを作成
    const makeChartContainer = () => {
        const makeChartRow = (series: TimeSeries, column: string) => {
            let valueAxis: string | number = "--";
            let infoValue = [];
            if (tracker) {
                const event = series.atTime(tracker);
                const v: number = event.get(column);
                if (v != null) {
                    //value = parseInt(v, 10);
                    valueAxis = v;
                }

                infoValue.push({
                    label: "value",
                    value: v,
                });
            }

            const idYAxis: string = `axis-${column}`;
            const idValueAxis: string = `valueAxis-${column}`;
            return (
                <ChartRow
                    height="200"
                    axisMargin={0}
                    trackerInfoValues={infoValue}
                    trackerInfoHeight={30}
                    trackerInfoWidth={70}
                >
                    <YAxis
                        id={idYAxis}
                        label={column}
                        min={0}
                        max={1.1}
                        type="linear"
                        tickCount={1}
                    />
                    <Charts>{makeLineChart(idYAxis, series, column)}</Charts>
                    {check ? (
                        <Brush
                            timeRange={rangeTime}
                            onTimeRangeChanged={(range: TimeRange) => {
                                if (range) {
                                    setRangeTime(range);
                                }
                            }}
                            allowSelectionClear={true}
                        />
                    ) : null}
                    <ValueAxis
                        id={idValueAxis}
                        value={valueAxis}
                        width={70}
                        min={0}
                        max={1}
                    />
                </ChartRow>
            );
        };

        return (
            <ChartContainer
                timeRange={rangeShow}
                enablePanZoom={!check}
                format={(date: Date) => `${date.getTime()}`}
                minTime={seriesDummy.timerange().begin()}
                maxTime={seriesDummy.timerange().end()}
                minDuration={20}
                trackerPosition={tracker}
                onTrackerChanged={handleTrackerChanged}
                onTimeRangeChanged={handleTimeRangeChange}
                onMouseMove={handleMouseMove}
            >
                {makeChartRow(seriesDummy, "port1")}
                {makeChartRow(seriesDummy, "port2")}
                {makeChartRow(seriesDummy, "port3")}
                {makeChartRow(seriesDummy, "port4")}
            </ChartContainer>
        );
    };

    //範囲設定グラフを作成
    const makeBrush = () => {
        return (
            <ChartContainer
                timeRange={rangeFull}
                format={(date: Date) => `${date.getTime()}`}
                trackerPosition={tracker}
                onTrackerChanged={handleTrackerChanged}
            >
                <ChartRow height="150">
                    <Brush
                        timeRange={rangeShow}
                        onTimeRangeChanged={handleTimeRangeChange}
                    />
                    <YAxis
                        id="axis"
                        label="brush"
                        min={0}
                        max={1}
                        type="linear"
                        tickCount={2}
                    />
                    <Charts>
                        {makeLineChart("axis", seriesDummy, "port1")}
                        {makeLineChart("axis", seriesDummy, "port2")}
                        {makeLineChart("axis", seriesDummy, "port3")}
                        {makeLineChart("axis", seriesDummy, "port4")}
                    </Charts>
                </ChartRow>
            </ChartContainer>
        );
    };

    return (
        <>
            <p>タイミングチャートを目指して</p>
            <Resizable>{makeChartContainer()}</Resizable>
            <Resizable>{makeBrush()}</Resizable>
            <FormGroup>
                <FormControlLabel
                    control={
                        <Switch
                            checked={check}
                            onChange={handleChangeSwitch}
                            name="switch"
                        />
                    }
                    label={`range=${rangeTime ? rangeTime.duration() : "---"}`}
                />
            </FormGroup>
        </>
    );
};
