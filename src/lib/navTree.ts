import { MarkdownData } from "@/lib/markdown";

export interface NavTreeChildren { [k: string]: NavTreeChild }
export interface NavTree {
  children: NavTreeChildren;
}
export interface NavTreeChild {
  name: string;
  depth: 0 | 1 | 2 | 3  | 4;
  children: NavTreeChildren;
}
export interface NavTreeSection extends NavTreeChild {
  depth: 1;
}
export interface NavTreeSubSection extends NavTreeChild {
  depth: 3;
  section: string;
}
export interface NavTreeLink extends NavTreeChild {
  name: string;
  depth: 0 | 2 | 4;
  section: string;
  subsection: string;
  link: string;
  children: NavTreeChildren;
}

export function instanceOfNavTreeSection (tree: NavTreeChild): tree is NavTreeSection {
  return !("section" in tree);
}

export function instanceOfNavTreeSubSection (tree: NavTreeChild): tree is NavTreeSubSection {
  return "section" in tree && !("subsection" in tree);
}

export function instanceOfNavTreeLink (tree: NavTreeChild): tree is NavTreeLink {
  return "section" in tree && "subsection" in tree;
}

export default function BuildNavTree(mdFiles: MarkdownData[]): NavTree {
  let tree: NavTree = {
    children: {}
  };
  mdFiles.forEach(file => {
    tree = processFile(file, tree);
  });
  return tree;
};

const processFile = (file: MarkdownData, tree: NavTree): NavTree => {
  let link: NavTreeLink = {
    name: file.matter.title ?? "",
    section: file.matter.section ?? "",
    subsection: file.matter.subsection ?? "",
    link: file.fileName,
    children: {},
    depth: 0,
  }
  if (link.section != "") {
    tree = processSection(file, tree);
  }
  if (link.section != "" && link.subsection == "") {
    link.depth = 2;
    tree.children[link.section].children[link.link] = link;
  }
  else if (link.section != "" && link.subsection != "") {
    link.depth = 4;
    tree = processSubSection(file, tree);
    let subsection = tree.children[link.section].children[link.subsection] as NavTreeSubSection;
    subsection.children[link.link] = link;
  }
  else {
    tree.children[link.link] = link;
  }

  return tree;
}

const processSection = (file: MarkdownData, tree: NavTree): NavTree => {
  if (file?.matter?.section && tree.children[file.matter.section])
    return tree;
  const section: NavTreeSection = {
    name: file.matter.section ?? "",
    depth: 1,
    children: {}
  }
  tree.children[section.name] = section;
  return tree;
}

const processSubSection = (file: MarkdownData, tree: NavTree): NavTree => {
  if (file?.matter?.section
    && tree.children[file.matter.section]
    && file?.matter?.subsection
    && tree.children[file.matter.section].children[file.matter.subsection])
    return tree;
  const subsection: NavTreeSubSection = {
    name: file.matter.subsection ?? "",
    depth: 3,
    section: file.matter.section ?? "",
    children: {}
  }
  tree.children[subsection.section ?? ""].children[subsection.name ?? ""] = subsection;
  return tree;
}