import { MarkdownParams } from "@/lib/markdown";
import BuildNavTree, {
  instanceOfNavTreeLink,
  instanceOfNavTreeSection,
  instanceOfNavTreeSubSection,
  NavTreeChild, NavTreeChildren
} from "@/lib/navTree";
import { ReactNode } from "react";
import Link from "next/link";

export interface SidebarProps extends MarkdownParams { }

export default async function Sidebar({ mdFiles }: SidebarProps) {
  const tree = BuildNavTree(mdFiles);
  const renderChild = (child: NavTreeChild): ReactNode => {
    if (instanceOfNavTreeSection(child)) {
      return (
        <div key={child.name}>
          <div className={`sidebar-nav-${child.depth}`}>
            <span>{child.name}</span>
          </div>
        </div>
      )
    } else if (instanceOfNavTreeSubSection(child)) {
      return (
        <div key={child.name}>
          <div className={`sidebar-nav-${child.depth}`}>
            <span>{child.name}</span>
          </div>
        </div>
      )
    } else if (instanceOfNavTreeLink(child)) {
      return (
        <div key={child.name}>
          <div className={`sidebar-nav-${child.depth}`}>
            <Link href={`docs/${child.link}`}>{child.name}</Link>
          </div>
        </div>
      )
    } else {
      return "";
    }
  }

  const renderChildren = (tree: NavTreeChildren): ReactNode[] => {
    const nodes: ReactNode[] = [];
    for (const k in tree) {
      let item = tree[k];
      nodes.push(renderChild(item));
    }
    return nodes;
  };

  return (
    <nav className="w-full sidebar">
      <section className="pr-8 border-r-2 border-color">
        {renderChildren(tree.children)}
      </section>
    </nav>
  )
}