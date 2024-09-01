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
    .toSorted((a, b) => a.date.valueOf() - b.date.valueOf());
}
