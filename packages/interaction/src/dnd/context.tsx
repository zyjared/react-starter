import {
  DndContext,
  type DragEndEvent,
  type DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import * as React from 'react'
import type { DragItem } from './types'

interface DragContextValue {
  active: DragItem | null
}

const DragContext = React.createContext<DragContextValue>({
  active: null,
})

interface InteractionDndProviderProps {
  children: React.ReactNode
  onDragStart?: (event: DragStartEvent) => void
  onDragEnd?: (event: DragEndEvent) => void
}

function InteractionDndProvider({
  children,
  onDragStart,
  onDragEnd,
}: InteractionDndProviderProps) {
  const [active, setActive] = React.useState<DragItem | null>(null)
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 4,
      },
    }),
  )

  const handleDragStart = (event: DragStartEvent) => {
    setActive(event.active.data.current as DragItem | null)
    onDragStart?.(event)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setActive(null)
    onDragEnd?.(event)
  }

  return (
    <DragContext.Provider value={{ active }}>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {children}
      </DndContext>
    </DragContext.Provider>
  )
}

function useDragContext() {
  return React.useContext(DragContext)
}

export { InteractionDndProvider, useDragContext }

