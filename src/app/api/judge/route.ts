import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI, Type } from '@google/genai';
import {
  PERSONA_CONFIGS,
  PersonaType,
  JudgeResponse,
} from '@/lib/judgePersonas';

/** Shape of one image part in the multimodal request payload */
interface ImagePart {
  mimeType: string;
  base64Data: string;
}

/** Expected request body shape */
interface JudgeRequestBody {
  persona: PersonaType;
  contextText?: string;
  images?: ImagePart[];
  category?: string;
}

// ─── Gemini client (singleton pattern, safe for edge/node cold starts) ────────
let ai: GoogleGenAI | null = null;

function getClient(): GoogleGenAI {
  if (!ai) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error(
        'GEMINI_API_KEY environment variable is not set. ' +
          'Add it to your .env.local file.'
      );
    }
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
}

// ─── Structured output JSON schema ───────────────────────────────────────────
const VERDICT_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    verdict: {
      type: Type.STRING,
      enum: [
        'GUILTY',
        'ACQUITTED',
        'SENTENCED TO TOUCH GRASS',
        'PROBATION',
      ],
      description: 'The official court verdict for this defendant.',
    },
    aura_delta: {
      type: Type.INTEGER,
      description:
        'Signed integer representing the net aura point change, e.g. -750 or +300.',
    },
    delusion_index: {
      type: Type.INTEGER,
      description:
        'Integer from 0 to 100 measuring how detached from reality the defendant is.',
    },
    charge: {
      type: Type.STRING,
      description:
        'A concise, witty judicial charge in legal-sounding language, e.g. "Grand Larceny of Public Patience".',
    },
    closing_argument: {
      type: Type.STRING,
      description:
        '2–3 sentences of analysis written strictly in the active persona voice.',
    },
    recommendation: {
      type: Type.STRING,
      description:
        'A concrete judicial sentence or action step the defendant must carry out.',
    },
  },
  required: [
    'verdict',
    'aura_delta',
    'delusion_index',
    'charge',
    'closing_argument',
    'recommendation',
  ],
};

// ─── Route handler ────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body: JudgeRequestBody = await req.json();
    const { persona, contextText, images, category } = body;

    // ── Validation ────────────────────────────────────────────────────────────
    const hasText = typeof contextText === 'string' && contextText.trim().length > 0;
    const hasImages = Array.isArray(images) && images.length > 0;

    if (!hasText && !hasImages) {
      return NextResponse.json(
        {
          error:
            'No evidence submitted. Please provide text, an image, or both.',
        },
        { status: 400 }
      );
    }

    if (!persona || !PERSONA_CONFIGS[persona]) {
      return NextResponse.json(
        { error: 'Invalid or missing persona. Must be normal | sigma | brutal.' },
        { status: 400 }
      );
    }

    const personaConfig = PERSONA_CONFIGS[persona];

    // ── Build multimodal contents array ───────────────────────────────────────
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const contentParts: any[] = [];

    // Add user-supplied text context
    if (hasText) {
      const exhibitLabel = category
        ? `[EXHIBIT TYPE: ${category.toUpperCase()}]\n\n`
        : '';
      contentParts.push({
        text: `${exhibitLabel}${contextText!.trim()}`,
      });
    }

    // Add image parts (base64 encoded multimodal input)
    if (hasImages) {
      for (const img of images!) {
        if (!img.base64Data || !img.mimeType) continue;
        contentParts.push({
          inlineData: {
            mimeType: img.mimeType,
            data: img.base64Data,
          },
        });
      }
    }

    // Append structured instruction at the end so the model always knows the schema
    contentParts.push({
      text:
        '\n\nAnalyze all submitted evidence carefully and return a single valid JSON verdict object matching the required schema exactly.',
    });

    // ── Gemini API call ───────────────────────────────────────────────────────
    const client = getClient();
    const model = 'gemini-2.5-flash';

    const response = await client.models.generateContent({
      model,
      contents: [
        {
          role: 'user',
          parts: contentParts,
        },
      ],
      config: {
        systemInstruction: personaConfig.systemPrompt,
        temperature: personaConfig.temperature,
        responseMimeType: 'application/json',
        responseSchema: VERDICT_SCHEMA,
      },
    });

    // ── Extract & validate response ───────────────────────────────────────────
    const rawText = response.text ?? '';
    let verdict: JudgeResponse;

    try {
      verdict = JSON.parse(rawText) as JudgeResponse;
    } catch {
      return NextResponse.json(
        {
          error: 'The AI returned a malformed verdict. Please try again.',
          raw: rawText,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ verdict, persona, category }, { status: 200 });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : 'An unexpected server error occurred.';
    console.error('[/api/judge]', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
