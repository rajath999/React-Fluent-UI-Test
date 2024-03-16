import React, { useEffect, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import { arrayMove, insertAtIndex, removeAtIndex } from "./utils";
import Droppable from "./Droppable";
import jsonData from "../../data/data.json";
import { DNDDataType } from "../../types";

type MultiDndItemsState = {
  selected: DNDDataType[];
  additional: DNDDataType[];
};

function MultiDnd() {
  const [items, setItems] = useState<MultiDndItemsState>({
    selected: [],
    additional: [],
  });

  useEffect(() => {
    const selected: DNDDataType[] = [],
      additional: DNDDataType[] = [];

    jsonData.forEach((e) => {
      if (e.isSelected) {
        selected.push(e);
      } else {
        additional.push(e);
      }
    });

    setItems({ selected, additional });
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragOver = ({ over, active }: DragOverEvent) => {
    const overId = over?.id;

    if (!overId) {
      return;
    }

    const activeContainer = active.data.current?.sortable.containerId;
    const overContainer = over.data.current?.sortable.containerId;

    if (!overContainer) {
      return;
    }

    if (activeContainer !== overContainer) {
      setItems((items) => {
        const activeIndex = active.data.current?.sortable.index;
        const overIndex = over.data.current?.sortable.index || 0;

        let item = items.selected.find((i) => i.id === active.id);
        if (!item) {
          item = items.additional.find((i) => i.id === active.id);
        }
        if (item)
          return moveBetweenContainers(
            items,
            activeContainer,
            activeIndex,
            overContainer,
            overIndex,
            item // active.id
          );
        else return { additional: [], selected: [] };
      });
    }
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over) {
      return;
    }

    if (active.id !== over.id) {
      const activeContainer = active.data.current?.sortable.containerId;
      const overContainer = over.data.current?.sortable.containerId || over.id;
      const activeIndex = active.data.current?.sortable.index;
      const overIndex = over.data.current?.sortable.index || 0;

      setItems((items) => {
        let newItems;
        if (activeContainer === overContainer) {
          const items_ = items as any;
          newItems = {
            ...items,
            [overContainer]: arrayMove(
              items_[overContainer],
              activeIndex,
              overIndex
            ),
          };
        } else {
          let item = items.selected.find((i) => i.id === active.id);
          if (!item) {
            item = items.additional.find((i) => i.id === active.id);
          }
          if (item)
            newItems = moveBetweenContainers(
              items,
              activeContainer,
              activeIndex,
              overContainer,
              overIndex,
              item //active.id
            );
          else return { additional: [], selected: [] };
        }

        return newItems;
      });
    }
  };

  const moveBetweenContainers = (
    items: MultiDndItemsState,
    activeContainer: keyof MultiDndItemsState,
    activeIndex: number,
    overContainer: keyof MultiDndItemsState,
    overIndex: number,
    item: DNDDataType
  ) => {
    console.log("ITEM : ", item);
    return {
      ...items,
      [activeContainer]: removeAtIndex(items[activeContainer], activeIndex),
      [overContainer]: insertAtIndex(items[overContainer], overIndex, item),
    };
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <DndContext
          sensors={sensors}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
        >
          <div>
              <Droppable id={"selected"} items={items.selected} key={"selected"} />
              <Droppable id={"additional"} items={items.additional} key={"additional"} />
          </div>
        </DndContext>

        <div style={{ padding: "0 5rem" }}>
          {items.selected.map((d) => (
            <h5>{d.name}</h5>
          ))}
        </div>
        <div>
          {items.additional.map((d) => (
            <h5>{d.name}</h5>
          ))}
        </div>
      </div>
      {/* <div className="flex-container">
        <div className="grid-item">Item 1</div>
        <div className="grid-item">Item 2</div>
        <div className="grid-item">Item 3</div>
        <div className="grid-item">Item 4</div>
        <div className="grid-item">Item 5</div>
        <div className="grid-item">Item 6</div>
    </div> */}
    </>
  );
}

export default MultiDnd;
