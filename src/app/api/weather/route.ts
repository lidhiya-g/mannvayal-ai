import { NextResponse } from "next/server";
import { fetchDistrictWeather } from "@/lib/weatherService";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const district = searchParams.get("district") || "Thanjavur";
    const forceSim = searchParams.get("sim") === "true";

    const weather = await fetchDistrictWeather(district, forceSim);
    return NextResponse.json({ weather });
  } catch (error: any) {
    console.error("Error fetching weather:", error);
    return NextResponse.json({ error: "Failed to fetch weather data" }, { status: 500 });
  }
}
