"use client";
import { Usage } from "@/utils/types";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
const UsageHist = ({
  data,
  lineStroke,
}: {
  data: Usage[];
  lineStroke?: string;
}) => {
  return (
    <ResponsiveContainer width="90%" height={400}>
      <LineChart width={450} height={300} data={data}>
        <XAxis
          dataKey={"maxBound"}
          label="Usage"
          ticks={[data[0].maxBound, data[data.length - 1].maxBound]}
        />
        <YAxis
          dataKey={"count"}
          label={{ value: "Frequency", angle: -90 }}
        ></YAxis>
        <Line dataKey={"count"} stroke={lineStroke} />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};
export default UsageHist;
