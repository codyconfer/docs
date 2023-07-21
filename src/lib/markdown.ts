import fs from "fs";
import matter from 'gray-matter'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeDocument from 'rehype-document'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import rehypeHighlight from 'rehype-highlight'
import { unified } from 'unified'
import { headingTree } from "@/components/markdown/headings";
import { getContentPath } from '@/components/filesystem'

export type MarkdownData = {
  headings: MarkdownHeading[],
};

export type MarkdownHeading = {data: any, depth: number, children: [], value: any}

export default async function ProcessMarkdownFile(fileName: string){
  const contentPath = getContentPath(fileName);
  const file = fs.readFileSync(contentPath, "utf8");
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
  return {
    meta: matterResult.data,
    content: content.toString(),
    data: content.data as MarkdownData,
  };
};