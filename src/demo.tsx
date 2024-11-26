import React from "react";
import { TreeSelect } from "antd";

const treeData = [
  {
    title: "Node1",
    value: "0-0",
    key: "0-0",
    children: [
      {
        title: "Child Node1",
        value: "0-0-0",
        key: "0-0-0",
      },
    ],
  },
  {
    title: "Node2",
    value: "0-1",
    key: "0-1",
    children: [
      {
        title: "Child Node3",
        value: "0-1-0",
        key: "0-1-0",
      },
      {
        title: "Child Node4",
        value: "0-1-1",
        key: "0-1-1",
      },
      {
        title: "Child Node5",
        value: "0-1-2",
        key: "0-1-2",
      },
    ],
  },
];

const countChildren = (nodeValue) => {
  const findNode = (data, value) => {
    for (const node of data) {
      if (node.value === value) return node;
      if (node.children) {
        const found = findNode(node.children, value);
        if (found) return found;
      }
    }
    return null;
  };

  const node = findNode(treeData, nodeValue);
  return node?.children ? node.children.length : 0;
};

const App = () => {
  const handleTagRender = (props) => {
    const { label, value, onClose } = props;
    const childrenCount = countChildren(value);

    return (
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          background: "#f0f0f0",
          padding: "2px 8px",
          borderRadius: "4px",
          marginRight: "4px",
        }}
      >
        <span>{label}</span>
        {childrenCount > 0 && <span> ({childrenCount})</span>}
        <span
          style={{ marginLeft: "8px", cursor: "pointer" }}
          onClick={onClose}
        >
          ×
        </span>
      </div>
    );
  };

  return (
    <TreeSelect
      treeData={treeData}
      treeCheckable={true}
      showCheckedStrategy={TreeSelect.SHOW_PARENT}
      placeholder="Please select"
      style={{ width: "100%" }}
      tagRender={handleTagRender}
    />
  );
};

export default App;
