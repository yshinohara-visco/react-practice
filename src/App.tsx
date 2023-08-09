import* as React from 'react';
import { XChart } from './MuiXCharts';
import { BarChart } from '@mui/x-charts';

const App= () => {

  const dataX: string[] = [
    "barA", "barB", "barC"
  ];
  const data: number[] = [
    2, 5, 3
  ];

  return (
    <>
      <BarChart
        xAxis={[
          {
            id: "barCategories",
            data: dataX,
            scaleType: "band",
          },
        ]}
        series={[{data: data}]}
        width={500}
        height={300}
      />
      <XChart />
    </>
  );
}
export default App;

