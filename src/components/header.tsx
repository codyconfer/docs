import Image from 'next/image'

export default function Header() {
  return (
    <div className="flex w-full max-w-6xl py-4 px-2 items-center justify-between">
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
      <section className="flex">
        <button
          className="btn">
          Support
        </button>
      </section>
    </div>
  )
}
