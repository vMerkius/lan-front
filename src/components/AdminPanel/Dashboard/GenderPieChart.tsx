import { VictoryPie, VictoryLabel } from "victory";

type GenderPieChartProps = {
  data: { x: string; y: number }[];
};

const GenderPieChart: React.FC<GenderPieChartProps> = ({ data }) => {
  return (
    <svg viewBox="0 0 250 250">
      <VictoryPie
        standalone={false}
        width={250}
        height={250}
        data={data}
        innerRadius={(55 / 400) * 250}
        labelRadius={(68 / 400) * 250}
        style={{ labels: { fontSize: 16, fill: "white" } }}
        labels={({ datum }) => datum.y}
        colorScale={["#0575c0", "#ee6767"]}
        animate={{ duration: 1500 }}
      />
      <VictoryLabel
        textAnchor="middle"
        style={{ fontSize: 16 }}
        x={125}
        y={125}
        text="Gender"
      />
    </svg>
  );
};

export default GenderPieChart;
