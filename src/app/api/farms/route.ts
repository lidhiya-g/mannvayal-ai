import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const farms = await prisma.farm.findMany({
      where: { userId: session.id },
      include: {
        cropCycles: {
          include: {
            crop: true,
            rescueTasks: true,
          },
        },
        weatherCache: {
          take: 1,
          orderBy: { recordedAt: "desc" },
        },
        climateScenarios: {
          take: 5,
          orderBy: { createdAt: "desc" },
        },
        waterBudgets: {
          take: 3,
          orderBy: { createdAt: "desc" },
        },
      },
    });

    return NextResponse.json({ farms });
  } catch (error: any) {
    console.error("Error fetching farms:", error);
    return NextResponse.json({ error: "Failed to retrieve farms" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, state, district, village, totalArea, soilType, irrigationType, primaryCropCode, sowingDate, latitude, longitude } = body;

    if (!name || !totalArea || !soilType || !primaryCropCode) {
      return NextResponse.json({ error: "Missing required farm parameters" }, { status: 400 });
    }

    const farm = await prisma.farm.create({
      data: {
        userId: session.id,
        name: name.trim(),
        state: state || (session as any).state || "Punjab",
        district: district || (session as any).district || "Ludhiana",
        village: village || null,
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
        totalArea: parseFloat(totalArea),
        soilType,
        irrigationType: irrigationType || "Canal & Borewell",
        waterCapacityM3: 3500,
        cropCycles: {
          create: [
            {
              cropCode: primaryCropCode,
              season: "Current Season",
              sowingDate: sowingDate ? new Date(sowingDate) : new Date(),
              expectedHarvest: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000),
              currentStage: "Sowing / Nursery",
              areaAllocated: parseFloat(totalArea),
              status: "ACTIVE",
            },
          ],
        },
      },
      include: {
        cropCycles: true,
      },
    });

    await prisma.auditEvent.create({
      data: {
        userId: session.id,
        eventType: "FARM_CREATED",
        description: `Created new farm: ${farm.name} (${farm.totalArea} acres) in ${farm.district}`,
      },
    });

    return NextResponse.json({ success: true, farm });
  } catch (error: any) {
    console.error("Error creating farm:", error);
    return NextResponse.json({ error: "Failed to create farm" }, { status: 500 });
  }
}
