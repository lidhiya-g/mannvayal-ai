import { NextResponse } from "next/server";
import {
  getAllStates,
  getStateByName,
  getDistrictsByState,
  getDistrictByName,
  searchLocations,
} from "@/lib/geo/indiaGeoData";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const state = searchParams.get("state");
    const district = searchParams.get("district");
    const search = searchParams.get("search");

    if (search) {
      const results = searchLocations(search);
      return NextResponse.json({ results });
    }

    if (type === "states" || !type) {
      const states = getAllStates().map((s) => ({
        id: s.id,
        name: s.name,
        type: s.type,
        capital: s.capital,
        zone: s.zone,
        agroClimaticZone: s.agroClimaticZone,
        coordinates: s.coordinates,
        districtCount: s.districts.length,
      }));
      return NextResponse.json({ states });
    }

    if (type === "districts" && state) {
      const districts = getDistrictsByState(state);
      return NextResponse.json({ districts });
    }

    if (type === "district_detail" && district) {
      const detail = getDistrictByName(district);
      if (!detail) {
        return NextResponse.json({ error: "District not found" }, { status: 404 });
      }
      return NextResponse.json({ district: detail });
    }

    return NextResponse.json({ states: getAllStates() });
  } catch (error: any) {
    console.error("Geo API error:", error);
    return NextResponse.json({ error: "Failed to query geographic data" }, { status: 500 });
  }
}
