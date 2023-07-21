import { MarkdownData } from "@/lib/markdown";

export interface NavTreeChildren { [k: string]: NavTreeChild }
export interface NavTree {
  children: NavTreeChildren;
}
export interface NavTreeChild {
  name: string;
  depth: 0 | 1 | 2 | 3 | 4;
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
  const splitFileName = file.fileName.split("/");
  let sectionFromUrl = "";
  let subSectionFromUrl = "";
  let nameFromUrl = "";
  if (splitFileName.length >= 1) {
    nameFromUrl = splitFileName[splitFileName.length - 1];
    nameFromUrl = nameFromUrl
      .replace(/-/g, " ")
      .replace(/_/g, " ");
  }
  if (splitFileName.length >= 2)
    sectionFromUrl = splitFileName[0];
  if (splitFileName.length >= 3)
    subSectionFromUrl = splitFileName[1];
  let link: NavTreeLink = {
    name: file.matter.title ?? nameFromUrl ?? "",
    section: file.matter.section ?? sectionFromUrl ?? "",
    subsection: file.matter.subsection ?? subSectionFromUrl ?? "",
    link: file.fileName,
    children: {},
    depth: 0,
  }
  if (link.section != "") {
    tree = processSection(link.section, tree);
  }
  if (link.section != "" && link.subsection == "") {
    link.depth = 2;
    tree.children[link.section].children[link.link] = link;
  }
  else if (link.section != "" && link.subsection != "") {
    link.depth = 4;
    tree = processSubSection(link.section, link.subsection, tree);
    let subsection = tree.children[link.section].children[link.subsection] as NavTreeSubSection;
    subsection.children[link.link] = link;
  }
  else {
    tree.children[link.link] = link;
  }
  return tree;
}

const processSection = (sectionName: string, tree: NavTree): NavTree => {
  if (sectionName && tree.children[sectionName])
    return tree;
  const section: NavTreeSection = {
    name: sectionName ?? "",
    depth: 1,
    children: {}
  }
  tree.children[section.name] = section;
  return tree;
}

const processSubSection = (sectionName: string, subSectionName: string, tree: NavTree): NavTree => {
  if (sectionName
    && tree.children[sectionName]
    && subSectionName
    && tree.children[sectionName].children[subSectionName])
    return tree;
  const subsection: NavTreeSubSection = {
    name: subSectionName ?? "",
    depth: 3,
    section: sectionName ?? "",
    children: {}
  }
  tree.children[sectionName].children[subSectionName] = subsection;
  return tree;
}