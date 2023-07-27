import {MarkdownData, MarkdownIndex} from '@/lib/markdown';
import { ReactNode } from "react";

const maxHeadingsDepth: number = 6;

export default async function MarkdownArticle({ content, metadata }: MarkdownData) {
  const indexNavTitle = "What's on this page";
  const renderChildren = (index: MarkdownIndex[], depth: number = 0): ReactNode => {
    return index.map((node: MarkdownIndex) =>
      (
        <div key={node.data.hProperties.id}>
          <div className={`nav-${depth}`}>
            <a href={`#${node.data.hProperties.id}`}>{node.value}</a>
          </div>
          {node.children?.length > 0 && node.depth < maxHeadingsDepth
            ? renderChildren(node.children, depth + 1)
            : ""}
        </div>
      ));
  };

  return (
    <>
      <section
        className="pr-8"
        dangerouslySetInnerHTML={{ __html: content }} />
      <nav className="article-nav h-full top-0 bottom-0">
        <section className="border-l-2 border-color pl-8">
          <div className="mb-4">
            <b>{indexNavTitle}</b>
          </div>
          {renderChildren(metadata.index)}
        </section>
      </nav>
    </>
  )
}
