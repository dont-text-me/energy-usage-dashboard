import { parseDate } from "@/utils/parseDate";
import { DateReading } from "@/utils/types";
import { kv } from "@vercel/kv";

export type ResourceKind =
  | "electricity_readings"
  | "cold_water_readings"
  | "heater_readings";

export async function retrieveUsage(
  resourceType: ResourceKind,
): Promise<DateReading[]> {
  const amountKey = ["electricity_readings", "heater_readings"].includes(
    resourceType,
  )
    ? "amount (kwh)"
    : "amount (m3)";
  const rawData = await kv.get<any[]>(resourceType);
  return rawData!!
    .map<DateReading>((it) => ({
      date: parseDate(it["date"]),
      amount: parseInt(it[amountKey]),
    }))
    .toSorted((d1, d2) => {
      const [day1, month1, year1] = d1.date.split("-").map(Number);
      const [day2, month2, year2] = d2.date.split("-").map(Number);
      const date1 = new Date(year1, month1 - 1, day1);
      const date2 = new Date(year2, month2 - 1, day2);

      return date1.valueOf() - date2.valueOf();
    });
}
