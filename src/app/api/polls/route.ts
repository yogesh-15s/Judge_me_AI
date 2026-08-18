import { NextRequest, NextResponse } from "next/server";
import { getPollsStore, createPollInStore, getUserVotes } from "@/lib/pollsStore";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") || undefined;
    const sort = searchParams.get("sort") || "trending";
    const userId = searchParams.get("userId") || undefined;

    let polls = getPollsStore();

    // Filter by Category
    if (category && category !== "All" && category !== "Trending" && category !== "Newest") {
      polls = polls.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }

    // Sort
    if (sort === "trending") {
      polls = [...polls].sort((a, b) => b.totalVotes - a.totalVotes);
    } else if (sort === "newest") {
      polls = [...polls].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    // Include user votes if userId provided
    let userVotedPollIds: Record<string, string> = {};
    if (userId) {
      const userVotes = getUserVotes(userId);
      userVotes.forEach((v) => {
        userVotedPollIds[v.pollId] = v.selectedOptionId;
      });
    }

    // Sanitize output to ensure creator identity is NEVER leaked
    const sanitizedPolls = polls.map((p) => ({
      id: p.id,
      question: p.question,
      description: p.description,
      category: p.category,
      options: p.options,
      totalVotes: p.totalVotes,
      createdAt: p.createdAt,
      status: p.status,
      courtAnalysis: p.courtAnalysis,
      anonymousStatus: "ANONYMOUS QUESTION", // Strict privacy
      hasVoted: Boolean(userVotedPollIds[p.id]),
      userSelectedOptionId: userVotedPollIds[p.id] || null,
    }));

    return NextResponse.json({
      success: true,
      polls: sanitizedPolls,
      total: sanitizedPolls.length,
    });
  } catch (error) {
    console.error("[POLLS API GET ERROR]", error);
    return NextResponse.json(
      { error: "Failed to fetch courtroom polls." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { question, description, category, optionTexts, userId } = body;

    if (!userId) {
      return NextResponse.json(
        { error: "Authentication required to put a question on trial." },
        { status: 401 }
      );
    }

    if (!question || typeof question !== "string" || question.trim().length < 5) {
      return NextResponse.json(
        { error: "Question must be at least 5 characters long." },
        { status: 400 }
      );
    }

    if (!Array.isArray(optionTexts) || optionTexts.length < 2) {
      return NextResponse.json(
        { error: "At least 2 voting options are required." },
        { status: 400 }
      );
    }

    const cleanOptionTexts = optionTexts
      .map((t) => (typeof t === "string" ? t.trim() : ""))
      .filter((t) => t.length > 0);

    if (cleanOptionTexts.length < 2) {
      return NextResponse.json(
        { error: "Options cannot be blank." },
        { status: 400 }
      );
    }

    const poll = createPollInStore({
      creatorId: userId,
      question: question.trim(),
      description: description ? description.trim() : undefined,
      category: category || "Random",
      optionTexts: cleanOptionTexts,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Question successfully put on trial!",
        poll: {
          id: poll.id,
          question: poll.question,
          description: poll.description,
          category: poll.category,
          options: poll.options,
          totalVotes: poll.totalVotes,
          createdAt: poll.createdAt,
          anonymousStatus: "ANONYMOUS QUESTION",
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[POLLS API POST ERROR]", error);
    return NextResponse.json(
      { error: "Failed to create courtroom poll." },
      { status: 500 }
    );
  }
}
