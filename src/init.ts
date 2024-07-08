import crypto from 'crypto';
import OpenAI from 'openai';

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const idForTracking = crypto
  .createHash('sha256')
  .update('openaiplayground')
  .digest('hex');
