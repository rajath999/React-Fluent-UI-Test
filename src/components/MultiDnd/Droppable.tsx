import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDroppable } from "@dnd-kit/core";
import { DNDDataType } from "../../types";
import { Checkbox } from "antd";
import type { CheckboxProps } from "antd";
import { ChangeEvent, useState } from "react";

type SortableItemType = {
    id: string,
    item: DNDDataType,
}

const SortableItem = (props: SortableItemType) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id, data: props.item });

   const [isChecked, setCheck] = useState(true);

  const itemStyle: any = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: 110,
    height: 30,
    display: "flex",
    alignItems: "center",
    paddingLeft: 5,
    border: "1px solid gray",
    borderRadius: 5,
    marginBottom: 5,
    userSelect: "none",
    cursor: "grab",
    boxSizing: "border-box",
  };

  // const onCheckboxClicked: CheckboxProps["onChange"]  = (ev: ChangeEvent<HTMLInputElement>, data: CheckboxOnChangeData)=> {
  //   console.log("Checkbox click ", e);
  //   setCheck(e.target.checked)
  // }

  return (
    <div style={itemStyle} ref={setNodeRef} {...attributes} {...listeners} data-item={props.item}>
      <Checkbox onChange={(e) => console.log("EVENT : ", e.target.checked)} checked={isChecked}>{props.item.name}</Checkbox>
       {props.item.isFixed && <span className="circle"></span>}
    </div>
  );
};

const Droppable = ({ id, items }: {id: string, items: DNDDataType[]}) => {
  const { setNodeRef } = useDroppable({ id });

  const droppableStyle = {
    padding: "20px 10px",
    border: "1px solid black",
    borderRadius: "5px",
    minWidth: 110,
  };

  return (
    <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
      <div ref={setNodeRef} className="flex-container" data-value={"ITEM-X"}>
        {items.map((item) => (
          <SortableItem key={item.id} id={item.id} item={item} />
        ))}
      </div>
    </SortableContext>
  );
};

export default Droppable;
