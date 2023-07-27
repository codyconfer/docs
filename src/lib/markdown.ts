import fs from "fs";
import matter from 'gray-matter'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeDocument from 'rehype-document'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import rehypeHighlight from 'rehype-highlight'
import { unified } from 'unified'
import { indexTree } from "@/lib/article-indexer";
import { getContentPath } from "@/lib/filesystem";

export type MarkdownMeta = {
  index: MarkdownIndex[],
};

export type MarkdownIndex = { data: any, depth: number, children: [], value: any }
export type MarkdownData = {
  fileName: string,
  matter: {[p: string]: any},
  content: string,
  metadata: MarkdownMeta,
};

export interface MarkdownParams {
  mdFiles: MarkdownData[];
}

export default async function ProcessMarkdownFile(fileName: string) {
  const path = getContentPath(fileName);
  const file = fs.readFileSync(path, "utf8");
  const matterResult = matter(file);
  const content = await unified()
    .use(remarkParse)
    .use(indexTree)
    .use(remarkRehype)
    .use(rehypeDocument)
    .use(rehypeFormat)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(matterResult.content);
  const mdData: MarkdownData = {
      fileName: fileName,
      matter: matterResult.data,
      content: content.toString(),
      metadata: content.data as MarkdownMeta,
  };
  return mdData;
};