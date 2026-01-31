export type OutputKind = 'image' | 'video'

export interface MjParameter {
  id: string
  key: string
  label: string
  type: 'slider' | 'select' | 'toggle'
  min?: number
  max?: number
  step?: number
  options?: Array<{ value: string; label: string }>
}

export interface GenerationTask {
  id: string
  prompt: string
  negativePrompt?: string
  parameters: Record<string, unknown>
  outputKind: OutputKind
  status: 'idle' | 'pending' | 'success' | 'error'
  createdAt: number
}

