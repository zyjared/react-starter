import type { OutputKind } from '../models/generation'

export interface GenerationRequestDto {
  prompt: string
  negative_prompt?: string
  params: Record<string, unknown>
  output: OutputKind
}

