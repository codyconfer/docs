import ProcessMarkdownFile, {MarkdownData, MarkdownHeading} from '@/components/markdown/file';
import { ReactNode } from "react";

const maxHeadingsDepth: number = 3;

type MarkdownParams = {
  fileName: string;
}

export default async function MarkdownArticle({fileName}: MarkdownParams) {
  const { meta, content, data } = await ProcessMarkdownFile(fileName);
  const headingNavTitle = "What's on this page";
  const renderChildren = (headings: MarkdownHeading[]): ReactNode => {
    return headings.map((heading: MarkdownHeading) =>
      (
        <div key={heading.data.hProperties.id}>
          <div className="mb-4">
            <a href={`#${heading.data.hProperties.id}`}>{heading.value}</a>
          </div>
          {heading.children?.length > 0 && heading.depth < maxHeadingsDepth
            ? renderChildren(heading.children)
            : ""}
        </div>
      ));
  };

  return (
    <>
      <article
        className="w-full pr-8"
        dangerouslySetInnerHTML={{ __html: content }} />
      <nav className="headings-nav min-w-fit max-w-xl h-full sticky top-0 bottom-0 pl-8">
        <div className="mb-4">
          <b>{headingNavTitle}</b>
        </div>
        {renderChildren(data.headings)}
      </nav>
    </>
  )
}