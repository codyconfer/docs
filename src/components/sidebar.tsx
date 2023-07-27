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
  const headingNavTitle = "Docs";
  const tree = BuildNavTree(mdFiles);
  const renderChild = (child: NavTreeChild): ReactNode => {
    if (instanceOfNavTreeSection(child)) {
      return (
        <div key={child.name}>
          <div className={`nav-${child.depth}`}>
            <span className="text-muted">{child.name}</span>
          </div>
        </div>
      )
    } else if (instanceOfNavTreeSubSection(child)) {
      return (
        <div key={child.name}>
          <div className={`nav-${child.depth}`}>
            <span className="text-muted">{child.name}</span>
          </div>
        </div>
      )
    } else if (instanceOfNavTreeLink(child)) {
      return (
        <div key={child.name}>
          <div className={`nav-${child.depth}`}>
            <Link href={`/docs/${child.link}`}>{child.name}</Link>
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
      nodes.push(renderChildren(item.children));
    }
    return nodes;
  };

  return (
    <nav className="sidebar">
      <section className="min-w-max pr-8 border-r-2 border-color">
        <div className="mb-4 text-muted">
          <b>{headingNavTitle}</b>
        </div>
        <div>
          {renderChildren(tree.children)}
        </div>
      </section>
    </nav>
  )
}