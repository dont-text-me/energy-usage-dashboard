import DateCarousel from "@/components/DateCarousel";
import ResourceChartGroup from "@/components/ResourceChartGroup";
import { retrieveUsage } from "@/utils/resourceUsageStats";
import "./page.css";
export default async function Home() {
  const elecData = await retrieveUsage("electricity_readings");
  const heaterData = await retrieveUsage("heater_readings");
  const waterData = await retrieveUsage("cold_water_readings");
  return (
    <>
      <DateCarousel />
      <ResourceChartGroup water={waterData} electricity={elecData} heater={heaterData} />
    </>
  );
}
