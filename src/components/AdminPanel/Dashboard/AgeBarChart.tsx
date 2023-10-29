import React from "react";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from "victory";

type AgeBarChartProps = {
  data: { ageGroup: string; count: number }[];
};

const AgeBarChart: React.FC<AgeBarChartProps> = ({ data }) => {
  return (
    <div className="dashboard__age-section__age-bar">
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
          tickValues={data.map((d) => d.ageGroup)}
          // label="Age Groups"
        />
        <VictoryAxis
          style={{
            tickLabels: {
              fontSize: 8,
              textAnchor: "start",
              verticalAnchor: "middle",
            },
          }}
          dependentAxis /*label="Count"*/
        />
        <VictoryBar
          data={data}
          x="ageGroup"
          y="count"
          barWidth={5}
          style={{ data: { fill: "#c43a31" } }}
        />
      </VictoryChart>
    </div>
  );
};

export default AgeBarChart;
