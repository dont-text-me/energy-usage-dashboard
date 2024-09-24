"use client";
import ButtonGroup from "@/components/ButtonGroup";
import PeriodizedUsageBarChart from "@/components/datavis/PeriodizedUsageBarChart";
import UsageChart from "@/components/datavis/UsageChart";
import DateCarousel from "@/components/DateCarousel";
import { ResourceKind } from "@/utils/resourceUsageStats";
import { useState } from "react";
import "./styles/resourceChartGroup.css";
interface ChartSettings {
  resourceName: ResourceKind;
  yAxisDomain: [number, number];
  lineColor: string;
  units: "kWh" | "m3";
}
const ResourceChartGroup = () => {
  const [chartSettings, setChartSettings] = useState<ChartSettings>();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedGrouping, setSelectedGrouping] = useState<string>();
  return (
    <div className="chart-group-container">
      <DateCarousel
        onChange={(date) => {
          setSelectedDate(date);
        }}
        selectedDate={selectedDate}
      />
      <div className="resource-type-button-group-wrapper">
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
            setChartSettings(
              resourceValue === "water"
                ? {
                    resourceName: "cold_water_readings",
                    yAxisDomain: [1000, 1200],
                    lineColor: "aqua",
                    units: "m3",
                  }
                : resourceValue === "electricity"
                  ? {
                      resourceName: "electricity_readings",
                      yAxisDomain: [39000, 41000],
                      lineColor: "green",
                      units: "kWh",
                    }
                  : {
                      resourceName: "heater_readings",
                      yAxisDomain: [27000, 30000],
                      lineColor: "orangered",
                      units: "kWh",
                    },
            );
          }}
        />
      </div>
      <div className="chart-scale-button-group-wrapper">
        <ButtonGroup
          buttonLabels={[
            {
              label: "Week",
              value: "week",
            },
            {
              label: "Month",
              value: "month",
            },
            {
              label: "Year",
              value: "year",
            },
          ]}
          onChange={(value) => setSelectedGrouping(value)}
        />
      </div>
      {chartSettings && (
        <div className="chart-group-container">
          <UsageChart
            resourceKind={chartSettings.resourceName}
            domain={chartSettings.yAxisDomain}
            lineStroke={chartSettings.lineColor}
            selectedDate={selectedDate}
            units={chartSettings.units}
          />
          {selectedGrouping && (
            <PeriodizedUsageBarChart
              resourceKind={chartSettings.resourceName}
              grouping={selectedGrouping}
              barFill={chartSettings.lineColor}
              units={chartSettings.units}
            />
          )}
        </div>
      )}
    </div>
  );
};
export default ResourceChartGroup;
