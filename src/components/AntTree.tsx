import React from "react";
import { Tooltip, Tree } from "antd";
import type { TreeDataNode } from "antd";
import { DataNode } from "antd/es/tree";

const data = [
  { id: "1", name: "Unread" },
  { id: "2", name: "Threads" },
  {
    id: "3",
    name: "Chat Rooms",
    children: [
      { id: "c1", name: "General" },
      { id: "c2", name: "Random" },
      { id: "c3", name: "Open Source Projects" },
    ],
  },
  {
    id: "4",
    name: "Direct Messages",
    children: [
      { id: "d1", name: "Alice" },
      { id: "d2", name: "Bob" },
      { id: "d3", name: "Charlie" },
    ],
  },
];


const readData = (data: any) => {
  return data.map((d: any) => {
    if (d.children && d.children.length) {
      return { ...d, title: d.name, key: d.id, children: readData(d.children)};
    }
    return { ...d, title: d.name, key: d.id, isLastElement: true };
  });
};

const dig = (path = "0", level = 3) => {
  const list = [];
  for (let i = 0; i < 10; i += 1) {
    const key = `${path}-${i}`;
    const treeNode: TreeDataNode = {
      title: key,
      key,
    };

    if (level > 0) {
      treeNode.children = dig(key, level - 1);
    }

    list.push(treeNode);
  }
  return list;
};

const treeData = readData(data); //dig();

console.log("TREE DATA ", treeData);


const MemoTooltip = React.memo(Tooltip);

const AntTree: React.FC = () => (
  <Tree
    treeData={treeData as DataNode[]}
    height={233}
    defaultExpandAll
    titleRender={(item: any) => (
      <div style={{color: item.isLastElement ? "red": "green"}}><MemoTooltip title={item.title as any}>{item.title as any}</MemoTooltip></div>
    )}
  />
//   <Tree
//     treeData={treeData as DataNode[]}
//     height={233}
//     defaultExpandAll
//     titleRender={(item) => (
//       <MemoTooltip title={item.title as any}>{item.title as any}</MemoTooltip>
//     )}
//   />
);

export default AntTree;
