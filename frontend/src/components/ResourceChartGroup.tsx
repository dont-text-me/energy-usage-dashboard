"use client";
import ButtonGroup from "@/components/ButtonGroup";
import DateCarousel from "@/components/DateCarousel";
import UsageChart from "@/components/UsageChart";
import UsageHist from "@/components/UsageHist";
import { DateReading, Usage } from "@/utils/types";
import { useState } from "react";
import "./styles/resourceChartGroup.css";
type KVOutputData = [DateReading[], Usage[]];
interface ChartSettings {
  yAxisDomain: [number, number];
  lineColor: string;
}
const ResourceChartGroup = (props: {
  water: KVOutputData;
  electricity: KVOutputData;
  heater: KVOutputData;
}) => {
  const [chartData, setChartData] = useState<KVOutputData>();
  const [chartSettings, setChartSettings] = useState<ChartSettings>();
  const [selectedDate, setSelectedDate] = useState<Date>();
  return (
    <div className="chart-group-container">
      <DateCarousel
        onChange={(date) => {
          setSelectedDate(date);
        }}
        selectedDate={selectedDate}
      />
      <div className="button-group-wrapper">
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
            setChartData(Object(props)[resourceValue]);
            setChartSettings(
              resourceValue === "water"
                ? { yAxisDomain: [1000, 1200], lineColor: "aqua" }
                : resourceValue === "electricity"
                  ? { yAxisDomain: [39000, 41000], lineColor: "green" }
                  : { yAxisDomain: [27000, 30000], lineColor: "orangered" },
            );
          }}
        />
      </div>
      {chartData && (
        <div className="chart-group-container">
          <UsageChart
            data={chartData[0]}
            domain={chartSettings?.yAxisDomain}
            lineStroke={chartSettings?.lineColor}
            selectedDate={selectedDate}
          />
          <UsageHist
            data={chartData[1]}
            lineStroke={chartSettings?.lineColor}
          />
        </div>
      )}
    </div>
  );
};
export default ResourceChartGroup;
