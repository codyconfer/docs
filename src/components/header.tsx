import Image from 'next/image'

export default function Header() {
  return (
    <div className="flex w-full px-8 py-4 items-center justify-between">
      <section className="flex">
        <Image
          src="/vercel.svg"
          alt="Vercel Logo"
          className="dark:invert"
          width={128}
          height={24}
          priority
        />
      </section>
      <nav className="flex grow items-end justify-end">
        <div className="flex mx-4">
          <div className="mx-4">
            Docs
          </div>
          <div className="mx-4">
            APIs
          </div>
        </div>
      </nav>
      <section className="flex">
        <button
          className="btn">
          Support
        </button>
      </section>
    </div>
  )
}
