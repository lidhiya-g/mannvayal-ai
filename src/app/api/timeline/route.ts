import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { action, cropCycleId, newStage, taskId, isCompleted } = body;

    if (action === "ADVANCE_STAGE" && cropCycleId && newStage) {
      const updatedCycle = await prisma.cropCycle.update({
        where: { id: cropCycleId },
        data: { currentStage: newStage },
        include: { rescueTasks: true },
      });
      return NextResponse.json({ success: true, cropCycle: updatedCycle });
    }

    if (action === "TOGGLE_TASK" && taskId) {
      const updatedTask = await prisma.rescueTask.update({
        where: { id: taskId },
        data: {
          isCompleted: isCompleted,
          completedAt: isCompleted ? new Date() : null,
        },
      });
      return NextResponse.json({ success: true, task: updatedTask });
    }

    return NextResponse.json({ error: "Invalid action or parameters" }, { status: 400 });
  } catch (error: any) {
    console.error("Timeline error:", error);
    return NextResponse.json({ error: "Failed to update timeline" }, { status: 500 });
  }
}
