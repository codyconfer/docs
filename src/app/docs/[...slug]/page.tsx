import MarkdownArticle from "@/components/markdown/article";
import { getDoc, getDocs } from "@/lib/docs";
import Sidebar from "@/components/sidebar";
import Footer from "@/components/footer";

export default async function Page(props: any) {
  const filename = props.params.slug.join('/');
  const docs = await getDocs();
  const doc = await getDoc(filename);
  const file = doc?.mdFile;
  return (
    <div className="flex w-full justify-center">
      <div className="flex w-full max-w-6xl px-2 justify-between">
        <aside className="flex max-w-xl h-screen sticky top-0">
          <Sidebar mdFiles={docs} />
        </aside>
        <div className="w-full pl-8">
          <main className="flex w-full max-w-4xl">
            {
              file
                ? <MarkdownArticle
                  fileName={file.fileName}
                  matter={file.matter}
                  content={file.content}
                  metaData={file.metaData} />
                : "Article Not Found"
            }
          </main>
          <footer>
            <Footer />
          </footer>
        </div>
      </div>
    </div>
  );
}