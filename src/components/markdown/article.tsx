import {MarkdownData, MarkdownIndex} from '@/lib/markdown';
import { ReactNode } from "react";

const maxHeadingsDepth: number = 6;

export default async function MarkdownArticle({ content, metaData }: MarkdownData) {
  const indexNavTitle = "What's on this page";
  const renderChildren = (index: MarkdownIndex[], depth: number = 0): ReactNode => {
    return index.map((section: MarkdownIndex) =>
      (
        <div key={section.data.hProperties.id}>
          <div className={`nav-${depth}`}>
            <a href={`#${section.data.hProperties.id}`}>{section.value}</a>
          </div>
          {section.children?.length > 0 && section.depth < maxHeadingsDepth
            ? renderChildren(section.children, depth + 1)
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
          {renderChildren(metaData.index)}
        </section>
      </nav>
    </>
  )
}
