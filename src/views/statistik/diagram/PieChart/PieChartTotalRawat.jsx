import { ResponsivePie } from "@nivo/pie";
import {
  calculateTotals,
  DataPegawaiRawat,
} from "../../model/dataPegawaiRawat";
import PropTypes from "prop-types";

const PieChart = ({ dataInput, colors }) => {
  PieChart.propTypes = {
    dataInput: PropTypes.array.isRequired,
    colors: PropTypes.arrayOf(PropTypes.string),
  };

  const percentages = calculateTotals(dataInput);

  const data = [
    { id: "BPJS", value: percentages.bpjs },
    { id: "Non-BPJS", value: percentages.nonBpjs },
  ];

  return (
    <ResponsivePie
      data={data}
      margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
      sortByValue={true}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderColor={{ theme: "background" }}
      enableArcLinkLabels={false}
      innerRadius={0.6}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      colors={colors}
      arcLinkLabelsColor={{ from: "color", modifiers: [] }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["brighter", 5]],
      }}
      valueFormat={(value) => `${value}%`}
    />
  );
};

export default PieChart;
