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
    <div className="flex max-w-screen-2xl px-8 justify-between">
      <aside className="flex h-screen sticky top-0">
        <Sidebar mdFiles={docs} />
      </aside>
      <div className="pl-8">
        <article className="flex">
          {
            file
              ? <MarkdownArticle
                fileName={file.fileName}
                matter={file.matter}
                content={file.content}
                metaData={file.metaData} />
              : "Article Not Found"
          }
        </article>
        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  );
}