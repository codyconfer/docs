import Sidebar from "@/components/sidebar";
import Footer from "@/components/footer";
import { getDocs } from "@/lib/docs";

export default async function Home() {
  const mdFiles = await getDocs();
  return (
    <div className="flex w-full justify-center">
      <div className="flex w-full max-w-6xl px-2 justify-between">
        <aside className="flex min-w-max max-w-2xl h-screen sticky top-0">
          <Sidebar mdFiles={mdFiles} />
        </aside>
        <div className="w-full pl-8">
          <main className="flex w-full">

          </main>
          <footer>
            <Footer />
          </footer>
        </div>
      </div>
    </div>
  )
}
