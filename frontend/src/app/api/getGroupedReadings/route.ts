import { ResourceKind, retrieveUsage } from "@/utils/resourceUsageStats";
import { DateReading } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";

const isResourceKind = (x: string): x is ResourceKind =>
  ["electricity_readings", "cold_water_readings", "heater_readings"].includes(
    x,
  );

export async function GET(
  request: NextRequest,
): Promise<NextResponse<Record<string, DateReading[] | undefined>>> {
  const resourceType = request.nextUrl.searchParams.get("resource_type");
  const grouping = request.nextUrl.searchParams.get("groupBy");
  if (resourceType == null || !isResourceKind(resourceType)) {
    return new NextResponse("Please specify valid resource type", {
      status: 400,
    });
  }
  const rawData = await retrieveUsage(resourceType);
  let data;
  switch (grouping) {
    case "week":
      data = Object.groupBy(rawData, (it) => extractWeek(it.date));
      break;
    case "month":
      data = Object.groupBy(rawData, (it) => extractMonth(it.date));
      break;
    case "year":
      data = Object.groupBy(rawData, (it) => extractYear(it.date));
      break;
    default:
      return new NextResponse(
        'Invalid grouping, options are "week", "month" and "year"',
        { status: 400 },
      );
  }

  return NextResponse.json(data);
}
/**
 * Extract month/year pair. Example: `August 2024`
 * */
const extractMonth = (x: Date): string =>
  `${x.toLocaleString("default", { month: "long" })} ${x.getFullYear()}`;
const extractYear = (x: Date): string => x.getFullYear().toString();
/**
 * Given a date, return another Date, corresponding to the first day of the week the input date is in.
 * For example, if the given day is a wednesday, return the date of the monday.
 * Output has the following format: `w/c dd-mm-yyyy`
 *
 * */
const extractWeek = (x: Date): string => {
  const daysSinceMonday = (x.getDay() + 1) % 7; // monday is day 0, sunday is day 6
  const mondayDate = new Date(x.getTime() - daysSinceMonday * 24 * 3600 * 1000);
  return `w/c ${mondayDate.getDate()}-${mondayDate.toLocaleString("default", { month: "long" })}-${mondayDate.getFullYear()}`;
};
