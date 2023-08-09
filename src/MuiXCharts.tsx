import { Stack } from '@mui/material';
import { AllSeriesType, BarChart, BarPlot, ChartContainer, ChartsXAxis, ChartsYAxis, HighlightScope, LineChart, LinePlot } from '@mui/x-charts';
import React, { FC } from 'react';

type point = {
    time: number;
    value: number;
}
const dummyData: point[] = [
    {time: 0, value: 0},
    {time: 1.1, value: 1},
    {time: 2, value: 0},
    {time: 2.2, value: 1},
    {time: 3, value: 0},
];
const dummyData2: point[] = [
    {time: 0, value: 1},
    {time: 1.8, value: 0},
    {time: 2.1, value: 1},
    {time: 2.8, value: 0},
    {time: 3, value: 1},
];
const dummyData3: point[] = [
    {time: 0, value: 0},
    {time: 0.7, value: 1},
    {time: 1.3, value: 0},
    {time: 1.5, value: 1},
    {time: 4, value: 0},
];
const getTime = (data: point[]): number[] => {
    return data.map((point) => {
        return point.time;
    });
};
const getValue = (data: point[]): number[] => {
    return data.map((point) => {
        return point.value;
    });
};

export const XChart = () => {

    return (
        <>
            <p>01グラフを並べて比較したい</p>
            <Stack>
                <p>個別のグラフを並べた場合比較等がしにくい</p>
                <IOChartSingle data={dummyData} />
                <IOChartSingle data={dummyData2} />
                
                <p>無理やり一つのグラフにずらして表示してみたが思ったのと違う</p>
                <IOChartMulti arrayData={[dummyData, dummyData2, dummyData3]} />
            </Stack>
        </>
    );
};

const IOChartSingle: FC<{data: point[]}> = (props) => {
    const {data} = props;
    const times = getTime(data);
    const values = getValue(data);

    return (
        <LineChart
            xAxis={[
                {
                    data: times,
                    disableLine: false,
                    disableTicks: false,
                    min: 0,
                    max: 5,
                },
            ]}
            yAxis={[
                {
                    scaleType: "linear",
                    min: -0.2,
                    max: 1.2
                },
            ]}
            series={[
                {
                    data: values,
                    curve: "stepAfter"
                }
            ]}
            width={500}
            height={200}
            margin={{bottom: 30, top: 0}}
        />
    );
};

const IOChartMulti: FC<{arrayData: point[][]}> = (props) => {
    const {arrayData} = props;
    const margin: number = 0.2;
    const space: number = 1.5;

    return (
        <LineChart 
            xAxis={arrayData.map((data: point[], index: number) => {
                return {
                    id: `data${index}`,
                    data: getTime(data),
                    scaleType: "linear",
                    min: 0,
                    max: 5,
                };
            })}
            yAxis={arrayData.map((data: point[], index: number) => {
                return {
                    id: `data${index}`,
                    scaleType: "linear",
                    min: 0 - margin - space*(arrayData.length - index - 1),
                    max: 1 + margin + space*index,
                }
            })}
            series={arrayData.map((data: point[], index: number) => {
                return {
                    xAxisKey: `data${index}`,
                    yAxisKey: `data${index}`,
                    data: getValue(data),
                    curve: "stepAfter",
                };
            })}
            width={500}
            height={arrayData.length * 200}
        />
    );
};