import Image from 'next/image'

export default function Footer() {
  return (
    <div className="flex pb-4 pt-16 px-2 items-center justify-between">
      <section className="flex">
      </section>
      <section className="flex">
        By{' '}
        <Image
          src="/logo.svg"
          alt="Logo"
          className="mx-2 invert dark:invert-0"
          width={100}
          height={24}
          priority
        />
      </section>
    </div>
  )
}
