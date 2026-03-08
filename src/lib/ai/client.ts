import Anthropic from '@anthropic-ai/sdk';

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export const AI_MODEL = 'claude-sonnet-4-5-20250514';
export const AI_MAX_TOKENS = 1500;
