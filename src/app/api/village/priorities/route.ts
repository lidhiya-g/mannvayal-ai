import { NextResponse } from "next/server";
import { INITIAL_DEVELOPMENT_PRIORITIES, computePriorityScore, PriorityItem } from "@/lib/rural/villageDataService";
import { getSessionUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

// In-memory persistent array for priorities during session
let inMemoryPriorities: PriorityItem[] = [...INITIAL_DEVELOPMENT_PRIORITIES];

export async function GET(req: Request) {
  try {
    return NextResponse.json({
      success: true,
      priorities: inMemoryPriorities,
      total: inMemoryPriorities.length,
    });
  } catch (error: any) {
    console.error("Priorities GET error:", error);
    return NextResponse.json({ error: "Failed to fetch priorities" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSessionUser();
    const body = await req.json();
    const {
      title,
      category,
      urgency,
      communityImpact,
      feasibility,
      proposedAction,
      responsibleStakeholder,
      targetCompletionMonths,
      evidenceNotes,
    } = body;

    if (!title || !category || !proposedAction) {
      return NextResponse.json({ error: "Title, category, and proposed action are required" }, { status: 400 });
    }

    const u = Math.min(5, Math.max(1, Number(urgency) || 3));
    const ci = Math.min(5, Math.max(1, Number(communityImpact) || 3));
    const f = Math.min(5, Math.max(1, Number(feasibility) || 3));
    const compositeScore = computePriorityScore(u, ci, f);

    const newPriority: PriorityItem = {
      id: `PRI-${Date.now().toString().slice(-4)}`,
      title: title.trim(),
      category,
      urgency: u,
      communityImpact: ci,
      feasibility: f,
      compositeScore,
      proposedAction: proposedAction.trim(),
      responsibleStakeholder: responsibleStakeholder ? responsibleStakeholder.trim() : "Gram Panchayat",
      targetCompletionMonths: Number(targetCompletionMonths) || 6,
      status: "PROPOSED",
      evidenceNotes: evidenceNotes ? evidenceNotes.trim() : "Community-reported requirement.",
      lastUpdated: new Date().toISOString().split("T")[0],
    };

    inMemoryPriorities.unshift(newPriority);

    return NextResponse.json({
      success: true,
      priority: newPriority,
      message: "Development priority recorded with transparent priority score",
    });
  } catch (error: any) {
    console.error("Priorities POST error:", error);
    return NextResponse.json({ error: "Failed to record priority" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "ID and status are required" }, { status: 400 });
    }

    const item = inMemoryPriorities.find((p) => p.id === id);
    if (!item) {
      return NextResponse.json({ error: "Priority item not found" }, { status: 404 });
    }

    item.status = status;
    item.lastUpdated = new Date().toISOString().split("T")[0];

    return NextResponse.json({ success: true, priority: item });
  } catch (error: any) {
    console.error("Priorities PATCH error:", error);
    return NextResponse.json({ error: "Failed to update priority" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    inMemoryPriorities = inMemoryPriorities.filter((p) => p.id !== id);

    return NextResponse.json({ success: true, message: "Priority removed" });
  } catch (error: any) {
    console.error("Priorities DELETE error:", error);
    return NextResponse.json({ error: "Failed to remove priority" }, { status: 500 });
  }
}
