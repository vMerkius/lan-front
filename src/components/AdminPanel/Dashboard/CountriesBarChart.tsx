import React from "react";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from "victory";

type CountryBarChartProps = {
  data: { country: string; count: number }[];
};

const CountryBarChart: React.FC<CountryBarChartProps> = ({ data }) => {
  return (
    <div className="dashboard__info-section__country__bar">
      <VictoryChart
        padding={{ top: 20, bottom: 60, left: 20, right: 20 }}
        width={200}
        height={200}
        domainPadding={20}
        theme={VictoryTheme.material}
      >
        <VictoryAxis
          style={{
            tickLabels: {
              fontSize: 8,
              angle: 45,
              textAnchor: "start",
              verticalAnchor: "middle",
            },
          }}
          tickValues={data.map((d) => d.country)}
        />
        <VictoryAxis
          style={{
            tickLabels: {
              fontSize: 8,
              textAnchor: "start",
              verticalAnchor: "middle",
            },
          }}
          dependentAxis
        />
        <VictoryBar
          data={data}
          x="country"
          y="count"
          barWidth={5}
          style={{ data: { fill: "#c43a31" } }}
        />
      </VictoryChart>
    </div>
  );
};

export default CountryBarChart;
