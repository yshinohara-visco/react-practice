import React from "react";
//import { TryChart } from './Component/TryTimeseriesCharts';
import { MinimumChart } from "./Component/MinimumChart";
import { MultiSeries } from "./Component/MultiSeries";
import { Rows } from "./Component/ChartRow";
import { TimingChart } from "./Component/TimingChart";
import { MyChart } from "./Component/MyChart";

function App() {
    return (
        <div>
            {/*<TryChart />*/}
            {/*<MinimumChart />*/}
            {/*<MultiSeries />*/}
            {/*<Rows />*/}
            <TimingChart />
            {/*<MyChart />*/}
        </div>
    );
}

export default App;
