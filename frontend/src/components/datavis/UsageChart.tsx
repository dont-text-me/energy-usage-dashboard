import Loading from "@/components/Loading";
import { ResourceKind } from "@/utils/resourceUsageStats";
import fetcher from "@/utils/swrFetcher";
import { DateReading } from "@/utils/types";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useEffect } from "react";
import {
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useSWR, { useSWRConfig } from "swr";

const UsageChart = ({
  resourceKind,
  domain,
  lineStroke,
  selectedDate,
  units,
}: {
  resourceKind: ResourceKind;
  domain?: [number, number];
  lineStroke?: string;
  selectedDate?: Date;
  units: "kWh" | "m3";
}) => {
  const { mutate } = useSWRConfig();
  const { data, isLoading } = useSWR<DateReading[]>(
    resourceKind ? `/api/getReadings?resource_type=${resourceKind}` : null,
    fetcher,
  );
  useEffect(() => {
    mutate(`/api/getReadings?resource_type=${resourceKind}`);
  }, [data, resourceKind, mutate]);

  if (isLoading || !data) {
    return <Loading />;
  }

  dayjs.extend(customParseFormat);
  return (
    <ResponsiveContainer width="90%" height={400}>
      <LineChart width={450} height={300} data={data}>
        <XAxis
          dataKey={"date"}
          ticks={[data[0].date, data[data.length - 1].date]}
          label="Date"
          allowDataOverflow={false}
        />
        <YAxis dataKey={"amount"} domain={domain} />
        <Line dataKey={"amount"} stroke={lineStroke} width={440} />
        {selectedDate && (
          <ReferenceLine
            x={`${selectedDate.getDate()}-${selectedDate.getMonth() + 1}-${selectedDate.getFullYear()}`}
            stroke={"purple"}
          />
        )}
        <Tooltip
          formatter={(value) => `${value} ${units}`}
          labelFormatter={(label: string) =>
            dayjs(label, "D-M-YYYY").toDate().toLocaleString("default", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })
          }
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default UsageChart;
