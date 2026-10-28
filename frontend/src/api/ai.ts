import { api } from "./client";

export async function askBeam(
  prompt: string,
  context?: { userId?: number; courseContext?: string; problemContext?: string; currentCode?: string; targetRole?: string }
): Promise<string> {
  const result = await api.askCoach(prompt, context);
  return result.answer;
}
