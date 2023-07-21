import { getFilesByExtension } from "@/lib/filesystem";
import ProcessMarkdownFile, { MarkdownData } from "@/lib/markdown";

export const getDocs = async () => {
  const mdPaths = await getFilesByExtension("md");
  const mdFiles: MarkdownData[] = [];
  mdPaths.map(async (path) => {
    const file = await ProcessMarkdownFile(path);
    mdFiles.push(file);
  });
  return {
    mdFiles,
  }
};