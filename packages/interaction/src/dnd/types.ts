export type DragKind = 'parameter' | 'clip' | 'layer'

export interface DragItemBase<K extends DragKind = DragKind> {
  kind: K
  id: string
}

export interface ParameterDragItem extends DragItemBase<'parameter'> {
  paramId: string
}

export type DragItem = ParameterDragItem

