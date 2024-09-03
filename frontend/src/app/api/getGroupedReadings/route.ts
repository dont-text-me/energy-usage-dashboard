import { ResourceKind, retrieveUsage } from "@/utils/resourceUsageStats";
import { DateReading } from "@/utils/types";
import groupBy from "lodash.groupby";
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
  switch (grouping) {
    case "week":
      return NextResponse.json(groupBy(rawData, (it) => extractWeek(it.date)));
    case "month":
      return NextResponse.json(groupBy(rawData, (it) => extractMonth(it.date)));
    case "year":
      return NextResponse.json(groupBy(rawData, (it) => extractYear(it.date)));
    default:
      return new NextResponse(
        'Invalid grouping, options are "week", "month" and "year"',
        { status: 400 },
      );
  }
}
/**
 * Extract month/year pair. Example: `August 2024`
 * */
const extractMonth = (x: string): string => {
  const [day, month, year] = x.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return `${date.toLocaleString("default", { month: "long" })} ${date.getFullYear()}`;
};
const extractYear = (x: string): string => x.split("-")[2];
/**
 * Given a date string in format dd-mm-yyyy, return another string, corresponding to the first day of the week the input date is in.
 * For example, if the given day is a wednesday, return the date of the monday.
 * Output has the following format: `w/c dd-mm-yyyy`
 * */
const extractWeek = (x: string): string => {
  const [day, month, year] = x.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  const daysSinceMonday = (date.getDay() + 1) % 7; // monday is day 0, sunday is day 6
  const mondayDate = new Date(
    date.getTime() - daysSinceMonday * 24 * 3600 * 1000,
  );
  return `w/c ${mondayDate.getDate()} ${mondayDate.toLocaleString("default", { month: "long" })} ${mondayDate.getFullYear()}`;
};
