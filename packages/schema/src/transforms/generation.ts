import type { GenerationTask } from '../models/generation'
import type { GenerationRequestDto } from '../dto/generation'

function taskToRequestDto(task: GenerationTask): GenerationRequestDto {
  return {
    prompt: task.prompt,
    negative_prompt: task.negativePrompt,
    params: task.parameters,
    output: task.outputKind,
  }
}

export { taskToRequestDto }

