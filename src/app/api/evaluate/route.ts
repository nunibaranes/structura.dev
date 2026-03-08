import { NextResponse } from 'next/server';
import type { UserSolution } from '@/types/challenge';
import { getChallengeBySlug } from '@/lib/challenges/utils';
import { anthropic, AI_MODEL, AI_MAX_TOKENS } from '@/lib/ai/client';
import { getSystemPrompt, buildUserMessage } from '@/lib/ai/prompt-builder';
import { parseAIResponse } from '@/lib/ai/response-parser';
import { generateMockFeedback } from '@/lib/ai/mock-feedback';

export async function POST(request: Request) {
  const body = (await request.json()) as UserSolution;

  if (!body.challengeSlug || !body.components || !body.dataFlow) {
    return NextResponse.json(
      { error: 'Missing required fields: challengeSlug, components, dataFlow' },
      { status: 400 },
    );
  }

  const challenge = getChallengeBySlug(body.challengeSlug);
  if (!challenge) {
    return NextResponse.json({ error: 'Challenge not found' }, { status: 404 });
  }

  // Fall back to mock feedback if no API key is configured
  if (!process.env.ANTHROPIC_API_KEY) {
    const feedback = generateMockFeedback(body.challengeSlug);
    return NextResponse.json(feedback);
  }

  try {
    const message = await anthropic.messages.create({
      model: AI_MODEL,
      max_tokens: AI_MAX_TOKENS,
      temperature: 0.3,
      system: getSystemPrompt(),
      messages: [
        {
          role: 'user',
          content: buildUserMessage(challenge, body),
        },
      ],
    });

    const textBlock = message.content.find((block) => block.type === 'text');
    if (!textBlock || textBlock.type !== 'text') {
      return NextResponse.json({ error: 'No text response from AI' }, { status: 502 });
    }

    const feedback = parseAIResponse(textBlock.text, body.challengeSlug);
    return NextResponse.json(feedback);
  } catch (error: unknown) {
    const apiError = error as { status?: number; error?: { message?: string } };
    console.error('Claude API error:', apiError.status, apiError.error?.message ?? error);

    // Fall back to mock feedback so development isn't blocked
    console.warn('Falling back to mock feedback');
    const fallback = generateMockFeedback(body.challengeSlug);
    return NextResponse.json(fallback);
  }
}
