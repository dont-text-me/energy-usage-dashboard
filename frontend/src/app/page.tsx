
import UsageChart from "@/components/UsageChart";
import UsageHist from "@/components/UsageHist";
import {retrieveUsage} from "@/utils/resourceUsageStats";

export default async function Home() {
  // const [elecData, elecBins] = await retrieveUsage('electricity_readings')
  // const [heatData, heatBins] = await retrieveUsage('heater_readings')
  const [waterData, waterBins] = await retrieveUsage('cold_water_readings')
  return <>
    <UsageChart data={waterData} domain={[1000, 1100]}/>
    <UsageHist data={waterBins}/>
  </>
}
