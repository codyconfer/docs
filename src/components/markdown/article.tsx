import { MarkdownData, MarkdownHeading } from '@/lib/markdown';
import { ReactNode } from "react";

const maxHeadingsDepth: number = 6;

export default async function MarkdownArticle({ content, metaData }: MarkdownData) {
  const headingNavTitle = "What's on this page";
  const renderChildren = (headings: MarkdownHeading[], depth: number = 0): ReactNode => {
    return headings.map((heading: MarkdownHeading) =>
      (
        <div key={heading.data.hProperties.id}>
          <div className={`nav-${depth}`}>
            <a href={`#${heading.data.hProperties.id}`}>{heading.value}</a>
          </div>
          {heading.children?.length > 0 && heading.depth < maxHeadingsDepth
            ? renderChildren(heading.children, depth + 1)
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
            <b>{headingNavTitle}</b>
          </div>
          {renderChildren(metaData.headings)}
        </section>
      </nav>
    </>
  )
}
