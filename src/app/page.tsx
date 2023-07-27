import Sidebar from "@/components/sidebar";
import Footer from "@/components/footer";
import { getDoc, getDocs } from "@/lib/docs";
import MarkdownArticle from "@/components/markdown/article";

export default async function Home() {
  const filename = "example";
  const docs = await getDocs();
  const doc = await getDoc(filename);
  const article = doc?.mdFile;
  return (
    <div className="flex max-w-screen-2xl px-8 justify-between">
      <aside className="flex h-screen sticky top-0 pt-8">
        <Sidebar mdFiles={docs} />
      </aside>
      <div className="pl-8">
        <article className="flex pt-8">
          {
            article
              ? <MarkdownArticle
                fileName={article.fileName}
                matter={article.matter}
                content={article.content}
                metadata={article.metadata} />
              : "Article Not Found"
          }
        </article>
        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  )
}
