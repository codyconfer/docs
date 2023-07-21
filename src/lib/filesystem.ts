import path from "path";
import { glob } from "glob";

export const projectPath = path.join(process.cwd());
export const sourcePath = path.join(projectPath, 'src');
export const contentRootPath = path.join(sourcePath, 'content');
const stripMd = (fileName: string) => fileName.replace(/\.md$/, '');
export const getContentPath = (fileName: string) => path.join(contentRootPath, `${stripMd(fileName)}.md`);
export const getFilesByExtension = async (extension: string) => {
  return glob(`${contentRootPath}/**/*.${extension}`, {});
};
