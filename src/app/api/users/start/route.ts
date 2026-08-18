import { NextRequest, NextResponse } from "next/server";

// In-memory data store abstraction for tracking user starts & sessions for MVP
interface UserStartRecord {
  userId: string;
  name: string;
  startedAt: string;
  userAgent?: string;
  ipAddress?: string;
}

const userSessionsStore: UserStartRecord[] = [];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, userId, timestamp } = body;

    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { error: "Name is required." },
        { status: 400 }
      );
    }

    const cleanName = name.trim();
    const cleanUserId = userId || `user_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const startedAt = timestamp || new Date().toISOString();
    const userAgent = req.headers.get("user-agent") || undefined;

    const record: UserStartRecord = {
      userId: cleanUserId,
      name: cleanName,
      startedAt,
      userAgent,
    };

    // Store in MVP memory array (ready for database insertion e.g. Prisma/Supabase)
    const existingIndex = userSessionsStore.findIndex((u) => u.userId === cleanUserId);
    if (existingIndex >= 0) {
      userSessionsStore[existingIndex] = record;
    } else {
      userSessionsStore.push(record);
    }

    // Log internally for backend metrics (invisible to public UI)
    console.log(`[USER START TRACKER] New user started: ${cleanName} (ID: ${cleanUserId}) at ${startedAt}. Total starts: ${userSessionsStore.length}`);

    return NextResponse.json({
      success: true,
      message: "User session registered successfully.",
      user: {
        userId: cleanUserId,
        name: cleanName,
        startedAt,
      },
      stats: {
        totalUniqueUsers: userSessionsStore.length,
      },
    });
  } catch (error) {
    console.error("[USER START TRACKER API ERROR]", error);
    return NextResponse.json(
      { error: "Failed to process user identification." },
      { status: 500 }
    );
  }
}

// Internal GET endpoint for server logs/diagnostics
export async function GET() {
  return NextResponse.json({
    status: "healthy",
    totalStarts: userSessionsStore.length,
    recentStarts: userSessionsStore.slice(-10),
  });
}
