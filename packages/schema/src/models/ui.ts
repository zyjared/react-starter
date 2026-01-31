export interface ParameterControl {
  paramId: string
  controlType: 'slider' | 'select' | 'toggle'
  order: number
  group?: string
}

