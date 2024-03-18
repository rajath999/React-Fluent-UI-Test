import React, { useEffect, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
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
  // const [items, setItems] = useState<MultiDndItemsState>({
  //   selected: [],
  //   additional: [],
  // });
  const [selectedColumns, setSelectedColumns] = useState<DNDDataType[]>([]);
  const [additonalColumns, setAdditionalColumns] = useState<DNDDataType[]>([]);

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

    // setItems({ selected, additional });
    setAdditionalColumns(additional);
    setSelectedColumns(selected);
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
      const activeIndex = active.data.current?.sortable.index;
      const overIndex = over.data.current?.sortable.index || 0;

      let item = selectedColumns.find((i) => i.id === active.id);
      if (!item) {
        item = additonalColumns.find((i) => i.id === active.id);
      }
      // Dont move the items if the item is fixed
      if (item?.isFixed) {
        return false;
      }
      if (item) {
        const res = moveBetweenContainers(
          {
            selected: selectedColumns,
            additional: additonalColumns,
          },
          activeContainer,
          activeIndex,
          overContainer,
          overIndex,
          item // active.id
        );

        setSelectedColumns(res.selected);
        setAdditionalColumns(res.additional);
      }
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

      let newItems;
      if (activeContainer === overContainer) {
        if (overContainer === "selected" || activeContainer === "selected") {
          newItems = {
            selectedColumns: arrayMove(selectedColumns, activeIndex, overIndex),
            additonalColumns,
          };
        }
        if (
          overContainer === "additional" ||
          activeContainer === "additional"
        ) {
          newItems = {
            additonalColumns: arrayMove(
              additonalColumns,
              activeIndex,
              overIndex
            ),
            selectedColumns,
          };
        }
        setSelectedColumns(newItems?.selectedColumns as DNDDataType[]);
        setAdditionalColumns(newItems?.additonalColumns as DNDDataType[]);
      } else {
        // let item = selectedColumns.find((i) => i.id === active.id);
        // if (!item) {
        //   item = additonalColumns.find((i) => i.id === active.id);
        // }
        // if (item) {
        //   newItems = moveBetweenContainers(
        //     {
        //       additional: additonalColumns,
        //       selected: selectedColumns,
        //     },
        //     activeContainer,
        //     activeIndex,
        //     overContainer,
        //     overIndex,
        //     item //active.id
        //   );
        //   setSelectedColumns(newItems.selected);
        //   setAdditionalColumns(newItems.additional);
        // }
      }
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
          collisionDetection={closestCorners} 
        >
          <div>
            <Droppable
              id={"selected"}
              items={selectedColumns}
              key={"selected"}
            />
            <Droppable
              id={"additional"}
              items={additonalColumns}
              key={"additional"}
            />
          </div>
        </DndContext>

        <div style={{ padding: "0 5rem" }}>
          {selectedColumns.map((d) => (
            <h5>{d.name}</h5>
          ))}
        </div>
        <div>
          {additonalColumns.map((d) => (
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
