import Link from "next/link";

export default function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <header className="border-border bg-background/90 sticky top-0 z-40 border-b backdrop-blur">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="font-serif text-xl tracking-tight">
            Lamora
          </Link>
          <ul className="flex items-center gap-6 text-sm">
            <li>
              <Link
                href="/produtos"
                className="hover:text-accent transition-colors"
              >
                Produtos
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      {children}
    </>
  );
}
