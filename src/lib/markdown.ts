import fs from "fs";
import matter from 'gray-matter'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeDocument from 'rehype-document'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import rehypeHighlight from 'rehype-highlight'
import { unified } from 'unified'
import { headingTree } from "@/lib/headings";
import { getContentPath } from "@/lib/filesystem";

export type MarkdownMeta = {
  headings: MarkdownHeading[],
};

export type MarkdownHeading = { data: any, depth: number, children: [], value: any }
export type MarkdownData = {
  fileName: string,
  matter: {[p: string]: any},
  content: string,
  metaData: MarkdownMeta,
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
    .use(headingTree)
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
      metaData: content.data as MarkdownMeta,
  };
  return mdData;
};