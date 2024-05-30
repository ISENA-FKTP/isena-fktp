import { ResponsiveBar } from "@nivo/bar";
import {
  DataPegawaiRawat,
  calculateRawatTotals,
} from "../../model/dataPegawaiRawat";
import PropTypes from "prop-types";

const BarChart = ({ colors, year }) => {
  BarChart.propTypes = {
    year: PropTypes.string,
    colors: PropTypes.arrayOf(PropTypes.string),
  };

  const filteredData = DataPegawaiRawat.filter(
    (data) => new Date(data.awalsakit).getFullYear() === parseInt(year)
  );

  const totals = calculateRawatTotals(filteredData);

  const updatedTotals = {
    ...totals,
  };

  return (
    <ResponsiveBar
      data={[updatedTotals]}
      keys={Object.keys(updatedTotals)}
      indexBy="id"
      margin={{ top: 10, right: 10, bottom: 70, left: 10 }}
      padding={0.15}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={({ id }) => colors[Object.keys(updatedTotals).indexOf(id)]}
      layout="horizontal"
      axisTop={null}
      axisRight={null}
      axisBottom={null}
      axisLeft={null}
      enableLabel={true}
      enableGridY={false}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["brighter", 5]],
      }}
      legends={[
        {
          dataFrom: "keys",
          data: [
            {
              id: "rawatJalan",
              label: "Rawat Jalan",
              color: colors[0],
            },
            { id: "rawatInap", label: "Rawat Inap", color: colors[1] },
            { id: "lainnya", label: "Lainnya", color: colors[2] },
          ],
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 30,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 20,
          symbolShape: "circle",
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default BarChart;
