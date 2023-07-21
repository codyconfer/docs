import { getFilesByExtension } from "@/lib/filesystem";
import ProcessMarkdownFile, { MarkdownData } from "@/lib/markdown";

let docStore: MarkdownData[] = [];

export const getDocs = async () => {
  if (docStore.length <= 0) {
    const paths = await getFilesByExtension("md");
    const mdFiles: MarkdownData[] = [];
    for (const path of paths) {
      const fileName = path.split("content/").pop()?.replace(".md", "") ?? "";
      const mdFile = await ProcessMarkdownFile(fileName);
      mdFiles.push(mdFile);
    }
    docStore = mdFiles;
  }
  return docStore;
};

export const getDoc = async (fileName: string) => {
  const mdFiles = await getDocs();
  const mdFile =
    mdFiles.find((file) => file.fileName === fileName);
  return {
    mdFile: mdFile,
  }
}