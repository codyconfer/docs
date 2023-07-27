import Sidebar from "@/components/sidebar";
import Footer from "@/components/footer";
import { getDocs } from "@/lib/docs";

export default async function Home() {
  const mdFiles = await getDocs();
  return (
    <div className="flex justify-center">
      <div className="flex max-w-8xl px-8 justify-between">
        <aside className="flex h-screen sticky top-0">
          <Sidebar mdFiles={mdFiles} />
        </aside>
        <div className="pl-8">
          <main className="flex">

          </main>
          <footer>
            <Footer />
          </footer>
        </div>
      </div>
    </div>
  )
}
