import ResourceChartGroup from "@/components/ResourceChartGroup";
import { retrieveUsage } from "@/utils/resourceUsageStats";
export default async function Home() {
  const elecData = await retrieveUsage("electricity_readings");
  const heaterData = await retrieveUsage("heater_readings");
  const waterData = await retrieveUsage("cold_water_readings");
  return (
    <>
      <ResourceChartGroup
        water={waterData}
        electricity={elecData}
        heater={heaterData}
      />
    </>
  );
}
