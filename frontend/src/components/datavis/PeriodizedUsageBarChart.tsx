import Loading from "@/components/Loading";
import { ResourceKind } from "@/utils/resourceUsageStats";
import fetcher from "@/utils/swrFetcher";
import { DateReading } from "@/utils/types";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useSWR from "swr";

const PeriodizedUsageBarChart = ({
  resourceKind,
  grouping,
  units,
  barFill,
}: {
  resourceKind: ResourceKind;
  grouping?: string;
  units?: string;
  barFill: string;
}) => {
  const { data, isLoading } = useSWR<Record<string, DateReading[]>>(
    resourceKind
      ? `/api/getGroupedReadings?resource_type=${resourceKind}&groupBy=${grouping}`
      : null,
    fetcher,
  );

  if (isLoading || !data) {
    return <Loading />;
  }

  const usagePerPeriod = Object.entries(data).map(([k, v]) => {
    const sortedByAmount = v.toSorted((a, b) => a.amount - b.amount);
    return {
      weekStart: k,
      usage: sortedByAmount[v.length - 1].amount - sortedByAmount[0].amount,
    };
  });

  return (
    <ResponsiveContainer width="90%" height={400}>
      <BarChart width={450} height={300} data={usagePerPeriod}>
        <XAxis dataKey={"weekStart"} allowDataOverflow={false} />
        <YAxis dataKey={"usage"} />
        <Tooltip formatter={(value) => `${value} ${units}`} />
        <Bar dataKey={"usage"} fill={barFill} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PeriodizedUsageBarChart;
