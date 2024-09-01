import { ResourceKind, retrieveUsage } from "@/utils/resourceUsageStats";
import { DateReading } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";

const isResourceKind = (x: string): x is ResourceKind =>
  ["electricity_readings", "cold_water_readings", "heater_readings"].includes(
    x,
  );

export async function GET(
  request: NextRequest,
): Promise<NextResponse<DateReading[]>> {
  const resourceType = request.nextUrl.searchParams.get("resource_type");
  if (resourceType == null || !isResourceKind(resourceType)) {
    return new NextResponse("Please specify valid resource type", {
      status: 400,
    });
  }
  const data = await retrieveUsage(resourceType);
  return NextResponse.json(data);
}
