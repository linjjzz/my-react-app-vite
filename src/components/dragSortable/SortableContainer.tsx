import React, { Children, useState } from 'react';
import {
  DndContext,
  closestCenter,
  MouseSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  // arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

type PropsType = {
  children: JSX.Element | JSX.Element[]
  items: { id: string, [key: string]: any }[]
  onDragEnd: (oldIndex: number, newIndex: number) => void
}

const SortableContainer = (props: PropsType) => {
  const { items, children, onDragEnd } = props

  const sensors = useSensors(useSensor(MouseSensor, {
    activationConstraint: {
      distance: 8 // 8px 
    }
  }));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over === null) return;

    if (active.id !== over.id) {
      const oldIndex = items.findIndex((c) => c.fe_id === active.id);
      const newIndex = items.findIndex((c) => c.fe_id === over.id);
      onDragEnd(oldIndex, newIndex)
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items}
        strategy={verticalListSortingStrategy}
      >
        {children}
      </SortableContext>
    </DndContext >
  )
}

export default SortableContainer