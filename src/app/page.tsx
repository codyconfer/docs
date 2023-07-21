import Footer from "@/components/footer";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import MarkdownArticle from "@/components/markdown/article";

export default function Home() {
  return (
    <>
      <header className="w-full border-b-2 border-color shadow-md justify-center lg:flex">
        <Header />
      </header>
      <div className="flex w-full justify-center">
        <div className="flex w-full max-w-6xl px-2 justify-between">
          <aside className="flex min-w-max max-w-2xl h-screen sticky top-0 pr-8">
            <Sidebar />
          </aside>
          <div className="w-full pl-8 border-l-2 border-color">
            <main className="flex w-full">
              <MarkdownArticle fileName={"example"} />
            </main>
            <footer>
              <Footer />
            </footer>
          </div>
        </div>
      </div>
    </>
  )
}
