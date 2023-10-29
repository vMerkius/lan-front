import { VictoryPie, VictoryLabel } from "victory";

type GenderPieChartProps = {
  data: { x: string; y: number }[];
};

const GenderPieChart: React.FC<GenderPieChartProps> = ({ data }) => {
  console.log(data);

  return (
    <div className="dashboard__age-section__age-pie">
      <VictoryPie
        width={100}
        height={100}
        data={data}
        innerRadius={34}
        labelRadius={10}
        style={{ labels: { fontSize: 8, fill: "white" } }}
        labels={({ datum }) => datum.y}
        colorScale={["#0575c0", "#ee6767"]}
        animate={{ duration: 1500 }}
      />
    </div>
  );
};

export default GenderPieChart;
