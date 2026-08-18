import { NextRequest, NextResponse } from "next/server";
import { castVoteInStore, getPollById, hasUserVoted } from "@/lib/pollsStore";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: pollId } = await params;
    const body = await req.json();
    const { selectedOptionId, userId } = body;

    if (!userId) {
      return NextResponse.json(
        { error: "Authentication required to cast your verdict." },
        { status: 401 }
      );
    }

    if (!selectedOptionId) {
      return NextResponse.json(
        { error: "Please select an option to vote." },
        { status: 400 }
      );
    }

    // Check if user already voted (One Person = One Vote)
    if (hasUserVoted(pollId, userId)) {
      const existingPoll = getPollById(pollId);
      return NextResponse.json(
        {
          error: "YOU ALREADY CAST YOUR VERDICT.",
          alreadyVoted: true,
          poll: existingPoll,
        },
        { status: 400 }
      );
    }

    const result = castVoteInStore({
      pollId,
      userId,
      selectedOptionId,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to submit vote." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "VOTE CAST ✓",
      poll: {
        id: result.poll.id,
        question: result.poll.question,
        description: result.poll.description,
        category: result.poll.category,
        options: result.poll.options,
        totalVotes: result.poll.totalVotes,
        courtAnalysis: result.poll.courtAnalysis,
        anonymousStatus: "ANONYMOUS QUESTION",
      },
    });
  } catch (error) {
    console.error("[POLL VOTE API ERROR]", error);
    return NextResponse.json(
      { error: "Failed to cast vote." },
      { status: 500 }
    );
  }
}
