export interface PollOption {
  id: string;
  text: string;
  votesCount: number;
}

export interface Poll {
  id: string;
  creatorId: string; // Internal creator ID (never exposed publicly)
  question: string;
  description?: string;
  category: string;
  options: PollOption[];
  totalVotes: number;
  createdAt: string;
  status: "ACTIVE" | "CLOSED";
  courtAnalysis?: {
    summary: string;
    verdict: string;
  };
}

export interface VoteRecord {
  id: string;
  pollId: string;
  userId: string;
  selectedOptionId: string;
  createdAt: string;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  image?: string;
  provider: "google";
  createdAt: string;
}

// Initial seed mock polls representing realistic courtroom questions
const initialPolls: Poll[] = [
  {
    id: "poll_01",
    creatorId: "user_anon_01",
    question: "SHOULD I TEXT MY EX AT 2:00 AM?",
    description: "I know it's probably a terrible idea, but I kinda want to. We haven't spoken in 4 months.",
    category: "Dating",
    options: [
      { id: "opt_yes", text: "YES", votesCount: 284 },
      { id: "opt_no", text: "NO", votesCount: 1000 },
    ],
    totalVotes: 1284,
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    status: "ACTIVE",
    courtAnalysis: {
      summary: "78% of the internet thinks you should NOT text your ex.",
      verdict: "DON'T DO IT, BRO.",
    },
  },
  {
    id: "poll_02",
    creatorId: "user_anon_02",
    question: "IS WEARING SOCKS WITH SLIDES A FASHION CRIME?",
    description: "My friends say I look like a retired gym teacher. I call it peak comfort.",
    category: "Fashion",
    options: [
      { id: "opt_crime", text: "GUILTY AS CHARGED 🚔", votesCount: 420 },
      { id: "opt_valid", text: "PEAK DRIP 👟", votesCount: 950 },
    ],
    totalVotes: 1370,
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    status: "ACTIVE",
    courtAnalysis: {
      summary: "69% of the jury supports comfort over high fashion decorum.",
      verdict: "APPROVED BY THE COURT.",
    },
  },
  {
    id: "poll_03",
    creatorId: "user_anon_03",
    question: "SHOULD PINEAPPLE BE ALLOWED ON PIZZA?",
    description: "The age-old internet feud. Is sweet and savory acceptable on a slice?",
    category: "Hot Take",
    options: [
      { id: "opt_pineapple_yes", text: "🍍 YES (DELICIOUS)", votesCount: 840 },
      { id: "opt_pineapple_no", text: "🍕 NO (ABOMINATION)", votesCount: 1120 },
    ],
    totalVotes: 1960,
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    status: "ACTIVE",
    courtAnalysis: {
      summary: "57% of the jury rejects fruit on traditional Italian heritage pizza.",
      verdict: "ABOMINATION IN THE FIRST DEGREE.",
    },
  },
  {
    id: "poll_04",
    creatorId: "user_anon_04",
    question: "IS SPLITTING THE FIRST DATE BILL 50/50 MANDATORY?",
    description: "Went out for dinner, bill came to $120. Who should cover it?",
    category: "Relationships",
    options: [
      { id: "opt_split", text: "ALWAYS SPLIT 50/50", votesCount: 650 },
      { id: "opt_inviter", text: "WHOEVER ASKED PAYS", votesCount: 890 },
      { id: "opt_treat", text: "TAKE TURNS", votesCount: 210 },
    ],
    totalVotes: 1750,
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    status: "ACTIVE",
    courtAnalysis: {
      summary: "51% of voters believe the person who initiated the date should cover the bill.",
      verdict: "INVITER PAYS THE DOCK.",
    },
  },
];

// Persistent stores in memory for MVP state
let pollsStore: Poll[] = [...initialPolls];
let votesStore: VoteRecord[] = [];
let usersStore: UserAccount[] = [];

export function getPollsStore(): Poll[] {
  return pollsStore;
}

export function getPollById(id: string): Poll | undefined {
  return pollsStore.find((p) => p.id === id);
}

export function getUserVotes(userId: string): VoteRecord[] {
  return votesStore.filter((v) => v.userId === userId);
}

export function getUserCreatedPolls(userId: string): Poll[] {
  return pollsStore.filter((p) => p.creatorId === userId);
}

export function hasUserVoted(pollId: string, userId: string): boolean {
  return votesStore.some((v) => v.pollId === pollId && v.userId === userId);
}

export function getUserVoteForPoll(pollId: string, userId: string): VoteRecord | undefined {
  return votesStore.find((v) => v.pollId === pollId && v.userId === userId);
}

export function createPollInStore(data: {
  creatorId: string;
  question: string;
  description?: string;
  category: string;
  optionTexts: string[];
}): Poll {
  const newPoll: Poll = {
    id: `poll_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    creatorId: data.creatorId,
    question: data.question.toUpperCase().trim(),
    description: data.description?.trim(),
    category: data.category || "Random",
    options: data.optionTexts.map((txt, index) => ({
      id: `opt_${index}_${Math.random().toString(36).substring(2, 6)}`,
      text: txt.trim(),
      votesCount: 0,
    })),
    totalVotes: 0,
    createdAt: new Date().toISOString(),
    status: "ACTIVE",
  };

  pollsStore.unshift(newPoll);
  return newPoll;
}

export function castVoteInStore(data: {
  pollId: string;
  userId: string;
  selectedOptionId: string;
}): { success: boolean; poll: Poll; error?: string } {
  const { pollId, userId, selectedOptionId } = data;

  const poll = pollsStore.find((p) => p.id === pollId);
  if (!poll) {
    return { success: false, poll: {} as Poll, error: "Poll not found." };
  }

  // ENFORCE UNIQUE (pollId, userId)
  if (hasUserVoted(pollId, userId)) {
    return {
      success: false,
      poll,
      error: "YOU ALREADY CAST YOUR VERDICT.",
    };
  }

  const option = poll.options.find((o) => o.id === selectedOptionId);
  if (!option) {
    return { success: false, poll, error: "Invalid option selected." };
  }

  // Record vote
  option.votesCount += 1;
  poll.totalVotes += 1;

  const newVoteRecord: VoteRecord = {
    id: `vote_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    pollId,
    userId,
    selectedOptionId,
    createdAt: new Date().toISOString(),
  };
  votesStore.push(newVoteRecord);

  // Generate dynamic AI court analysis if total votes >= 1
  if (!poll.courtAnalysis || poll.totalVotes % 5 === 0) {
    const highestOption = [...poll.options].sort((a, b) => b.votesCount - a.votesCount)[0];
    const pct = Math.round((highestOption.votesCount / poll.totalVotes) * 100);
    poll.courtAnalysis = {
      summary: `${pct}% of the internet voted for "${highestOption.text}".`,
      verdict: pct > 65 ? `${highestOption.text} IS THE OVERWHELMING VERDICT!` : `THE COURT HAS DECIDED: ${highestOption.text}`,
    };
  }

  return { success: true, poll };
}

export function getOrCreateUser(googleData: { name: string; email: string; image?: string }): UserAccount {
  const existing = usersStore.find((u) => u.email === googleData.email);
  if (existing) return existing;

  const newUser: UserAccount = {
    id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    name: googleData.name,
    email: googleData.email,
    image: googleData.image,
    provider: "google",
    createdAt: new Date().toISOString(),
  };
  usersStore.push(newUser);
  return newUser;
}
