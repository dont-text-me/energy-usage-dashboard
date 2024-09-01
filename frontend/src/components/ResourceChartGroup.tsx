"use client";
import ButtonGroup from "@/components/ButtonGroup";
import DateCarousel from "@/components/DateCarousel";
import Loading from "@/components/Loading";
import UsageChart from "@/components/UsageChart";
import { DateReading } from "@/utils/types";
import { useEffect, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import "./styles/resourceChartGroup.css";
interface ChartSettings {
  resourceName: "cold_water" | "electricity" | "heater";
  yAxisDomain: [number, number];
  lineColor: string;
}

const fetcher = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();

  // Convert 'date' fields to Date objects
  data.forEach((item) => {
    if (item.date && typeof item.date === "string") {
      item.date = new Date(item.date);
    }
  });

  return data;
};

const ResourceChartGroup = () => {
  const { mutate } = useSWRConfig();
  const [chartData, setChartData] = useState<DateReading[]>();
  const [chartSettings, setChartSettings] = useState<ChartSettings>();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const { data, isLoading } = useSWR<DateReading[]>(
    chartSettings
      ? `/api/getReadings?resource_type=${chartSettings?.resourceName}_readings`
      : null,
    fetcher,
  );
  useEffect(() => {
    mutate(
      `/api/getReadings?resource_type=${chartSettings?.resourceName}_readings`,
    );
    setChartData(data);
  }, [data, chartSettings?.resourceName, mutate]);
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
            //setChartData(Object(props)[resourceValue]);
            setChartSettings(
              resourceValue === "water"
                ? {
                    resourceName: "cold_water",
                    yAxisDomain: [1000, 1200],
                    lineColor: "aqua",
                  }
                : resourceValue === "electricity"
                  ? {
                      resourceName: "electricity",
                      yAxisDomain: [39000, 41000],
                      lineColor: "green",
                    }
                  : {
                      resourceName: "heater",
                      yAxisDomain: [27000, 30000],
                      lineColor: "orangered",
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
              value: "cold_water",
            },
            {
              label: "Month",
              value: "electricity",
            },
            {
              label: "Year",
              value: "heater",
            },
          ]}
          onChange={() => {}}
        />
      </div>
      {isLoading && <Loading />}
      {chartData && chartSettings && (
        <div className="chart-group-container">
          <UsageChart
            data={chartData}
            domain={chartSettings.yAxisDomain}
            lineStroke={chartSettings.lineColor}
            selectedDate={selectedDate}
            units={
              ["heater", "electricity"].includes(chartSettings.resourceName)
                ? "kWh"
                : "m3"
            }
          />
          {/*<UsageHist data={chartData[1]} lineStroke={chartSettings.lineColor} />*/}
        </div>
      )}
    </div>
  );
};
export default ResourceChartGroup;
