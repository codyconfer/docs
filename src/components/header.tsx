import Image from 'next/image'

export default function Header() {
  return (
    <div className="flex w-full max-w-screen-2xl  px-8 py-4 items-center justify-between">
      <section className="flex">
        <Image
          src="/logo.svg"
          alt="Logo"
          className="invert dark:invert-0"
          width={128}
          height={24}
          priority
        />
      </section>
      <nav className="flex grow items-end justify-end">
        <div className="flex mx-4">
          <a className="mx-4 header-nav">
            Docs
          </a>
          <a className="mx-4 header-nav">
            APIs
          </a>
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
