"use client";
import { DateReading } from "@/utils/types";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
const UsageChart = ({
  data,
  domain,
  lineStroke,
}: {
  data: DateReading[];
  domain?: [number, number];
  lineStroke?: string;
}) => {
  return (
    <ResponsiveContainer width="60%" height={400}>
      <LineChart width={500} height={300} data={data} margin={{ left: 20 }}>
        <XAxis dataKey={"date"} tick={false} label="Date" />
        <YAxis dataKey={"amount"} domain={domain}></YAxis>
        <Line dataKey={"amount"} stroke={lineStroke} />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default UsageChart;
