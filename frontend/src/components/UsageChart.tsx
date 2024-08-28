"use client";
import { DateReading } from "@/utils/types";
import {
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
const UsageChart = ({
  data,
  domain,
  lineStroke,
  selectedDate,
}: {
  data: DateReading[];
  domain?: [number, number];
  lineStroke?: string;
  selectedDate?: Date;
}) => {
  const dataSimplified = data.map((it) => ({
    date: `${it.date.getDate()}-${it.date.getMonth() + 1}-${it.date.getFullYear()}`,
    amount: it.amount,
  }));
  return (
    <ResponsiveContainer width="90%" height={400}>
      <LineChart width={450} height={300} data={dataSimplified}>
        <XAxis
          dataKey={"date"}
          tick={false}
          label="Date"
          allowDataOverflow={false}
        />
        <YAxis dataKey={"amount"} domain={domain}></YAxis>
        <Line dataKey={"amount"} stroke={lineStroke} width={440} dot={false} />
        {selectedDate && (
          <ReferenceLine
            x={`${selectedDate.getDate()}-${selectedDate.getMonth() + 1}-${selectedDate.getFullYear()}`}
            stroke={"purple"}
          />
        )}
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default UsageChart;
