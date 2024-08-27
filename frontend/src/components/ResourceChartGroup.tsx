"use client";
import ButtonGroup from "@/components/ButtonGroup";
import UsageChart from "@/components/UsageChart";
import UsageHist from "@/components/UsageHist";
import { DateReading, Usage } from "@/utils/types";
import { useState } from "react";
import "./styles/resourceChartGroup.css";
type KVOutputData = [DateReading[], Usage[]];
const ResourceChartGroup = (props: {
  water: KVOutputData;
  electricity: KVOutputData;
  heater: KVOutputData;
}) => {
  const [chartData, setChartData] = useState<KVOutputData>();
  return (
    <>
      <ButtonGroup
        buttonLabels={[
          {
            label: "Water",
            value: "water",
          },
          {
            label: "Electricity",
            value: "electricity",
          },
          {
            label: "Heater",
            value: "heater",
          },
        ]}
        onChange={(resourceValue) => {
          setChartData(props.water);
        }}
      />
      {chartData && (
        <div>
          <UsageChart
            data={chartData[0]}
            domain={[1000, 1100]}
            lineStroke="aqua"
          />
          <UsageHist data={chartData[1]} lineStroke="aqua" />
        </div>
      )}
    </>
  );
};
export default ResourceChartGroup;
