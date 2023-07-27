import { Root } from "remark-parse/lib";
import { visit } from "unist-util-visit";
import { Heading } from "mdast";
import { toString } from "mdast-util-to-string";
import { VFile } from "vfile";

export function indexTree() {
  return (node: Root, file: VFile) => {
    file.data.index = getIndex(node);
  };
}

type TransformNodeOutput = {
  value: string,
  depth: any,
  data: any,
  children: [],
}

type IndexMap = {
  [key: number]: TransformNodeOutput,
}

function getIndex(root: Root) {
  const nodes: {id: number, data: {}} = {id: -1, data: {}};
  const output: TransformNodeOutput[] = [];
  const indexMap: IndexMap = {};
  visit(root, "heading", (node) => {
    addID(node, nodes);
    transformNode(node, output, indexMap);
  });

  return output;
}

function addID(node: any, nodes: {id: number, data: {}}) {
  const id = node.children.map((c: any) => c.value).join("");
  nodes.id = (nodes.id || 0) + 1;
  node.data = node.data || {
    hProperties: {
      id: `${id}${nodes.id > 0 ? ` ${nodes.id - 1}` : ""}`
        .replace(/[^a-zA-Z\d\s-]/g, "")
        .split(" ")
        .join("-")
        .toLowerCase(),
    },
  };
}


function transformNode(node: Heading, output: TransformNodeOutput[], indexMap: IndexMap) {
  const transformedNode: TransformNodeOutput = {
    value: toString(node),
    depth: node.depth,
    data: node.data,
    children: [],
  };
  if (node.depth === 1) {
    output.push(transformedNode);
    indexMap[node.depth] = transformedNode;
  } else {
    const parent = indexMap[node.depth - 1];
    if (parent) {
      parent.children.push(transformedNode as never);
      indexMap[node.depth] = transformedNode;
    }
  }
}