import Image from 'next/image'

export default function Footer() {
  return (
    <div className="flex w-full max-w-5xl pb-4 pt-16 px-2 items-center justify-between">
      <section className="flex">
      </section>
      <section className="flex">
        By{' '}
        <Image
          src="/vercel.svg"
          alt="Vercel Logo"
          className="dark:invert"
          width={100}
          height={24}
          priority
        />
      </section>
    </div>
  )
}
